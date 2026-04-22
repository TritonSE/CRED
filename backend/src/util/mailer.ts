import createHttpError from "http-errors";
import nodemailer from "nodemailer";

type ContactEmailInput = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw createHttpError(500, `Missing required env var: ${name}`);
  }
  return value;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

let cachedTransporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (cachedTransporter) return cachedTransporter;

  const host = requireEnv("SMTP_HOST");
  const portRaw = requireEnv("SMTP_PORT");
  const port = Number(portRaw);
  if (!Number.isFinite(port)) {
    throw createHttpError(500, "SMTP_PORT must be a number");
  }

  const secure = (process.env.SMTP_SECURE ?? "false").toLowerCase() === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
  });

  return cachedTransporter;
}

export async function sendContactEmail({
  fullName,
  email,
  subject,
  message,
}: ContactEmailInput): Promise<void> {
  const transporter = getTransporter();

  const to = process.env.CONTACT_TO ?? "credsd@credsd.org";
  const from = requireEnv("SMTP_FROM");

  const safeSubject = escapeHtml(subject);
  const safeFullName = escapeHtml(fullName);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  const text = [
    "New CRED contact form submission",
    "",
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    "",
    message,
  ].join("\n");

  const html = `
    <div>
      <h2>New CRED contact form submission</h2>
      <p><strong>Name:</strong> ${safeFullName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Subject:</strong> ${safeSubject}</p>
      <hr />
      <pre style="white-space: pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;">${safeMessage}</pre>
    </div>
  `;

  await transporter.sendMail({
    to,
    from,
    replyTo: `${fullName} <${email}>`,
    subject: `[CRED] ${subject}`,
    text,
    html,
  });
}
