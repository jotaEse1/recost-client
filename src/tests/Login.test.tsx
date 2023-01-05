import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../components/Login';

describe('Login component', () => {
    let component,
        setMsg = jest.fn(),
        setShowModalMsg = jest.fn(),
        handleAuth = jest.fn(),
        setDisable = jest.fn();

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        component = render(
            <Router>
                <Login
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
        const title = screen.getByText('Ingresar')
        expect(title).toBeInTheDocument()
    });

    //Inpunts change
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
    test('email input should be empty', () => {
        const inputEl: HTMLInputElement = screen.getByLabelText('Correo Electronico')

        expect(inputEl.value).toBe("")
    });
    test('password input should be empty', () => {
        const inputEl: HTMLInputElement = screen.getByLabelText('Contraseña')

        expect(inputEl.value).toBe("")
    });

    //State validation of username, email, and password
    test('email, password empty', () => {
        const submitBttn: HTMLButtonElement = screen.getByText('Ingresar!')

        jest.useFakeTimers()
        fireEvent.click(submitBttn)
        jest.runOnlyPendingTimers()
        jest.useRealTimers()

        expect(setMsg).toBeCalledTimes(1)
        expect(setShowModalMsg).toBeCalledTimes(2)
    })
    test('email, password complete', () => {
        const submitBttn: HTMLButtonElement = screen.getByText('Ingresar!'),
            emailEl: HTMLInputElement = screen.getByLabelText('Correo Electronico'),
            passwordEl: HTMLInputElement = screen.getByLabelText('Contraseña');

        fireEvent.change(emailEl, {
            target: { value: 'usuario12345@gmail.com' }
        })
        fireEvent.change(passwordEl, {
            target: { value: '****' }
        })

        fireEvent.click(submitBttn)

        expect(handleAuth).toBeCalledTimes(1)
        expect(handleAuth).toBeCalledWith('login', {email: 'usuario12345@gmail.com', password: '****'})
        expect(setDisable).toBeCalledTimes(1)
        expect(setDisable).toBeCalledWith(true)
    })
    test('email complete', () => {
        const submitBttn: HTMLButtonElement = screen.getByText('Ingresar!'),
            emailEl: HTMLInputElement = screen.getByLabelText('Correo Electronico');

        fireEvent.change(emailEl, {
            target: { value: 'usuario12345@gmail.com' }
        })
    
        fireEvent.click(submitBttn)

        expect(handleAuth).toBeCalledTimes(0)
        expect(setDisable).toBeCalledTimes(0)
    })
    test('password complete', () => {
        const submitBttn: HTMLButtonElement = screen.getByText('Ingresar!'),
            passwordEl: HTMLInputElement = screen.getByLabelText('Contraseña');

        fireEvent.change(passwordEl, {
            target: { value: '****' }
        })

        fireEvent.click(submitBttn)

        expect(handleAuth).toBeCalledTimes(0)
        expect(setDisable).toBeCalledTimes(0)
    })

})