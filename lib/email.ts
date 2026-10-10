import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  if (!resend || !process.env.CONTACT_TO_EMAIL || !process.env.CONTACT_FROM_EMAIL) {
    return { ok: false, reason: "not-configured" } as const;
  }

  const safeMessage = message
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\r\n/g, "\n")
    .trim();

  await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL,
    to: [process.env.CONTACT_TO_EMAIL],
    replyTo: email,
    subject: `New contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${safeMessage}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage.replace(/\n/g, "<br />")}</p>
    `,
  });

  return { ok: true } as const;
}
