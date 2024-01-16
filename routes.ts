/**
 * Array de rotas publicas
 * Não necessita que o usuário esteja logado
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * Array de rotas usadas para autentificação
 * Essas rotas irão redirecionar os usuários logados para /settings
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error", "/auth/reset", "/auth/new-password"];

/**
 * Prefixo para as rotas de autentificação
 * Rotas que possuem esse prefixo são usadas para autentificação com API(NextAuth)
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Rota padrão de redirecionamento após o login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"