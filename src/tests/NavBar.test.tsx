import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from '../components/NavBar';

describe('NavBar component', () => {
    let handleAuth = jest.fn()

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Router>
                <NavBar
                    handleAuth={handleAuth}
                />
            </Router>
        );
    })

    test('component should render', () => {
        const title = screen.getByText('Recost');

        expect(title).toBeInTheDocument()
    })
    test('should call handleAuth with logout', () => {
      const liEl = screen.getByText('Cerrar sesión')

      fireEvent.click(liEl)

      expect(handleAuth).toBeCalled()
      expect(handleAuth).toBeCalledWith('logout', {email: '', password: ''})
    })
    
})
