import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import RecipeConfirmation from '../components/RecipeConfirmation';

describe('RecipeConfirmation component', () => {
    let setShowModalNewRecipeConfirmation = jest.fn(),
        setShowModalRecipe = jest.fn(),
        filterRecipe = jest.fn();

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Router>
                <RecipeConfirmation
                    setShowModalNewRecipeConfirmation={setShowModalNewRecipeConfirmation}
                    setShowModalRecipe={setShowModalRecipe}
                    filterRecipe={filterRecipe}
                />
            </Router>
        );
    })

    test('component should render', () => {
        const title = screen.getByText('¿Quieres guardar la receta?')
        expect(title).toBeInTheDocument()
    })
    test('should save recipe', () => {
        const buttonEl = screen.getByRole('save')

        jest.useFakeTimers()
        fireEvent.click(buttonEl)

        act(() => {
            jest.runOnlyPendingTimers()
            jest.useRealTimers()
        })

        expect(setShowModalRecipe).toBeCalled()
        expect(setShowModalRecipe).toBeCalledWith(false)
        expect(setShowModalNewRecipeConfirmation).toBeCalled()
        expect(setShowModalNewRecipeConfirmation).toBeCalledWith(false)
        expect(filterRecipe).toBeCalled()
        expect(filterRecipe).toBeCalledWith({ingredient: '', amount: 0}, 'save-recipe') 
    })
    test('should not save recipe', () => {
        const buttonEl = screen.getByRole('cancel')

        jest.useFakeTimers()
        fireEvent.click(buttonEl)

        act(() => {
            jest.runOnlyPendingTimers()
            jest.useRealTimers()
        })

        expect(setShowModalRecipe).toBeCalled()
        expect(setShowModalRecipe).toBeCalledWith(false)
        expect(setShowModalNewRecipeConfirmation).toBeCalled()
        expect(setShowModalNewRecipeConfirmation).toBeCalledWith(false)
        expect(filterRecipe).toBeCalled()
        expect(filterRecipe).toBeCalledWith({ingredient: '', amount: 0}, 'not-save-recipe')
    })
})
