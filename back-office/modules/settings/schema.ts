import { z } from "zod";

export const settingKeySchema = z.enum([
  "AI_API_KEY",
  "AI_PROVIDER",
  "EMAIL_PROVIDER",
  "EMAIL_API_KEY",
  "NOTIFICATION_EMAIL",
]);

export type SettingKey = z.infer<typeof settingKeySchema>;

export const settingsUpdateSchema = z
  .object({
    AI_API_KEY: z.string().min(1).optional(),
    AI_PROVIDER: z.enum(["GEMINI", "OPENAI", "CLAUDE"]).optional(),
    EMAIL_PROVIDER: z.enum(["RESEND", "SENDGRID", "NONE"]).optional(),
    EMAIL_API_KEY: z.string().min(1).optional(),
    NOTIFICATION_EMAIL: z.string().email().optional(),
  })
  .strict();

export type SettingsUpdateInput = z.infer<typeof settingsUpdateSchema>;

