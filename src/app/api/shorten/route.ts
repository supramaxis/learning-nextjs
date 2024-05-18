//api endpoint to get a short url from a long url using prisma posgresql database

import { URLHandler } from "@/classes/URLHandler";

export async function POST(req: Request) {
  const handler = new URLHandler(req);
  const res = await handler.createShortUrl();
  return res;
}
