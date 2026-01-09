import { createContext, useContext, useEffect, useState } from 'react';
import { loginRequest, logoutRequest, meRequest } from '../services/authService';

/**
 * Contexto responsável por gerenciar
 * a autenticação via Sanctum (SPA).
 */
const AuthContext = createContext(null);

/**
 * Provider responsável por inicializar e manter
 * o estado de autenticação da aplicação.
 *
 * Deve envolver toda a aplicação (ou as rotas
 * que dependem de autenticação).
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children Componentes filhos
 *
 * @returns {JSX.Element}
 */
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    /**
     * Indica se existe um usuário autenticado.
     *
     * @type {boolean}
     */
    const isAuthenticated = Boolean(user);

    /**
     * Bootstrap da sessão.
     *
     * Executado uma única vez na inicialização da aplicação.
     * Verifica se existe um token persistido e,
     * caso exista, tenta recuperar o usuário autenticado.
     */
    useEffect(() => {
        bootstrapAuth();
    }, []);

    /**
     * Inicializa a sessão de autenticação.
     *
     * - Recupera token armazenado no localStorage
     * - Configura o token no Axios
     * - Busca os dados do usuário autenticado
     *
     * Em caso de erro, a sessão é limpa.
     *
     * @returns {Promise<void>}
     */
    async function bootstrapAuth() {
        try {
            const user = await meRequest();
            setUser(user);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    /**
     * Realiza o login do usuário.
     *
     * - Executa a autenticação via API
     * - Persiste o token no localStorage
     * - Configura o token no Axios
     * - Atualiza o estado do usuário
     *
     * @param {Object} params
     * @param {string} params.email E-mail do usuário
     * @param {string} params.password Senha do usuário
     *
     * @returns {Promise<Object>} Usuário autenticado
     */
    async function login({ email, password }) {
        const { user } = await loginRequest({ email, password });
        setUser(user);
        return user;
    }

    /**
     * Realiza o logout do usuário.
     *
     * - Invalida o token no backend
     * - Remove dados de sessão local
     * - Reseta estado de autenticação
     *
     * @returns {Promise<void>}
     */
    async function logout() {
        try {
            await logoutRequest();
        } finally {
            setUser(null);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Hook utilitário para acesso ao AuthContext.
 *
 * Garante que o contexto esteja sendo utilizado
 * dentro de um AuthProvider.
 *
 * @returns {Object} Contexto de autenticação
 *
 * @throws {Error} Quando utilizado fora do AuthProvider
 */
export function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthContext deve estar dentro de AuthProvider');
    }

    return context;
}