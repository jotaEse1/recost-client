import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import BudgetDetailsRow from '../components/BudgetDetailsRow';

describe('BudgetDetailsRow component', () => {
    let row = { ingredient: 'Chocolate', amount: 1000, cost: 1000 }

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Router>
                <table>
                    <tbody>
                        <BudgetDetailsRow
                            row={row}
                        />
                    </tbody>
                </table>
            </Router>
        );
    })

    test('component should render and text too', () => {
        const ingredient = screen.getByText(`${row.ingredient}`),
            amount = screen.getByText(`${row.amount}gr`),
            cost = screen.getByText(`$ ${row.cost}`);

        expect(ingredient).toBeInTheDocument()
        expect(amount).toBeInTheDocument()
        expect(cost).toBeInTheDocument()
    })
})