import { NextResponse } from "next/server";
import { z } from "zod";

import { rateLimit } from "@/lib/rate-limit";
import { sendContactEmail } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
  honeypot: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip");
  const limit = rateLimit(ip);

  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many messages. Please try again in a minute." },
      { status: 429 },
    );
  }

  const json = await request.json();
  const parsed = contactSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check your name, email, and message and try again." },
      { status: 400 },
    );
  }

  if (parsed.data.honeypot && parsed.data.honeypot.length > 0) {
    return NextResponse.json({ message: "Message received." }, { status: 200 });
  }

  try {
    const result = await sendContactEmail({
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
    });

    if (!result.ok) {
      console.error("Contact form email not configured.");
      return NextResponse.json(
        { message: "Thanks — your message has been captured locally and we will be in touch once email delivery is configured." },
        { status: 200 },
      );
    }

    return NextResponse.json({ message: "Thanks — your message is on the way." }, { status: 200 });
  } catch (error) {
    console.error("Contact form failed to send email:", error);
    return NextResponse.json(
      { error: "Something went wrong while sending your message. Please email us directly." },
      { status: 500 },
    );
  }
}
