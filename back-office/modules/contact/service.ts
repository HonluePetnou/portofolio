import { ContactStatus, PriorityLevel } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { type PublicContactInput, type AdminContactUpdateInput } from "./schema";
import { getSettingValue } from "@/modules/settings/service";
import { createEmailClient } from "@/lib/email/client";

function determinePriority(input: PublicContactInput): PriorityLevel {
  const budget = input.budget ?? null;
  const service = input.service?.toLowerCase() ?? "";

  if ((budget !== null && budget >= 3000) || service.includes("saas")) {
    return PriorityLevel.HIGH;
  }

  return PriorityLevel.LOW;
}

export async function createContactMessage(input: PublicContactInput) {
  const priority = determinePriority(input);

  const message = await prisma.contactMessage.create({
    data: {
      ...input,
      priority,
      status: ContactStatus.NEW,
    },
  });

  void sendNotificationEmail(message).catch((error) => {
    console.error("Failed to send contact notification email", error);
  });

  return message;
}

export async function listContactMessages(params: {
  status?: ContactStatus;
  priority?: PriorityLevel;
  page?: number;
  pageSize?: number;
}) {
  const { status, priority, page = 1, pageSize = 50 } = params;
  const where: any = {};
  if (status) where.status = status;
  if (priority) where.priority = priority;

  const [items, total] = await Promise.all([
    prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.contactMessage.count({ where }),
  ]);

  return {
    items,
    total,
    page,
    pageSize,
  };
}

export function getContactMessageById(id: string) {
  return prisma.contactMessage.findUnique({
    where: { id },
  });
}

export async function updateContactMessage(
  id: string,
  input: AdminContactUpdateInput
) {
  return prisma.contactMessage.update({
    where: { id },
    data: input,
  });
}

export async function deleteContactMessage(id: string) {
  await prisma.contactMessage.delete({
    where: { id },
  });
}

async function sendNotificationEmail(message: {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string;
  message: string;
  service: string | null;
  budget: number | null;
}) {
  const [provider, apiKey, notificationEmail] = await Promise.all([
    getSettingValue("EMAIL_PROVIDER"),
    getSettingValue("EMAIL_API_KEY", { decrypt: true }),
    getSettingValue("NOTIFICATION_EMAIL"),
  ]);

  const emailClient = createEmailClient(
    (provider as any) || "NONE",
    apiKey,
    notificationEmail
  );

  if (!notificationEmail) {
    return;
  }

  const budgetText =
    message.budget != null ? `$${message.budget.toLocaleString()}` : "N/A";

  const html = `
    <h1>New contact message</h1>
    <p><strong>Name:</strong> ${message.name}</p>
    <p><strong>Email:</strong> ${message.email}</p>
    <p><strong>Phone:</strong> ${message.phone || "N/A"}</p>
    <p><strong>Company:</strong> ${message.company || "N/A"}</p>
    <p><strong>Service:</strong> ${message.service || "N/A"}</p>
    <p><strong>Budget:</strong> ${budgetText}</p>
    <p><strong>Subject:</strong> ${message.subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message.message.replace(/\n/g, "<br/>")}</p>
  `;

  await emailClient.sendEmail({
    to: notificationEmail,
    subject: `New contact message: ${message.subject}`,
    html,
  });
}

