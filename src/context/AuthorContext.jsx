import { createContext, useContext, useState, useEffect } from 'react'

const AuthorContext = createContext()

export function AuthorProvider({ children }) {
    const [author, setAuthor] = useState('joao')
    const [nextAuthor, setNextAuthor] = useState(null)
    const [isTransitioning, setIsTransitioning] = useState(false)

    function changeAuthor(newAuthor) {
        if (newAuthor === author) return

        setNextAuthor(newAuthor)
        setIsTransitioning(true)
    }

    // Quando a transição começa, já aplicamos o TEMA DO DESTINO
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

export const useAuthor = () => {
  const context = useContext(AuthorContext)
  if (!context) {
    throw new Error('useAuthor must be used within AuthorProvider')
  }
  return context
}