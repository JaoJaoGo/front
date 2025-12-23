import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const text = "Blogex"

export default function TypingLogo() {
    const [displayedText, setDisplayedText] = useState('')
    const [showCursor, setShowCursor] = useState(true)

    // Efeito de digitação
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

    // Cursor piscando
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