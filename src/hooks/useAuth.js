import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

/**
 * Hook responsável por abstrair a lógica de autenticação
 * da aplicação.
 *
 * Atua como uma camada intermediária entre os componentes
 * de UI e o AuthContext, oferecendo uma API simples e
 * previsível para login e logout.
 *
 * Responsabilidades:
 * - Executar login e logout
 * - Expor estado do usuário autenticado
 * - Controlar estados de loading e erro
 *
 * @returns {Object}
 * @returns {Function} returns.signIn Realiza o login do usuário
 * @returns {Function} returns.signOut Realiza o logout do usuário
 * @returns {Object|null} returns.user Usuário autenticado
 * @returns {boolean} returns.isAuthenticated Indica se o usuário está autenticado
 * @returns {boolean} returns.loading Indica se uma ação de autenticação está em andamento
 * @returns {string|null} returns.error Mensagem de erro da autenticação
 */
export function useAuth() {
    const { login, logout, user, isAuthenticated } = useAuthContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Realiza o login do usuário.
     *
     * Encapsula a chamada ao contexto de autenticação,
     * controlando estados de loading e erro.
     *
     * Em caso de erro, a exceção é relançada para permitir
     * tratamento adicional pelo componente chamador.
     *
     * @param {Object} params
     * @param {string} params.email E-mail do usuário
     * @param {string} params.password Senha do usuário
     *
     * @returns {Promise<void>}
     *
     * @throws {any} Erro retornado pela requisição de login
     */
    async function signIn({ email, password }) {
        try {
            setLoading(true);
            setError(null);

            await login({ email, password });
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao fazer login');
            throw err;
        } finally {
            setLoading(false);
        }
    }

    /**
     * Realiza o logout do usuário.
     *
     * Encerra a sessão atual e remove os dados
     * de autenticação do contexto.
     *
     * @returns {Promise<void>}
     */
    async function signOut() {
        await logout();
    }

    return {
        signIn,
        signOut,
        user,
        isAuthenticated,
        loading,
        error,
    };
}