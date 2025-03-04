import { z } from "zod";

export const checkoutFormSchema = z
  .object({
    fullName: z.string().min(4, { message: "Введіть ваше ім'я, прізвище, по-батькові" }),
    email: z.string().email({ message: "Некоректний E-mail" }),
    phone: z.string().min(10, { message: "Некоректний номер телефону" }),
    dontCall: z.boolean().optional(),
    otherRecipient: z.boolean().optional(),
    fullNameRecipient: z.string().optional(),
    phoneNumberRecipient: z.string().optional(),
    idCity: z.string().optional(),
    novaPostCity: z.string().optional(),
    ukrPostCity: z.string().optional(),
    deliveryType: z.string().min(1, { message: "Оберіть спосіб доставки" }),
    novaPostTypeDelivery: z.string().optional(),
    idDepartment: z.string().optional(),
    department: z.string().optional(),
    street: z.string().optional(),
    numberStreet: z.string().optional(),
    ukrPostDepartment: z.string().optional(),
    comment: z.string().optional(),
    paymentType: z.string().min(1, { message: "Оберіть спосіб оплати" }),
  })
  .superRefine((data, ctx) => {
    if(data.otherRecipient) {
      if(data.fullNameRecipient!.trim().length <= 2) {
        ctx.addIssue({
          code: "custom",
          path: ["fullNameRecipient"],
          message: "Ім'я повинно містити не менше 3 символів",
        })
      }
      if(data.phoneNumberRecipient!.trim().length <= 9) {
        ctx.addIssue({
          code: "custom",
          path: ["phoneNumberRecipient"],
          message: "Некоректний номер телефону",
        })
      }
    }
    if (data.deliveryType === "nova-post" && (!data.novaPostCity || data.novaPostCity.trim().length === 0)) {
      ctx.addIssue({
        code: "custom",
        path: ["novaPostCity"],
        message: "Оберіть місто",
      });
    }

    // Перевірка для обов'язковості `ukrPostCity`, якщо обрано 'ukr-post'
    if (data.deliveryType === "ukr-post" && (!data.ukrPostCity || data.ukrPostCity.trim().length === 0)) {
      ctx.addIssue({
        code: "custom",
        path: ["ukrPostCity"],
        message: "Оберіть місто",
      });

      if (data.deliveryType === "ukr-post" && (!data.ukrPostDepartment || data.ukrPostDepartment.trim().length === 0)) {
        ctx.addIssue({
          code: "custom",
          path: ["ukrPostDepartment"],
          message: "Оберіть відділення",
        });
      }
    }

    // Перевірка для обов'язковості `novaPostTypeDelivery`, якщо обрано 'nova-post'
    if (data.deliveryType === "nova-post" && (!data.novaPostTypeDelivery || data.novaPostTypeDelivery.trim().length === 0)) {
      ctx.addIssue({
        code: "custom",
        path: ["novaPostTypeDelivery"],
        message: "Оберіть тип доставки",
      });
    }

    // Перевірка для "department", якщо обрано "department"
    if (
      data.novaPostTypeDelivery === "department" &&
      (!data.department || data.department.trim().length === 0)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["department"],
        message: "Вкажіть найближче відділення",
      });
    }

    // Перевірка для "street", якщо обрано "courier"
    if (
      data.novaPostTypeDelivery === "courier" &&
      (!data.street || data.street.trim().length === 0)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["street"],
        message: "Вкажіть назву вулиці",
      });
    }

    // Перевірка для "numberStreet", якщо обрано "courier"
    if (
      data.novaPostTypeDelivery === "courier" &&
      (!data.numberStreet || data.numberStreet.trim().length === 0)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["numberStreet"],
        message: "Вкажіть номер будинку",
      });
    }
  });

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
