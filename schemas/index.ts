import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    email: z.optional(z.string().email()),
    password: z.optional(
      z.string().min(6, {
        message: "A senha deve ter no mínimo 6 caracteres",
      }),
    ),
    newPassword: z.optional(
      z.string().min(6, {
        message: "A senha deve ter no mínimo 6 caracteres",
      }),
    ),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    { message: "A nova senha é obrigatória!", path: ["newPassword"] },
  )
  .refine(
    (data) => {
      if (!data.password && data.newPassword) {
        return false;
      }

      return true;
    },
    { message: "A senha é obrigatória!", path: ["Password"] },
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "A senha deve ter no mínimo 6 caracteres",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "O email é obrigatório",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "O email é obrigatório",
  }),
  password: z.string().min(1, {
    message: "A senha é obrigatória",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "O email é obrigatório",
  }),
  password: z.string().min(6, {
    message: "A senha deve ter no mínimo 6 caracteres",
  }),
  name: z.string().min(1, {
    message: "O nome é obrigatório",
  }),
});
