import { useAuthor } from '../../context/AuthorContext'

export default function AuthorSwitch({ authorKey, label }) {
    const { author, changeAuthor,  isTransitioning } = useAuthor()
    const isActive = author === authorKey
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