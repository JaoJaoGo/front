import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { signIn, loading, error } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        await signIn({ email, password });
        
        if (error === null) {
            navigate('/');
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-950'>
            <form 
                onSubmit={handleSubmit}
                className='w-full max-w-sm bg-gray-900 p-6 rounded-xl shadow-lg'
            >
                <h1 className='text-2xl font-bold mb-6 text-center'>
                    Login
                </h1>

                <input 
                    type="email" 
                    placeholder='Email'
                    className='w-full mb-3 p-3 rounded bg-gray-800 text-white'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <input 
                    type="password" 
                    placeholder='Senha'
                    className='w-full mb-4 p-3 rounded bg-gray-800 text-white'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                {error && (
                    <p className='text-red-500 text-sm mb-3'>
                        {error}
                    </p>
                )}

                <button
                    type='submit'
                    disabled={loading}
                    className='w-full bg-indigo-600 hover:bg-indigo-700 transition p-3 rounded font-semibold'
                >
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>
        </div>
    )
}