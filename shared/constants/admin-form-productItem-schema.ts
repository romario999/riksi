import { z } from "zod";

export const adminFormProductItemSchema = z
  .object({
    itemPrice: z.string().min(1, { message: "Введіть ціну товару" }),
    itemOldPrice: z.string().optional(),
    itemSku: z.string().min(3, { message: "Введіть артикул товару" }),
    itemSize: z.string().min(1, { message: "Введіть розмір товару" }),
    itemStock: z.string(),
});

export type adminFormProductItemSchema = z.infer<typeof adminFormProductItemSchema>;