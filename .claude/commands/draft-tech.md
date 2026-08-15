---
description: tech記事の草案をこのサイトの構成・文体でMDXとして書く
argument-hint: [題材（解説したい技術やプロジェクト）]
---

tomixy's biography（このリポジトリ）のtech記事として、新規記事の草案をMDXで書いてください。

## 今回のテーマ

題材：$ARGUMENTS

題材が空、または以下の条件が分からない場合は、**書き始める前に**まとめて質問して確定させてください。

- 記事タイプ：制作記録・設計判断 / コマンド・手順レシピ / 概念解説 / プロジェクト紹介
- 想定読者（例：WebGPUは知らないがWebGLは触ったことがある人）
- 読者に持ち帰ってほしいこと（1〜2行）
- 扱わないこと（意図的に切り捨てる範囲）
- 手元のメモ（箇条書き。ここに無い事実・数値・固有名詞は書かない）
- シリーズに入れるかどうか（入れる場合はどのシリーズか）

## 先に読むもの

- 手本にする既存記事を2〜3本（記事タイプに応じて選ぶ）
  - 制作記録・設計判断：`src/content/tech/color-prism-ogp-generation.mdx`, `src/content/tech/ai-mimic-writing-thought-process.mdx`
  - コマンド・手順レシピ：`src/content/tech/imagemagick-transparent-white.mdx`, `src/content/tech/applescript-chrome-all-tab-urls.mdx`
  - 概念解説（シリーズ）：`src/content/tech/webgpu-concept/webgpu-stateless.mdx`, `src/content/tech/webgpu-concept/graphics-api-history.mdx`
  - プロジェクト紹介：`src/content/tech/summario-dev/concept.mdx`, `src/content/tech/summario-dev/technologies.mdx`
- `src/content/tag.yaml`（使えるタグの確認）
- `CLAUDE.md`

`src/content/tech/ai-writing-guide-bloat.mdx`は手本にしないでください（AI草稿のまま置かれている記事で、他の記事と構成・文体の型が異なります）。

手本記事から借りるのは**構成の骨格と記法だけ**。言い回しや文の並びを流用して「名詞を差し替えただけの記事」にしないでください。

## 構成のルール

- H1は書かない（frontmatterのtitleがH1）。見出しは`##`と`###`だけ。`####`は使わない
- 冒頭は見出しなしのリード2〜4段落。何の話か／なぜ今これを書くか／どこから来た話か。関連する既存記事があれば`/tech/<slug>`でリンクする
- シリーズの続きなら、リードの1文目を`:SeriesPrevLink[前回]{series="<id>" current="<この記事のslug>"}`で始め、前回の内容を1文で受ける
- `##`は3〜7本。全体4,000〜7,000字を目安
- 見出しは日本語で、内容が具体的に分かる語にする。`Overview` `Challenge` `Approach` `Key Features`のような英語の枠組み語は使わない。「なぜXではいけなかったのか」のような問いや、「知能が必要な処理と決定的な処理の分離」のような判断を見出しにしてよい
- 「まとめ」「おわりに」「参考」という見出しは作らない。最後のセクションの流れのまま、残課題・限界・これから変えたいことに触れて終わる
- 説明の順序：用語を定義 → なぜそれが問題か → どう解決したか。コードは「まず全体像 → 次に部分を切り出して1ブロックずつ」の順で分解する
- 設計・実装の判断を書くときは、採用した案だけでなく、検討して却下した案とその理由も書く

## 文体のルール

- 単発の制作記録・レシピは**常体**（〜だ／〜である／〜した）、シリーズの概念解説・プロジェクト紹介は**敬体**（〜です／〜ます）を基本とする。迷う場合は確認する
- 一人称は「私」。使いすぎない
- 定義・手順・仕様は断定する。主観や一般則では「〜と思う」「〜かもしれない」「〜な気がする」で留める
- 読者への語りかけ（「〜してみましょう」「〜だとしたらどうでしょうか」）は、話が切り替わる要所だけ
- 自分の動機・特性・失敗はそのまま書いてよい（「気が散ってしまう個人的な特性をどうにかしたかった」のような記述はこのサイトの持ち味）

## 避けること

- 直前に書いた内容の再要約。セクション末に「このように〜」で総括をつける癖
- 「〜ではなく、〜」という対比構文の多用。平叙文で言えるなら平叙文にする
- 比喩・擬人化（「〜の心臓部」「〜が語りかける」など）
- 手元のメモより語彙や粒度を膨らませること。件数・割合・計測値の捏造
- 説明を箇条書きに逃がすこと。箇条書きは本当に列挙のときだけ使い、理屈は文で書く
- 本文中の絵文字（コードブロックのtitleに`❌`『👍』`🤔`を使うのは既存の慣習なのでOK）

## 記法のルール

- frontmatter：`title`(100字以内) / `date: "YYYY-MM-DD"` / `description` / `tags` / `series`（任意）/ `references`（任意）/ `draft`
- `description`は句点をつけない短い句にする。例：「「消したい白」と「残したい白」の制御」「知能が必要な処理と、決定的な処理を分ける」
- 草案なので必ず`draft: true`をつける。日付が決まっていなければ`date: "coming-soon"`
- `tags`は`src/content/tag.yaml`に存在するキーだけを書く（例：`imagemagick`, `claude-code`）。無いタグが必要なら本文には書かず、最後の報告で候補として挙げる
- 強調：初出の重要語は`==用語==`、要点の一文は`=p=文==`または`**文**`
- インラインコードには言語注記をつける：`` `-fuzz{:bash}` `` `` `useEffect{:js}` ``
- コードブロックのメタ情報を活用する（例：` ```bash title="backgroundモード" showLineNumbers `）。行の抜粋は` ```wgsl showLineNumbers{9} {3-7} `のように開始行とハイライト行を指定する
- 画像：`import img_Xxx from "../../assets/tech/<slug>/xxx.png"`をfrontmatter直後にまとめ、`<FigureBox src={img_Xxx} caption="..." />`で表示（`$/components/image-wrapper/FigureBox.astro`）。横並びは`<GridGallery col={2}>`、縦積みは`<VStack>`（`$/components/placement/`）
- デモへのリンク：`::DemoLink[ラベル]{url="..."}`、結果画像つきは`<DemoLinkWithResult url="..." title="..." result={img_Xxx} />`
- 補足リンク集は`> [!NOTE]`ブロックに入れる
- 参考にした外部記事は`references`に入れる（`summary`は自分の感想の文体で書く）
- コードスタイルはprettier準拠（セミコロンなし、ダブルクォート、120字）

## 出力

- `src/content/tech/<slug>.mdx`（シリーズなら`src/content/tech/<series>/<slug>.mdx`）に作成する
- シリーズに入れる場合は`src/content/series/<series>.md`の`articles`にもidを追記する
- 図版・スクショが必要な箇所は文章で埋めず、`{/* TODO: 図版 */}`を置く
- 事実が確認できない箇所も書かずに`{/* TODO: 要確認 */}`を置く
- 書き終えたら、次を報告する：タイトル案（2〜3案）／`description`案／追加が必要なタグ／図版TODOの一覧／判断に迷って私に決めてほしかった箇所

長めの記事になりそうな場合は、いきなり本文を書かず、まず見出し案（`##`と`###`の一覧）を出して合意を取ってから本文に進んでください。
