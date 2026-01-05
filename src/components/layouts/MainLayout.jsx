import { Outlet, useNavigate } from 'react-router-dom';
import TypingLogo from '../ui/TypingLogo';
import AuthorSwitch from '../ui/AuthorSwitch';
import SlashTransition from '../animations/SlashTransition';
import { useAuth } from '../../hooks/useAuth';

/**
 * Layout principal da aplicação.
 *
 * Responsável por:
 * - Definir a estrutura global (header + conteúdo)
 * - Centralizar elementos visuais recorrentes
 * - Controlar logout e redirecionamento
 * - Renderizar transições globais de animação
 *
 * Este layout envolve todas as rotas autenticadas
 * através do <Outlet /> do React Router.
 *
 * @returns {JSX.Element}
 */
export default function MainLayout() {
    /**
     * Hook de autenticação:
     * - isAuthenticated → indica se há sessão ativa
     * - signOut → encerra sessão local + backend
     */
    const { isAuthenticated, signOut } = useAuth();

    /**
     * Hook de navegação programática
     */
    const navigate = useNavigate();

    /**
     * Realiza logout do usuário e redireciona
     * para a página de login.
     *
     * O await garante que o estado global seja limpo
     * antes da navegação.
     */
    async function handleLogout() {
        await signOut();
        navigate('/login');
    }
    
    return (
        /**
         * Container raiz do layout:
         * - min-h-screen garante altura mínima da viewport
         * - relative permite overlays absolutos (SlashTransition)
         * - background dinâmico via CSS variables
         */
        <div className="min-h-screen text-white transition-colors duration-300 relative" 
             style={{background: `var(--bg)`}}
        >
            {/**
             * Animação global de transição.
             * Fica fora do fluxo visual do layout,
             * sobrepondo toda a interface quando ativa.
             */}
            <SlashTransition />

            {/**
             * Header fixo do layout.
             * Estrutura em grid para manter simetria:
             * - esquerda: AuthorSwitch
             * - centro: logo animado
             * - direita: AuthorSwitch
             */}
            <header className="grid grid-cols-3 items-center p-6 border-b border-gray-800">
                {/* Coluna da esquerda */}
                <div className="flex justify-start">
                    <AuthorSwitch authorKey="joao" label="João" />
                </div>

                {/* Coluna do centro */}
                <div className="flex justify-center">
                    <TypingLogo />
                </div>

                {/* Coluna da direita */}
                <div className="flex justify-end">
                    <AuthorSwitch authorKey="ellen" label="Ellen" />
                </div>
            </header>

            {/**
             * Área principal de conteúdo.
             * O <Outlet /> renderiza a rota filha ativa.
             */}
            <main className='p-6'>
                {/**
                 * Ação de logout exibida apenas
                 * quando o usuário está autenticado.
                 */}
                {isAuthenticated && (
                    <button onClick={handleLogout}>Sair</button>
                )}

                <Outlet />
            </main>
        </div>
    )
}