import React from 'react';
import './NavBar.css'
import { useNavigate } from 'react-router-dom';
import { loginForm, registerForm } from '../interfaces/interfaces';

interface Props {
    handleAuth: (action: string, data: registerForm | loginForm) => void
}

const data = {email: '', password: ''}

const NavBar: React.FC<Props> = ({handleAuth}) => {
    const navigate = useNavigate();

    return (
        <header className='header'>
            <h2>Recost</h2>
            <nav>
                <ul>
                    <li
                        onClick={() => navigate('/recost-client/main')}
                    >Inicio</li>
                    <li
                        onClick={() => handleAuth('logout', data)}
                    >Cerrar sesión</li>
                </ul>
            </nav>
        </header>
    );
};

export default NavBar;