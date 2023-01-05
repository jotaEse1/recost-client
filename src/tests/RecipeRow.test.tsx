import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RecipeRow from '../components/RecipeRow';

describe('RecipeRow component', () => {
    let row = { ingredient: 'Azucar', amount: 100 },
        setRecipeRow = jest.fn(),
        setShowModalAddRecipeRow = jest.fn(),
        setShowModalDeleteRecipeRow = jest.fn();

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Router>
                <table>
                    <tbody>
                        <RecipeRow
                            row={row}
                            setRecipeRow={setRecipeRow}
                            setShowModalAddRecipeRow={setShowModalAddRecipeRow}
                            setShowModalDeleteRecipeRow={setShowModalDeleteRecipeRow}
                        />
                    </tbody>
                </table>
            </Router>
        );
    })

    test('component should render', () => {
        const title = screen.getByText(`${row.ingredient}`)
        expect(title).toBeInTheDocument()
    });
    test('should text render', () => {
        const ingredient = screen.getByText(`${row.ingredient}`),
            amount = screen.getByText(`${row.amount}gr`);

        expect(ingredient).toBeInTheDocument()
        expect(amount).toBeInTheDocument()
    })
    test('should edit button works', () => {
        const buttonEl = screen.getByRole('edit')

        fireEvent.click(buttonEl)

        expect(setRecipeRow).toBeCalled()
        expect(setRecipeRow).toBeCalledWith({ ingredient: 'Azucar', amount: 100 })
        expect(setShowModalAddRecipeRow).toBeCalled()
    });
    test('should delete button works', () => {
        const buttonEl = screen.getByRole('delete')

        fireEvent.click(buttonEl)

        expect(setRecipeRow).toBeCalled()
        expect(setRecipeRow).toBeCalledWith({ ingredient: 'Azucar', amount: 100 })
        expect(setShowModalDeleteRecipeRow).toBeCalled()
    });
})