import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "O email é obrigatório",
  }),
  password: z.string().min(1, {
    message: "A senha é obrigatória",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "O email é obrigatório",
  }),
  password: z.string().min(12, {
    message: "A senha deve ter no mínimo 12 caracteres",
  }),
  name: z.string().min(1, {
    message: "O nome é obrigatório",
  }),
});
