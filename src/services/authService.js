import api, {ensureCsrfCookie} from './api';

/**
 * Realiza a requisição de login do usuário.
 *
 * Envia as credenciais para a API e retorna
 * os dados de autenticação em caso de sucesso.
 *
 * Resposta esperada:
 * - user: dados do usuário autenticado
 *
 * @param {Object} params
 * @param {string} params.email E-mail do usuário
 * @param {string} params.password Senha do usuário
 *
 * @returns {Promise<Object>} Dados de autenticação retornados pela API
 */
export async function loginRequest({ email, password }) {
    await ensureCsrfCookie();
    
    const response = await api.post('/login', {
        email,
        password,
    });

    return response.data;
}

/**
 * Retorna os dados do usuário autenticado.
 *
 * Requer que o token de autenticação já esteja
 * configurado nos headers da instância Axios.
 *
 * @returns {Promise<Object>} Dados do usuário autenticado
 */
export async function meRequest() {
    const response = await api.get('/me');

    return response.data.user;
}

/**
 * Realiza o logout do usuário autenticado.
 *
 * Invalida o token de acesso atual no backend
 * e encerra a sessão da API.
 *
 * @returns {Promise<void>}
 */
export async function logoutRequest() {
    await api.post('/logout');
}