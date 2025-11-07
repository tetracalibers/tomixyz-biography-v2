#!/usr/bin/env zx

import "zx/globals"

const patterns = argv._.length ? argv._.map(String) : ["**/*.webm"] // デフォルトは webm 全探索

const extensions = (argv.ext ?? "webm")
  .split(",")
  .map((s) => s.trim().replace(/^\./, ""))
  .filter(Boolean)

const outRoot = argv.out ? path.resolve(String(argv.out)) : null
const suffix = argv.suffix ? String(argv.suffix) : "_poster"
const overwrite = Boolean(argv.overwrite || argv.y)
const concurrency = Number(argv.concurrency ?? 2)

// グロブを拡張子ごとに組み立て
const globInputs = patterns.flatMap((pat) =>
  extensions.map((ext) => (pat.includes("*") || pat.includes("?") ? pat.replace(/\*\*?[^.]*/g, (m) => m) : pat))
)

// 入力を収集
let files = await globby(globInputs, {
  expandDirectories: false,
  gitignore: true,
  onlyFiles: true,
  absolute: true,
  caseSensitiveMatch: false,
  ignore: ["**/*.png", "**/*.jpg", "**/*.jpeg"]
})

// 明示的に拡張子フィルタ
files = files.filter((f) => extensions.includes(path.extname(f).slice(1).toLowerCase()))

if (files.length === 0) {
  echo(chalk.yellow("対象ファイルが見つかりませんでした。パターンや --ext を確認してください。"))
  process.exit(0)
}

echo(chalk.cyan(`処理対象: ${files.length} ファイル`))
if (outRoot) {
  await fs.mkdir(outRoot, { recursive: true })
  echo(chalk.gray(`出力先ルート: ${outRoot}`))
}

// シンプルな並列実行
async function runLimited(items, limit, worker) {
  let index = 0
  const runners = Array.from({ length: Math.max(1, limit) }, async () => {
    while (true) {
      const i = index++
      if (i >= items.length) break
      await worker(items[i], i)
    }
  })
  await Promise.all(runners)
}

function toOutputPath(inputAbs) {
  // public/movie内のディレクトリ名は保持する
  const rel = path.relative(process.cwd(), inputAbs)
  const relDir = path.dirname(rel)
  // relDirからpublic/movieを取り除く
  const movieIndex = relDir.indexOf("public/movie")
  const relDirAdjusted = movieIndex >= 0 ? relDir.slice(movieIndex + "public/movie".length) : relDir

  const inputInOutRoot = outRoot ? path.join(outRoot, relDirAdjusted) : path.dirname(inputAbs)
  const stem = path.basename(inputAbs, path.extname(inputAbs))
  const outFile = `${stem}${suffix}.png`
  return path.join(inputInOutRoot, outFile)
}

const results = { ok: 0, skipped: 0, failed: 0 }

await runLimited(files, concurrency, async (inputAbs) => {
  const outputAbs = toOutputPath(inputAbs)
  await fs.mkdir(path.dirname(outputAbs), { recursive: true })

  if (!overwrite && (await fs.pathExists(outputAbs))) {
    echo(chalk.gray(`SKIP: 既に存在 -> ${path.relative(process.cwd(), outputAbs)}`))
    results.skipped++
    return
  }

  try {
    // ご指定の順序: -ss 0 を入力前に置く
    const cmd = ["ffmpeg", "-hide_banner", "-loglevel", "error", "-ss", "0", "-i", inputAbs, "-frames:v", "1"]
    if (overwrite) cmd.push("-y") // 上書き
    cmd.push(outputAbs)

    await $`${cmd}`
    echo(chalk.green(`OK  : ${path.relative(process.cwd(), inputAbs)} -> ${path.relative(process.cwd(), outputAbs)}`))
    results.ok++
  } catch (err) {
    echo(chalk.red(`NG  : ${path.relative(process.cwd(), inputAbs)} (${err?.exitCode ?? ""})`))
    results.failed++
  }
})

echo("")
echo(chalk.bold(`完了: OK ${results.ok}, SKIP ${results.skipped}, NG ${results.failed}`))
if (results.failed > 0) {
  echo(chalk.gray("ヒント: 入力が破損している、権限がない、ffmpeg が未インストール等の可能性があります。"))
}
