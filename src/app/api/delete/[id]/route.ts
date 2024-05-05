import { URLHandler } from "@/classes/URLHandler";
import type { NextApiRequest } from "next";

export async function DELETE(req: Request) {
  const handler = new URLHandler(req);
  return handler.deleteUrl();
}
