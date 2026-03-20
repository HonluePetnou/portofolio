import { z } from "zod";
import { ContactStatus, PriorityLevel } from "@prisma/client";

export const publicContactSchema = z
  .object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z.string().min(5).max(50).optional(),
    company: z.string().min(2).max(100).optional(),
    subject: z.string().min(3).max(150),
    message: z.string().min(10).max(5000),
    service: z.string().min(2).max(100).optional(),
    budget: z.number().int().nonnegative().optional(),
  })
  .strict();

export type PublicContactInput = z.infer<typeof publicContactSchema>;

export const adminContactUpdateSchema = z
  .object({
    status: z.nativeEnum(ContactStatus).optional(),
    priority: z.nativeEnum(PriorityLevel).optional(),
    internalNotes: z.string().max(5000).nullable().optional(),
  })
  .strict();

export type AdminContactUpdateInput = z.infer<typeof adminContactUpdateSchema>;

