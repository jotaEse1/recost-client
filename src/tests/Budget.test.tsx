import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Budget from '../components/Budget';

describe('Budget component', () => {
    let data = { title: 'Chocotorta', idUser: '1', description: 'Choco especial', total: '1000' },
        setShowBudgetDetails = jest.fn(),
        setBudget = jest.fn(),
        setShowModalBudget = jest.fn();

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Router>
                <Budget
                    data={data}
                    setShowBudgetDetails={setShowBudgetDetails}
                    setBudget={setBudget}
                    setShowModalBudget={setShowModalBudget}
                />
            </Router>
        );
    })

    test('component should render and text too', () => {
        const title = screen.getByText(data.title),
            description = screen.getByText(data.description);

        expect(title).toBeInTheDocument()
        expect(description).toBeInTheDocument()
    })
    test('should show the budget', () => {
        const buttonEl = screen.getByRole('open')

        fireEvent.click(buttonEl)

        expect(setBudget).toBeCalled()
        expect(setBudget).toBeCalledWith(data)
        expect(setShowModalBudget).toBeCalled()
        expect(setShowModalBudget).toBeCalledWith(true)
        expect(setShowBudgetDetails).toBeCalled()
        expect(setShowBudgetDetails).toBeCalledWith(true)
    })
})
