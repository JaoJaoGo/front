import { motion, AnimatePresence } from 'framer-motion'
import { useAuthor } from '../../context/AuthorContext'

/**
 * Componente responsável por exibir a animação de transição
 * em formato de "slash" diagonal entre mudanças de estado/tela.
 *
 * A animação:
 * - É controlada globalmente via AuthorContext
 * - Não interfere em interações do usuário
 * - Utiliza Framer Motion para entrada/saída suaves
 *
 * Ideal para:
 * - Troca de autores
 * - Mudança de temas
 * - Transições visuais marcantes sem navegação de rota
 *
 * @returns {JSX.Element|null}
 */
export default function SlashTransition() {
    /**
     * Flag que indica se a transição deve ser exibida.
     * Controlada pelo AuthorContext.
     *
     * @type {boolean}
     */
    const { isTransitioning } = useAuthor()

    return (
        /**
         * AnimatePresence permite animações de entrada e saída
         * quando o componente é montado ou desmontado.
         *
         * mode="wait" garante que a animação de saída finalize
         * antes de uma nova entrada (evita sobreposição visual).
         */
        <AnimatePresence mode='wait'>
            {isTransitioning && (
                <motion.div
                /**
                 * Key fixa garante que o Framer Motion
                 * reconheça corretamente o ciclo de vida
                 * do elemento animado.
                 */
                key='slash'

                /**
                 * Estado inicial fora da tela,
                 * com inclinação diagonal.
                 */
                initial={{ x: '-120%', y: '-120%', rotate: -35 }}

                /**
                 * Animação atravessando a tela
                 * no sentido diagonal oposto.
                 */
                animate={{ x: '120%', y: '120%', rotate: -35 }}

                /**
                 * Estado de saída simples,
                 * apenas com fade-out.
                 */
                exit={{ opacity: 0 }}

                /**
                 * Configuração da animação:
                 * - Duração curta para impacto visual
                 * - Ease suave para evitar cortes secos
                 */
                transition={{ duration: 0.8, ease: 'easeInOut' }}

                /**
                 * Gradiente dinâmico baseado em variáveis CSS,
                 * permitindo integração com temas.
                 */
                style={{
                    background: `
                    linear-gradient(
                        135deg,
                        var(--primary),
                        rgba(255, 255, 255, 0.2),
                        var(--accent)
                    )
                    `
                }}

                /**
                 * Estilos utilitários:
                 * - fixed: cobre a viewport
                 * - z-50: sobreposição acima da UI
                 * - pointer-events-none: não bloqueia cliques
                 */
                className="
                    fixed top-1/2 left-1/2
                    w-[120vw] h-[45vh]
                    -translate-x-1/2 -translate-y-1/2
                    z-50
                    pointer-events-none
                "
            />
            )}
        </AnimatePresence>
    )
}