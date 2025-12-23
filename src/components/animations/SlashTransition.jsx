import { motion, AnimatePresence } from 'framer-motion'
import { useAuthor } from '../../context/AuthorContext'

export default function SlashTransition() {
    const { isTransitioning } = useAuthor()

    console.log('transition:', isTransitioning)

    return (
        <AnimatePresence mode='wait'>
            {isTransitioning && (
                <motion.div
                key='slash'
                initial={{ x: '-120%', y: '-120%', rotate: -35 }}
                animate={{ x: '120%', y: '120%', rotate: -35 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{
                    background: `
                    linear-gradient(
                        135deg,
                        var(--primary),
                        var(--accent)
                    )
                    `
                }}
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