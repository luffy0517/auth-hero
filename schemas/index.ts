import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "O email é obrigatório",
  }),
  password: z.string().min(1, {
    message: "A senha é obrigatória",
  }),
});
