import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import MainLayout from '../components/layouts/MainLayout';

/**
 * Define as rotas principais da aplicação.
 *
 * Estrutura de rotas:
 * - /login → Página de autenticação (layout independente)
 * - /      → Página inicial protegida pelo MainLayout
 *
 * O MainLayout atua como um layout compartilhado,
 * encapsulando páginas que exigem estrutura comum
 * (ex: header, sidebar, autenticação, etc.).
 *
 * @returns {JSX.Element} Estrutura de rotas da aplicação
 */
export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />

                <Route element={<MainLayout />}>
                    <Route path='/' element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}