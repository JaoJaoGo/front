import axios from 'axios';

/**
 * Instância configurada do Axios para comunicação com a API.
 * 
 * Configurações padrão:
 * - baseURL definida via variável de ambiente (VITE_API_URL)
 * - Cabeçalhos JSON para requisições e respostas
 * 
 * Esta instância deve ser reutilizada em toda a aplicação
 * para garantir consistência e facilitar manutenção.
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

/**
 * Define ou remove o token de autenticação nos headers padrão do Axios.
 * 
 * Quando definido, o token será enviado automaticamente
 * em todas as requisições subsequentes através do header:
 * 
 * Authorization: {tokenType} {token}
 * 
 * Geralmente utilizado após login e removido no logout.
 * 
 * @param {string|null} token Token de autenticação (ex: JWT ou Sanctum)
 * @param {string} [tokenType='Bearer'] Tipo do token utilizado no header Authorization
 * 
 * @returns {void}
 */
export function setAuthToken(token, tokenType = 'Bearer') {
    if (token) {
        api.defaults.headers.common.Authorization = `${tokenType} ${token}`;
    } else {
        delete api.defaults.headers.common.Authorization;
    }
}

export default api;