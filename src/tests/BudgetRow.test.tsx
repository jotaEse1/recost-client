import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import BudgetRow from '../components/BudgetRow';

describe('BudgetRow component', () => {
    let row = { ingredient: 'Azucar', amount: 100, cost: 100 },
        setBudgetRow = jest.fn(),
        setShowModalAddBudgetRow = jest.fn(),
        setShowModalDeleteBudgetRow = jest.fn();

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Router>
                <table>
                    <tbody>
                        <BudgetRow
                            row={row}
                            setBudgetRow={setBudgetRow}
                            setShowModalAddBudgetRow={setShowModalAddBudgetRow}
                            setShowModalDeleteBudgetRow={setShowModalDeleteBudgetRow}
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
            amount = screen.getByText(`${row.amount}gr`),
            cost = screen.getByText(`${row.cost}gr`);

        expect(ingredient).toBeInTheDocument()
        expect(amount).toBeInTheDocument()
        expect(cost).toBeInTheDocument()
    })
    test('should edit button works', () => {
        const buttonEl = screen.getByRole('edit')

        fireEvent.click(buttonEl)

        expect(setBudgetRow).toBeCalled()
        expect(setBudgetRow).toBeCalledWith(row)
        expect(setShowModalAddBudgetRow).toBeCalled()
        expect(setShowModalAddBudgetRow).toBeCalledWith(true)
    });
    test('should delete button works', () => {
        const buttonEl = screen.getByRole('delete')

        fireEvent.click(buttonEl)

        expect(setBudgetRow).toBeCalled()
        expect(setBudgetRow).toBeCalledWith(row)
        expect(setShowModalDeleteBudgetRow).toBeCalled()
        expect(setShowModalDeleteBudgetRow).toBeCalledWith(true)
    });
})