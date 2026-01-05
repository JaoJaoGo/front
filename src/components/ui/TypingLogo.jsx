import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const text = "Blogex"

/**
 * Componente responsável por exibir o logo da aplicação
 * com efeito de digitação (typing effect) e cursor piscante.
 *
 * Funcionalidades:
 * - Digita o texto letra por letra ao montar o componente
 * - Exibe um cursor "_" com animação de piscar
 * - Utiliza framer-motion apenas para animar a opacidade do cursor
 *
 * Este componente é puramente visual e não possui
 * efeitos colaterais globais.
 *
 * @returns {JSX.Element}
 */
export default function TypingLogo() {
    /**
     * Texto atualmente exibido no efeito de digitação
     */
    const [displayedText, setDisplayedText] = useState('')

    /**
     * Controla a visibilidade do cursor piscante
     */
    const [showCursor, setShowCursor] = useState(true)

    /**
     * Efeito de digitação:
     * - Executa apenas uma vez ao montar o componente
     * - Incrementa o texto exibido letra por letra
     */
    useEffect(() => {
        let index = 0

        const interval = setInterval(() => {
            setDisplayedText(text.slice(0, index + 1))
            index++

            if (index === text.length) {
                clearInterval(interval)
            }
        }, 120)

        return () => clearInterval(interval)
    }, [])

    /**
     * Efeito do cursor piscante:
     * - Alterna a opacidade do cursor
     * - Executa continuamente enquanto o componente existir
     */
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev)
        }, 500)

        return () => clearInterval(cursorInterval)
    }, [])

    return (
        <h1 className='text-xl font-bold font-mono'>
            {displayedText}
            <motion.span
                animate={{ opacity: showCursor? 1 : 0 }}
                transition={{ duration: 0.1 }}
            >
                _
            </motion.span>
        </h1>
    )
}