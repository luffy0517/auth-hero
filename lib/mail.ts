import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirme o seu email para acessar o AuthHero",
    html: `<p>Clique <a href="${confirmLink}">aqui<a/> para confirmar o seu email!<p/>`,
  });
};
