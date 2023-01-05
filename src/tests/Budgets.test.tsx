import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Budgets from '../components/Budgets';

describe('Budgets component', () => {
    let setShowModalBudget = jest.fn(),
        allBudgets = [
            {title: 'Chocotorta', idUser: '1', description: 'Choco especial'},
            {title: 'Oreo Cake', idUser: '1', description: 'Choco especial'},
            {title: 'Za', idUser: '1', description: 'Choco especial'},
            {title: 'Zal', idUser: '1', description: 'Choco especial'},
            {title: 'Zeu', idUser: '1', description: 'Choco especial'},
            {title: 'Zuzuky', idUser: '1', description: 'Choco especial'},
        ],
        setShowBudgetDetails = jest.fn(),
        setBudget = jest.fn(),
        setShowModalBudgetInfo = jest.fn(),
        setMsg = jest.fn(),
        setShowModalMsg = jest.fn(),
        user = '1',
        setAllBudgets = jest.fn(),
        handleAuth = jest.fn(),
        loadOption = false,
        setLoadOption = jest.fn();

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Router>
                <Budgets
                    setShowModalBudget={setShowModalBudget}
                    allBudgets={allBudgets}
                    setShowBudgetDetails={setShowBudgetDetails}
                    setBudget={setBudget}
                    setShowModalBudgetInfo={setShowModalBudgetInfo}
                    setMsg={setMsg}
                    setShowModalMsg={setShowModalMsg}
                    user={user}
                    setAllBudgets={setAllBudgets}
                    handleAuth={handleAuth}
                    loadOption={loadOption}
                    setLoadOption={setLoadOption}
                />
            </Router>
        );
    })

    test('component should render', () => {
        const title = screen.getByText('Presupuestos')
        expect(title).toBeInTheDocument()
    });
    test('should toggle from button to input, and input should works', () => {
        const buttonEl = screen.getByText('Buscar Presupuesto')

        jest.useFakeTimers()
        fireEvent.click(buttonEl)

        act(() => {
            jest.runOnlyPendingTimers()
            jest.useRealTimers()
        })

        expect(screen.getByPlaceholderText('Nombre presupuesto...')).toBeInTheDocument()
        expect(buttonEl).not.toBeInTheDocument()

        //input works
        const inputEl: HTMLInputElement = screen.getByPlaceholderText('Nombre presupuesto...')

        fireEvent.change(inputEl, {
            target: {
                value: 'Chocotorta'
            }
        })

        expect(inputEl.value).toBe('Chocotorta')
    })
    test('should show add budget modal', () => {
        const buttonEl = screen.getByText('Nuevo Presupuesto')

        fireEvent.click(buttonEl)

        expect(setShowModalBudget).toBeCalled()
        expect(setShowModalBudget).toBeCalledWith(true)
        expect(setShowModalBudgetInfo).toBeCalled()
        expect(setShowModalBudgetInfo).toBeCalledWith(true)
    })
    test('should dynamic search works', () => {
        const buttonEl = screen.getByText('Buscar Presupuesto')

        jest.useFakeTimers()
        fireEvent.click(buttonEl)

        act(() => {
            jest.runOnlyPendingTimers()
            jest.useRealTimers()
        })

        const inputEl: HTMLInputElement = screen.getByPlaceholderText('Nombre presupuesto...')

        fireEvent.change(inputEl, {
            target: {
                value: 'Z'
            }
        })

        expect(screen.getByText('Za')).toBeInTheDocument()
        expect(screen.getByText('Zal')).toBeInTheDocument()
        expect(screen.getByText('Zeu')).toBeInTheDocument()
        expect(screen.getByText('Zuzuky')).toBeInTheDocument()
        expect(screen.queryByText('Chocotorta')).not.toBeInTheDocument()
        expect(screen.queryByText('Oreo Cake')).not.toBeInTheDocument()

        fireEvent.change(inputEl, {
            target: {
                value: 'Za'
            }
        })

        expect(screen.getByText('Za')).toBeInTheDocument()
        expect(screen.queryByText('Chocotorta')).not.toBeInTheDocument()
        expect(screen.queryByText('Oreo Cake')).not.toBeInTheDocument()

        fireEvent.change(inputEl, {
            target: {
                value: 'ZACACACASSCACASCSAC'
            }
        })

        expect(screen.getByText('No hay presupuestos')).toBeInTheDocument()
    })
})