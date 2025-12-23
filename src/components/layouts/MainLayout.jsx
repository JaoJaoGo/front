import { Outlet } from 'react-router-dom';
import TypingLogo from '../ui/TypingLogo';
import AuthorSwitch from '../ui/AuthorSwitch';
import SlashTransition from '../animations/SlashTransition';

export default function MainLayout() {
    return (
        <div className="min-h-screen text-white transition-colors duration-300 relative" 
            style={{
                    background: `var(--bg)`
                }}>
            <SlashTransition />

            <header className="grid grid-cols-3 items-center p-6 border-b border-gray-800">
                {/* Esquerda */}
                <div className="flex justify-start">
                    <AuthorSwitch authorKey="joao" label="João" />
                </div>

                {/* Centro */}
                <div className="flex justify-center">
                    <TypingLogo />
                </div>

                {/* Direita */}
                <div className="flex justify-end">
                    <AuthorSwitch authorKey="ellen" label="Ellen" />
                </div>
            </header>

            <main className='p-6'>
                <Outlet />
            </main>
        </div>
    )
}