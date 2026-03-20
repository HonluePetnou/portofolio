import { prisma } from "@/lib/prisma";
import { decrypt, encrypt } from "@/lib/security/encryption";
import {
  SettingsUpdateInput,
  settingKeySchema,
  type SettingKey,
} from "./schema";

const SENSITIVE_KEYS: SettingKey[] = ["AI_API_KEY", "EMAIL_API_KEY"];

const isSensitive = (key: SettingKey) => SENSITIVE_KEYS.includes(key);

export type AdminSettingsView = {
  AI_PROVIDER: string | null;
  EMAIL_PROVIDER: string | null;
  NOTIFICATION_EMAIL: string | null;
  AI_API_KEY: { configured: boolean };
  EMAIL_API_KEY: { configured: boolean };
};

export async function getSettingRecord(key: SettingKey) {
  return prisma.setting.findUnique({
    where: { key },
  });
}

export async function getSettingValue(
  key: SettingKey,
  options?: { decrypt?: boolean }
): Promise<string | null> {
  const record = await getSettingRecord(key);
  if (!record) return null;

  if (options?.decrypt && isSensitive(key)) {
    return decrypt(record.value);
  }

  return record.value;
}

export async function getAdminSettingsView(): Promise<AdminSettingsView> {
  const [aiProvider, emailProvider, notificationEmail, aiApiKey, emailApiKey] =
    await Promise.all([
      getSettingValue("AI_PROVIDER"),
      getSettingValue("EMAIL_PROVIDER"),
      getSettingValue("NOTIFICATION_EMAIL"),
      getSettingRecord("AI_API_KEY"),
      getSettingRecord("EMAIL_API_KEY"),
    ]);

  return {
    AI_PROVIDER: aiProvider,
    EMAIL_PROVIDER: emailProvider,
    NOTIFICATION_EMAIL: notificationEmail,
    AI_API_KEY: { configured: !!aiApiKey?.value },
    EMAIL_API_KEY: { configured: !!emailApiKey?.value },
  };
}

export async function updateSettings(input: SettingsUpdateInput) {
  const entries = Object.entries(input) as [SettingKey, string | undefined][];

  for (const [rawKey, rawValue] of entries) {
    if (typeof rawValue === "undefined") continue;
    const key = settingKeySchema.parse(rawKey);
    const value = isSensitive(key) ? encrypt(rawValue) : rawValue;

    await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
}

