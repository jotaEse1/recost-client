import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import RecipeInfoModal from '../components/RecipeInfoModal';

describe('RecipeInfoModal component', () => {
    let setShowModalRecipeInfo = jest.fn(),
        setShowModalRecipe = jest.fn(),
        setShowModalRecipeItems = jest.fn(),
        setMsg = jest.fn(),
        setShowModalMsg = jest.fn(),
        user = '1',
        handleRecipe = jest.fn();

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Router>
                <RecipeInfoModal
                    setShowModalRecipeInfo={setShowModalRecipeInfo}
                    setShowModalRecipe={setShowModalRecipe}
                    setShowModalRecipeItems={setShowModalRecipeItems}
                    setMsg={setMsg}
                    setShowModalMsg={setShowModalMsg}
                    user={user}
                    handleRecipe={handleRecipe}
                />
            </Router>
        );
    })

    //render
    test('component should render', () => {
        const title = screen.getByText('Nueva Receta')
        expect(title).toBeInTheDocument()
    })
    test('should inputs work', () => {
        const titleInput: HTMLInputElement = screen.getByPlaceholderText('Ingrese un título'),
            descriptionInput: HTMLInputElement = screen.getByPlaceholderText('Ingrese una descripción');

        fireEvent.change(titleInput, { target: { value: 'Chocotorta' } })
        fireEvent.change(descriptionInput, { target: { value: 'Choco especial' } })

        expect(titleInput.value).toBe('Chocotorta')
        expect(descriptionInput.value).toBe('Choco especial')
    })
    test('should cancel stage 1 of creating a new recipe', () => {
        const buttonEl = screen.getByText('Cancelar')

        jest.useFakeTimers()
        fireEvent.click(buttonEl)

        act(() => {
            jest.runOnlyPendingTimers()
            jest.useRealTimers()
        })

        expect(setShowModalRecipe).toBeCalled()
        expect(setShowModalRecipe).toBeCalledWith(false)
        expect(setShowModalRecipeInfo).toBeCalled()
        expect(setShowModalRecipeInfo).toBeCalledWith(false)

    })
    test('should not complete stage 1 because both inputs are empty', () => {
        const buttonEl = screen.getByText('Continuar')

        jest.useFakeTimers()
        fireEvent.click(buttonEl)

        act(() => {
            jest.runOnlyPendingTimers()
            jest.useRealTimers()
        })

        expect(setMsg).toBeCalled()
        expect(setMsg).toBeCalledWith('Casilleros incompletos')
    })
    test('should not complete stage 1 because one input is empty', () => {
        const titleInput: HTMLInputElement = screen.getByPlaceholderText('Ingrese un título'),
            buttonEl = screen.getByText('Continuar');

        fireEvent.change(titleInput, { target: { value: 'Chocotorta' } })

        jest.useFakeTimers()
        fireEvent.click(buttonEl)

        act(() => {
            jest.runOnlyPendingTimers()
            jest.useRealTimers()
        })

        expect(setMsg).toBeCalled()
        expect(setMsg).toBeCalledWith('Casilleros incompletos')
    })
    test('should not complete stage 1 because description it is very long', () => {
        const descriptionInput: HTMLInputElement = screen.getByPlaceholderText('Ingrese una descripción'),
            titleInput: HTMLInputElement = screen.getByPlaceholderText('Ingrese un título'),
            buttonEl = screen.getByText('Continuar');

        fireEvent.change(titleInput, { target: { value: 'Chocotorta' } })
        fireEvent.change(descriptionInput, { target: { value: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' } })

        jest.useFakeTimers()
        fireEvent.click(buttonEl)

        act(() => {
            jest.runOnlyPendingTimers()
            jest.useRealTimers()
        })

        expect(setMsg).toBeCalled()
        expect(setMsg).toBeCalledWith('Ingrese una descripción mas corta')
    })
    test('should complete stage 1 of creating a new recipe', () => {
        const buttonEl = screen.getByText('Continuar'),
            titleInput: HTMLInputElement = screen.getByPlaceholderText('Ingrese un título'),
            descriptionInput: HTMLInputElement = screen.getByPlaceholderText('Ingrese una descripción');

        fireEvent.change(titleInput, { target: { value: 'Chocotorta' } })
        fireEvent.change(descriptionInput, { target: { value: 'Choco especial' } })

        jest.useFakeTimers()
        fireEvent.click(buttonEl)

        act(() => {
            jest.runOnlyPendingTimers()
            jest.useRealTimers()
        })

        expect(handleRecipe).toBeCalled()
        expect(handleRecipe).toBeCalledWith('new', { title: 'Chocotorta', description: 'Choco especial', idUser: ''})
        expect(setShowModalRecipeItems).toBeCalled()
        expect(setShowModalRecipeItems).toBeCalledWith(true)
        expect(setShowModalRecipeInfo).toBeCalled()
        expect(setShowModalRecipeInfo).toBeCalledWith(false)
    });
})