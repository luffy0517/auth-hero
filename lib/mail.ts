import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Código da Autentificação de 2 Fatores",
    html: `
      <p>Olá!</p>
      <p>Recebemos uma solicitação de código de autentificação de 2 fatores associada a este endereço de e-mail. </p> 
      <p>Seu token: ${token}
      <p>Se você não solicitou um código, por favor, ignore este e-mail.</p>
      <p>Atenciosamente,<br/>AuthHero</p>
    `,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Recupere a sua senha",
    html: `
      <p>Olá!</p>
      <p>Recebemos uma solicitação para redefinir a senha associada a este endereço de e-mail. Clique <a href="${resetLink}">aqui</a> para criar uma nova senha.</p>
      <p>Se você não solicitou a recuperação da senha, por favor, ignore este e-mail.</p>
      <p>Atenciosamente,<br/>AuthHero</p>
    `,
  });
};


export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirme o seu email para acessar o AuthHERO",
    html: `
      <p>Olá!</p>
      <p>Para aproveitar ao máximo os recursos do AuthHero, precisamos verificar seu endereço de e-mail. Clique <a href="${confirmLink}">aqui</a> para confirmar seu e-mail.</p>
      <p>Se você não se registrou no AuthHero, por favor, ignore este e-mail.</p>
      <p>Atenciosamente,<br/>AuthHero</p>
    `,
  });
};
