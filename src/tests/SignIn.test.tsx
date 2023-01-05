import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignIn from '../components/SignIn';

describe('SignIn component', () => {
    let component,
        setMsg = jest.fn(),
        setShowModalMsg = jest.fn(),
        handleAuth = jest.fn(),
        setDisable = jest.fn();

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        component = render(
            <Router>
                <SignIn
                    setMsg={setMsg}
                    setShowModalMsg={setShowModalMsg}
                    handleAuth={handleAuth}
                    disable={false}
                    setDisable={setDisable}
                />
            </Router>
        );
    })

    //render
    test('component should render', () => {
        const title = screen.getByText('Registrarse')
        expect(title).toBeInTheDocument()
    });

    //Inpunts change
    test('user input should change', () => {
        const inputEl: HTMLInputElement = screen.getByLabelText('Nombre usuario')

        fireEvent.change(inputEl, {
            target: { value: 'usuario12345' }
        })

        expect(inputEl.value).toBe('usuario12345')
    });
    test('email input should change', () => {
        const inputEl: HTMLInputElement = screen.getByLabelText('Correo Electronico')

        fireEvent.change(inputEl, {
            target: { value: 'usuario12345@gmail.com' }
        })

        expect(inputEl.value).toBe('usuario12345@gmail.com')
    });
    test('password input should change', () => {
        const inputEl: HTMLInputElement = screen.getByLabelText('Contraseña')

        fireEvent.change(inputEl, {
            target: { value: '****' }
        })

        expect(inputEl.value).toBe('****')
    });

    //State validation of username, email, and password
    test('username, email, password are empty', () => {
        const submitBttn: HTMLButtonElement = screen.getByText('Registrarse!')

        jest.useFakeTimers()
        fireEvent.click(submitBttn)
        jest.runOnlyPendingTimers()
        jest.useRealTimers()

        expect(setMsg).toBeCalledTimes(1)
        expect(setShowModalMsg).toBeCalledTimes(2)
    })
    test('username, email, password are complete', () => {
        const submitBttn: HTMLButtonElement = screen.getByText('Registrarse!'),
            userEl: HTMLInputElement = screen.getByLabelText('Nombre usuario'),
            emailEl: HTMLInputElement = screen.getByLabelText('Correo Electronico'),
            passwordEl: HTMLInputElement = screen.getByLabelText('Contraseña');

        fireEvent.change(userEl, {
            target: { value: 'usuario12345' }
        })
        fireEvent.change(emailEl, {
            target: { value: 'usuario12345@gmail.com' }
        })
        fireEvent.change(passwordEl, {
            target: { value: '****' }
        })

        fireEvent.click(submitBttn)

        expect(handleAuth).toBeCalledTimes(1)
        expect(handleAuth).toBeCalledWith('register', {username: 'usuario12345', email: 'usuario12345@gmail.com', password: '****'})
        expect(setDisable).toBeCalledTimes(1)
        expect(setDisable).toBeCalledWith(true)
    })
    test('email, password are complete but not username', () => {
        const submitBttn: HTMLButtonElement = screen.getByText('Registrarse!'),
            emailEl: HTMLInputElement = screen.getByLabelText('Correo Electronico'),
            passwordEl: HTMLInputElement = screen.getByLabelText('Contraseña');

        fireEvent.change(emailEl, {
            target: { value: 'usuario12345@gmail.com' }
        })
        fireEvent.change(passwordEl, {
            target: { value: '****' }
        })

        fireEvent.click(submitBttn)

        expect(handleAuth).toBeCalledTimes(0)
        expect(setDisable).toBeCalledTimes(0)
    })
    test('username, password are complete but not email', () => {
        const submitBttn: HTMLButtonElement = screen.getByText('Registrarse!'),
            userEl: HTMLInputElement = screen.getByLabelText('Nombre usuario'),
            passwordEl: HTMLInputElement = screen.getByLabelText('Contraseña');

        fireEvent.change(userEl, {
            target: { value: 'usuario12345' }
        })
        fireEvent.change(passwordEl, {
            target: { value: '****' }
        })

        fireEvent.click(submitBttn)

        expect(handleAuth).toBeCalledTimes(0)
        expect(setDisable).toBeCalledTimes(0)
    })
    test('username, email are complete but not password', () => {
        const submitBttn: HTMLButtonElement = screen.getByText('Registrarse!'),
            userEl: HTMLInputElement = screen.getByLabelText('Nombre usuario'),
            emailEl: HTMLInputElement = screen.getByLabelText('Correo Electronico');

        fireEvent.change(userEl, {
            target: { value: 'usuario12345' }
        })
        fireEvent.change(emailEl, {
            target: { value: 'usuario12345@gmail.com' }
        })
        
        fireEvent.click(submitBttn)

        expect(handleAuth).toBeCalledTimes(0)
        expect(setDisable).toBeCalledTimes(0)
    })
})