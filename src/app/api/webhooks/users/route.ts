import { Webhook, WebhookRequiredHeaders } from "svix";
import { headers } from "next/headers";
import { IncomingHttpHeaders } from "http";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

const WebhookSecret = process.env.WEBHOOK_SECRET || "";

async function handler(req: Request) {
  const payload = await req.json();
  const headerList = headers();
  const heads: IncomingHttpHeaders & WebhookRequiredHeaders = {
    "svix-id": headerList.get("svix-id")!,
    "svix-timestamp": headerList.get("svix-timestamp")!,
    "svix-signature": headerList.get("svix-signature")!,
  };
  const wh = new Webhook(WebhookSecret);
  let evt: Event | null = null;

  try {
    evt = wh.verify(JSON.stringify(payload), heads) as Event;
  } catch (error) {
    console.error((error as Error).message);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 401 }
    );
  }
  const eventType: EventType = evt.type;
  try {
    if (eventType === "user.created" || eventType === "user.updated") {
      console.log("User created event");
      const { id, ...attributes } = evt.data;
      console.log("id received");
      console.log("attributes received");
      interface EmailAddress {
        email_address: string;
        reserved: boolean;
      }
      const emailAddresses: EmailAddress[] = Array.isArray(
        attributes.email_addresses
      )
        ? attributes.email_addresses
        : [];

      const emailAddressObj: EmailAddress | undefined = emailAddresses.find(
        (email) => !email.reserved
      );

      const emailAddress: string | null = emailAddressObj
        ? emailAddressObj.email_address
        : null;
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (id) {
        await prisma.clerkUser.upsert({
          where: { externalId: id as string },
          create: {
            externalId: id as string,
            attributes,
            username: attributes.username as string,
            email: emailAddress as string,
          },
          update: {
            attributes,
          },
        });
        return NextResponse.json(
          { message: "User created event" },
          { status: 200 }
        );
      } else {
        console.log("Error: No id in event data to update user");
        return NextResponse.json(
          { error: "prisma did not got the id to upsert user" },
          { status: 500 }
        );
      }
    } else {
      console.log("Unknown event type");
      return NextResponse.json(
        { error: "Unknown event type" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

type EventType = "user.created" | "user.updated" | "*";

type Event = {
  data: Record<string, string | number>;
  object: "event";
  type: EventType;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
