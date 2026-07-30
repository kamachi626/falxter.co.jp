import { z } from "zod";
import { contactBudgets, contactTimings, otherContactCategories } from "../data/contact";
import { systemContactCategories, websiteContactCategories } from "../data/services";

const safeHeader = z.string().refine((v) => !/[\r\n]/.test(v), "改行を含めることはできません");
export const contactSchema = z.object({
  company: safeHeader.max(120).optional().default(""),
  name: safeHeader.min(1).max(80),
  email: z
    .email()
    .max(254)
    .refine((v) => !/[\r\n]/.test(v), "改行を含めることはできません"),
  phone: safeHeader.max(30).optional().default(""),
  category: z.enum([
    ...systemContactCategories,
    ...websiteContactCategories,
    ...otherContactCategories,
  ]),
  message: z.string().min(20).max(5000),
  timing: z.enum(contactTimings),
  budget: z.enum(contactBudgets),
  privacy: z.union([z.literal(true), z.literal("true"), z.literal("on")]),
  turnstileToken: z.string().max(2048).optional().default(""),
  website: z.string().max(200).optional().default(""),
});
export type ContactInput = z.infer<typeof contactSchema>;
export const escapeHtml = (v: string) =>
  v.replace(
    /[&<>'"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[c] ?? c,
  );
