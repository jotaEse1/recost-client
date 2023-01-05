import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import BudgetInfoModal from '../components/BudgetInfoModal';

describe('BudgetInfoModal component', () => {
    let setShowModalBudgetInfo = jest.fn(),
        setShowModalBudget = jest.fn(),
        setShowModalBudgetItems = jest.fn(),
        setMsg = jest.fn(),
        setShowModalMsg = jest.fn(),
        user = '1',
        handleBudget = jest.fn(),
        setShowModalChooseRecipe = jest.fn(),
        setManual = jest.fn();

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Router>
                <BudgetInfoModal
                    setShowModalBudgetInfo={setShowModalBudgetInfo}
                    setShowModalBudget={setShowModalBudget}
                    setShowModalBudgetItems={setShowModalBudgetItems}
                    setMsg={setMsg}
                    setShowModalMsg={setShowModalMsg}
                    user={user}
                    handleBudget={handleBudget}
                    setShowModalChooseRecipe={setShowModalChooseRecipe}
                    setManual={setManual}
                />
            </Router>
        );
    })

    //render
    test('component should render', () => {
        const title = screen.getByText('Nuevo Presupuesto')
        expect(title).toBeInTheDocument()
    })
    test('should inputs work and manual path works', () => {
        const titleInput: HTMLInputElement = screen.getByLabelText('Título'),
            descriptionInput: HTMLInputElement = screen.getByLabelText('Descripcion'),
            manualRadioInput: HTMLInputElement = screen.getByLabelText('Carga manual'),
            buttonEl = screen.getByText('Continuar');

        //testing first if statement
        fireEvent.change(titleInput, { target: { value: 'Chocotorta' } })
        fireEvent.click(buttonEl)

        expect(titleInput.value).toBe('Chocotorta')
        expect(setMsg).toBeCalled()
        expect(setMsg).toBeCalledWith('Casilleros incompletos')

        //testing second if statement
        fireEvent.change(descriptionInput, { target: { value: 'Choco especial' } })
        fireEvent.click(buttonEl)

        expect(titleInput.value).toBe('Chocotorta')
        expect(descriptionInput.value).toBe('Choco especial')
        expect(setMsg).toBeCalled()
        expect(setMsg).toBeCalledWith('Escoja una modalidad.')

        fireEvent.click(manualRadioInput)
        jest.useFakeTimers()
        fireEvent.click(buttonEl)

        act(() => {
            jest.runOnlyPendingTimers()
            jest.useRealTimers()
        })

        expect(titleInput.value).toBe('Chocotorta')
        expect(descriptionInput.value).toBe('Choco especial')
        expect(manualRadioInput.value).toBe('manual')
        expect(handleBudget).toBeCalled()
        expect(handleBudget).toBeCalledWith('new', { title: 'Chocotorta', description: 'Choco especial', idUser: '' })
        expect(setShowModalBudgetItems).toBeCalled()
        expect(setShowModalBudgetItems).toBeCalledWith(true)
        expect(setShowModalBudgetInfo).toBeCalled()
        expect(setShowModalBudgetInfo).toBeCalledWith(false)
        expect(setManual).toBeCalled()
        expect(setManual).toBeCalledWith(true)

    })
    test('should inputs work and fast path works', () => {
        const titleInput: HTMLInputElement = screen.getByLabelText('Título'),
            descriptionInput: HTMLInputElement = screen.getByLabelText('Descripcion'),
            fastRadioInput: HTMLInputElement = screen.getByLabelText('Cargar receta'),
            buttonEl = screen.getByText('Continuar');

        fireEvent.change(titleInput, { target: { value: 'Chocotorta' } })
        fireEvent.change(descriptionInput, { target: { value: 'Choco especial' } })
        fireEvent.click(fastRadioInput)

        jest.useFakeTimers()
        fireEvent.click(buttonEl)

        act(() => {
            jest.runOnlyPendingTimers()
            jest.useRealTimers()
        })

        expect(titleInput.value).toBe('Chocotorta')
        expect(descriptionInput.value).toBe('Choco especial')
        expect(fastRadioInput.value).toBe('fast')
        expect(handleBudget).toBeCalled()
        expect(handleBudget).toBeCalledWith('new', { title: 'Chocotorta', description: 'Choco especial', idUser: '' })
        expect(setShowModalChooseRecipe).toBeCalled()
        expect(setShowModalChooseRecipe).toBeCalledWith(true)
        expect(setShowModalBudgetInfo).toBeCalled()
        expect(setShowModalBudgetInfo).toBeCalledWith(false)
        expect(setManual).toBeCalled()
        expect(setManual).toBeCalledWith(false)

    })
    test('should close the page', () => {
        const buttonEl = screen.getByText('Cancelar');

        jest.useFakeTimers()
        fireEvent.click(buttonEl)

        act(() => {
            jest.runOnlyPendingTimers()
            jest.useRealTimers()
        })

        expect(setShowModalBudget).toBeCalled()
        expect(setShowModalBudget).toBeCalledWith(false)
        expect(setShowModalBudgetInfo).toBeCalled()
        expect(setShowModalBudgetInfo).toBeCalledWith(false)
    })

})