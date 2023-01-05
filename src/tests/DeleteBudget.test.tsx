import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import DeleteBudget from '../components/DeleteBudget';

describe('DeleteBudget component', () => {
    let setShowDeleteBudget = jest.fn(),
        setShowModalBudget = jest.fn(),
        setShowBudgetDetails = jest.fn(),
        handleBudget = jest.fn(),
        budget = { title: 'Chocotorta', idUser: '1', description: 'Choco especial' };

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Router>
                <DeleteBudget
                    setShowDeleteBudget={setShowDeleteBudget}
                    setShowModalBudget={setShowModalBudget}
                    setShowBudgetDetails={setShowBudgetDetails}
                    handleBudget={handleBudget}
                    budget={budget}
                />
            </Router>
        );
    })

    test('component should render', () => {
        const title = screen.getByText('¿Quieres eliminar el presupuesto?')
        expect(title).toBeInTheDocument()
    })
    test('should delete the budget', () => {
        const buttonEl = screen.getByRole('delete')

        jest.useFakeTimers()
        fireEvent.click(buttonEl)

        act(() => {
            jest.runOnlyPendingTimers()
            jest.useRealTimers()
        })

        expect(setShowModalBudget).toBeCalled()
        expect(setShowModalBudget).toBeCalledWith(false)
        expect(setShowBudgetDetails).toBeCalled()
        expect(setShowBudgetDetails).toBeCalledWith(false)
        expect(setShowDeleteBudget).toBeCalled()
        expect(setShowDeleteBudget).toBeCalledWith(false)
        expect(handleBudget).toBeCalled()
        expect(handleBudget).toBeCalledWith('delete', budget)
    })
    test('should not delete the budget', () => {
        const buttonEl = screen.getByRole('cancel')

        fireEvent.click(buttonEl)

        expect(setShowDeleteBudget).toBeCalled()
        expect(setShowDeleteBudget).toBeCalledWith(false)
    })
})
