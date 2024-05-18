import { URLHandler } from "@/classes/URLHandler";
import { NextApiRequest } from "next";

export async function GET(req: Request) {
  const handler = new URLHandler(req);
  const response = await handler.getUrls();
  return response;
}
