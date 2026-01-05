import { createContext, useContext, useState, useEffect } from 'react'

/**
 * Contexto responsável por gerenciar o autor ativo da aplicação.
 *
 * O autor influencia:
 * - Tema visual (via atributo data-author)
 * - Transições animadas globais
 *
 * Este contexto foi projetado para:
 * - Evitar trocas instantâneas de tema
 * - Permitir animações de transição entre autores
 * - Garantir consistência visual durante a animação
 */
const AuthorContext = createContext()

/**
 * Provider do AuthorContext.
 *
 * Responsabilidades:
 * - Controlar o autor atual
 * - Orquestrar a transição entre autores
 * - Aplicar o tema do autor de destino antecipadamente
 * - Expor estado de transição para a UI
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children Componentes filhos
 *
 * @returns {JSX.Element}
 */
export function AuthorProvider({ children }) {
    /**
     * Autor atualmente ativo
     */
    const [author, setAuthor] = useState('joao')

    /**
     * Próximo autor a ser aplicado após a transição
     */
    const [nextAuthor, setNextAuthor] = useState(null)

    /**
     * Indica se uma transição de autor está em andamento
     */
    const [isTransitioning, setIsTransitioning] = useState(false)

    /**
     * Inicia a transição para um novo autor.
     *
     * - Ignora chamadas redundantes
     * - Define o autor de destino
     * - Ativa o estado global de transição
     *
     * @param {string} newAuthor Identificador do autor de destino
     * @returns {void}
     */
    function changeAuthor(newAuthor) {
        if (newAuthor === author) return

        setNextAuthor(newAuthor)
        setIsTransitioning(true)
    }

    /**
     * Efeito de transição:
     *
     * - Executa quando um novo autor é definido
     * - Aplica imediatamente o tema do autor de destino
     * - Finaliza a transição após um pequeno delay
     *
     * O delay deve estar sincronizado com as animações visuais
     * (ex: SlashTransition).
     */
    useEffect(() => {
        if (!nextAuthor) return

        document.documentElement.setAttribute('data-author', nextAuthor)

        const timeout = setTimeout(() => {
            setAuthor(nextAuthor)
            setNextAuthor(null)
            setIsTransitioning(false)
        }, 100) // 100ms = 0.1s

        return () => clearTimeout(timeout)
    }, [nextAuthor])

    return (
        <AuthorContext.Provider value={{ author, changeAuthor, isTransitioning }}>
            <div data-author={author}>
                {children}
            </div>
        </AuthorContext.Provider>
    )
}

/**
 * Hook de acesso ao AuthorContext.
 *
 * Garante que o contexto esteja disponível
 * e lança erro caso seja utilizado fora do Provider.
 *
 * @returns {{
 *   author: string,
 *   changeAuthor: (author: string) => void,
 *   isTransitioning: boolean
 * }}
 *
 * @throws {Error} Caso utilizado fora do AuthorProvider
 */
export const useAuthor = () => {
  const context = useContext(AuthorContext)
  if (!context) {
    throw new Error('useAuthor must be used within AuthorProvider')
  }
  return context
}