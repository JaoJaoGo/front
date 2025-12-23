import { useState } from 'react';

export default function Login() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        // Chamar service de login aqui (não deveriamos usar hooks?)
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
                />

                <input 
                    type="password" 
                    placeholder='Senha'
                    className='w-full mb-4 p-3 rounded bg-gray-800 text-white'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button
                    type='submit'
                    className='w-full bg-indigo-600 hover:bg-indigo-700 transition p-3 rounded font-semibold'
                >
                    Entrar
                </button>
            </form>
        </div>
    )
}