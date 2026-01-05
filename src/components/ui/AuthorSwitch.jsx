import { useAuthor } from '../../context/AuthorContext'

/**
 * Componente responsável por alternar o autor ativo da aplicação.
 *
 * Ele:
 * - Lê o autor atual a partir do AuthorContext
 * - Dispara a troca de autor
 * - Reflete visualmente o estado ativo
 * - Bloqueia interação durante transições animadas
 *
 * Esse componente é utilizado no header do layout principal.
 *
 * @param {Object} props
 * @param {string} props.authorKey - Identificador único do autor (ex: "joao", "ellen")
 * @param {string} props.label - Texto exibido no botão
 *
 * @returns {JSX.Element}
 */
export default function AuthorSwitch({ authorKey, label }) {
    /**
     * Contexto de autor:
     * - author → autor atualmente ativo
     * - changeAuthor → função para trocar autor
     * - isTransitioning → indica se uma animação global está em execução
     */
    const { author, changeAuthor,  isTransitioning } = useAuthor()

    /**
     * Indica se este botão representa o autor ativo
     */
    const isActive = author === authorKey

    /**
     * Desabilita interação durante transições
     * para evitar estados inconsistentes
     */
    const isDisabled = isTransitioning
    
    return  (
        <div className='flex justify-between items-center'>
            <button
                onClick={() => changeAuthor(authorKey)}
                disabled={isDisabled}
                className={`
                    font-semibold transition-colors duration-300
                    ${isActive ? 'text-primary' : 'text-gray-400'}
                `}
            >
                {label}
            </button>
        </div>
    )
}