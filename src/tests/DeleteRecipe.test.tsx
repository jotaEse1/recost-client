import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import DeleteRecipe from '../components/DeleteRecipe';

describe('DeleteRecipe component', () => {
    let setShowDeleteRecipe = jest.fn(),
    setShowModalRecipe = jest.fn(),
    setShowRecipeDetails = jest.fn(),
    handleRecipe = jest.fn(),
    recipe = {title: 'Chocotorta', description: 'Chocotorta especial', idUser: '1'};

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Router>
                <DeleteRecipe
                    setShowDeleteRecipe={setShowDeleteRecipe}
                    setShowModalRecipe={setShowModalRecipe}
                    setShowRecipeDetails={setShowRecipeDetails}
                    handleRecipe={handleRecipe}
                    recipe={recipe}
                />
            </Router>
        );
    })

    test('component should render', () => {
        const title = screen.getByText('¿Quieres eliminar la receta?')
        expect(title).toBeInTheDocument()
    })
    test('should delete the recipe', () => {
        const buttonEl = screen.getByRole('delete')

        jest.useFakeTimers()
        fireEvent.click(buttonEl)

        act(() => {
            jest.runOnlyPendingTimers()
            jest.useRealTimers()
        })

        expect(setShowModalRecipe).toBeCalled()
        expect(setShowModalRecipe).toBeCalledWith(false)
        expect(setShowRecipeDetails).toBeCalled()
        expect(setShowRecipeDetails).toBeCalledWith(false)
        expect(setShowDeleteRecipe).toBeCalled()
        expect(setShowDeleteRecipe).toBeCalledWith(false)
        expect(handleRecipe).toBeCalled()
        expect(handleRecipe).toBeCalledWith('delete', recipe) 
    })
    test('should not delete the recipe', () => {
        const buttonEl = screen.getByRole('cancel')

        fireEvent.click(buttonEl)

        expect(setShowDeleteRecipe).toBeCalled()
        expect(setShowDeleteRecipe).toBeCalledWith(false)
    })
})
