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
    withCredentials: true, // essencial para Sanctum SPA
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

/**
 * Garante que o cookie CSRF do Sanctum seja carregado
 * antes de qualquer requisição protegida.
 *
 * Deve ser chamado:
 * - antes do login
 * - antes da primeira requisição autenticada
 */
export async function ensureCsrfCookie() {
    await api.get('/sanctum/csrf-cookie');
}

/**
 * Interceptor para garantir CSRF automaticamente
 * em requisições mutáveis.
 */
api.interceptors.request.use(async (config) => {
    const method = config.method?.toLowerCase();

    if (['post', 'put', 'patch', 'delete'].includes(method)) {
        await ensureCsrfCookie();
    }

    return config;
});

export default api;