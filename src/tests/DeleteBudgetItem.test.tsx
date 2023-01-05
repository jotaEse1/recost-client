import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import DeleteBudgetItem from '../components/DeleteBudgetItem';

describe('DeleteBudgetItem component', () => {
    describe('When the user chose the manual option', () => {
        let setShowModalDeleteBudgetRow = jest.fn(),
            setBudgetRow = jest.fn(),
            budgetRow = {ingredient: 'Azucar', amount: 1000, cost: 1000},
            filterBudget = jest.fn(),
            manual = true;
    
        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Router>
                    <DeleteBudgetItem
                        setShowModalDeleteBudgetRow={setShowModalDeleteBudgetRow}
                        setBudgetRow={setBudgetRow}
                        budgetRow={budgetRow}
                        filterBudget={filterBudget}
                        manual={manual}
                    />
                </Router>
            );
        })
    
        test('component should render', () => {
            const title = screen.getByText('¿Quieres eliminarlo?')
            expect(title).toBeInTheDocument()
        })
        test('should delete the item', () => {
            const buttonEl = screen.getByRole('delete')
    
            fireEvent.click(buttonEl)
    
            expect(setShowModalDeleteBudgetRow).toBeCalled()
            expect(setShowModalDeleteBudgetRow).toBeCalledWith(false)
            expect(setBudgetRow).toBeCalled()
            expect(setBudgetRow).toBeCalledWith({ingredient: '', amount: 0, cost: 0})
            expect(filterBudget).toBeCalled()
            expect(filterBudget).toBeCalledWith(budgetRow, 'remove', 'manual')
        })
        test('should not delete the item', () => {
            const buttonEl = screen.getByRole('cancel')
    
            fireEvent.click(buttonEl)
    
            expect(setShowModalDeleteBudgetRow).toBeCalled()
            expect(setShowModalDeleteBudgetRow).toBeCalledWith(false)
            expect(setBudgetRow).toBeCalled()
            expect(setBudgetRow).toBeCalledWith({ingredient: '', amount: 0, cost: 0})
        })
    })
    describe('When the user chose the fast option', () => {
        let setShowModalDeleteBudgetRow = jest.fn(),
            setBudgetRow = jest.fn(),
            budgetRow = {ingredient: 'Azucar', amount: 1000, cost: 1000},
            filterBudget = jest.fn(),
            manual = false;
    
        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Router>
                    <DeleteBudgetItem
                        setShowModalDeleteBudgetRow={setShowModalDeleteBudgetRow}
                        setBudgetRow={setBudgetRow}
                        budgetRow={budgetRow}
                        filterBudget={filterBudget}
                        manual={manual}
                    />
                </Router>
            );
        })
    
        test('component should render', () => {
            const title = screen.getByText('¿Quieres eliminarlo?')
            expect(title).toBeInTheDocument()
        })
        test('should delete the item', () => {
            const buttonEl = screen.getByRole('delete')
    
            fireEvent.click(buttonEl)
    
            expect(setShowModalDeleteBudgetRow).toBeCalled()
            expect(setShowModalDeleteBudgetRow).toBeCalledWith(false)
            expect(setBudgetRow).toBeCalled()
            expect(setBudgetRow).toBeCalledWith({ingredient: '', amount: 0, cost: 0})
            expect(filterBudget).toBeCalled()
            expect(filterBudget).toBeCalledWith(budgetRow, 'remove', 'fast')
        })
        test('should not delete the item', () => {
            const buttonEl = screen.getByRole('cancel')
    
            fireEvent.click(buttonEl)
    
            expect(setShowModalDeleteBudgetRow).toBeCalled()
            expect(setShowModalDeleteBudgetRow).toBeCalledWith(false)
            expect(setBudgetRow).toBeCalled()
            expect(setBudgetRow).toBeCalledWith({ingredient: '', amount: 0, cost: 0})
        })
    })
  
})

