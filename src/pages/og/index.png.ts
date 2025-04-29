import { defaultOGP, OG_RESPONSE_HEADERS } from "$/lib/og"

export async function GET() {
  return new Response(defaultOGP, { headers: OG_RESPONSE_HEADERS })
}
