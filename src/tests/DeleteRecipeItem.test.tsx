import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import DeleteRecipeItem from '../components/DeleteRecipeItem';

describe('DeleteRecipeItem component', () => {
    let setShowModalDeleteRecipeRow = jest.fn(),
        setRecipeRow = jest.fn(),
        recipeRow = {ingredient: 'Azucar', amount: 100},
        filterRecipe = jest.fn();

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Router>
                <DeleteRecipeItem
                    setShowModalDeleteRecipeRow={setShowModalDeleteRecipeRow}
                    setRecipeRow={setRecipeRow}
                    recipeRow={recipeRow}
                    filterRecipe={filterRecipe}
                />
            </Router>
        );
    })

    test('component should render', () => {
        const title = screen.getByText('¿Quieres eliminarlo?')
        expect(title).toBeInTheDocument()
    })
    test('should delete recipe item', () => {
        const buttonEl = screen.getByRole('delete')

        fireEvent.click(buttonEl)

        expect(setRecipeRow).toBeCalled()
        expect(setRecipeRow).toBeCalledWith({ingredient: '', amount: 0})
        expect(setShowModalDeleteRecipeRow).toBeCalled()
        expect(setShowModalDeleteRecipeRow).toBeCalledWith(false)
        expect(filterRecipe).toBeCalled()
        expect(filterRecipe).toBeCalledWith(recipeRow, 'remove')
    })
    test('should not delete the recipe item', () => {
        const buttonEl = screen.getByRole('cancel')

        fireEvent.click(buttonEl)

        expect(setShowModalDeleteRecipeRow).toBeCalled()
        expect(setShowModalDeleteRecipeRow).toBeCalledWith(false)
        expect(setRecipeRow).toBeCalled()
        expect(setRecipeRow).toBeCalledWith({ingredient: '', amount: 0})
    })
})
