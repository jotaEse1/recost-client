import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import BudgetConfirmation from '../components/BudgetConfirmation';

describe('BudgetConfirmation component', () => {
    describe('When user chose the manual option', () => {
        let setShowModalNewBudgetConfirmation = jest.fn(),
            setShowModalBudget = jest.fn(),
            filterBudget = jest.fn(),
            manual = true;

        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Router>
                    <BudgetConfirmation
                        setShowModalNewBudgetConfirmation={setShowModalNewBudgetConfirmation}
                        setShowModalBudget={setShowModalBudget}
                        filterBudget={filterBudget}
                        manual={manual}
                    />
                </Router>
            );
        })

        test('component should render', () => {
            const title = screen.getByText('¿Quieres guardar este presupuesto?')
            expect(title).toBeInTheDocument()
        })
        test('should complete stage 3 and create a new budget', () => {
            const buttonEl = screen.getByRole('save')

            jest.useFakeTimers()
            fireEvent.click(buttonEl)

            act(() => {
                jest.runOnlyPendingTimers()
                jest.useRealTimers()
            })

            expect(setShowModalBudget).toBeCalled()
            expect(setShowModalBudget).toBeCalledWith(false)
            expect(setShowModalNewBudgetConfirmation).toBeCalled()
            expect(setShowModalNewBudgetConfirmation).toBeCalledWith(false)
            expect(filterBudget).toBeCalled()
            expect(filterBudget).toBeCalledWith({ ingredient: '', amount: 0, cost: 0 }, 'save-budget', 'manual')
        })
        test('should cancel stage 3 and not create a new budget', () => {
            const buttonEl = screen.getByRole('cancel')

            jest.useFakeTimers()
            fireEvent.click(buttonEl)

            act(() => {
                jest.runOnlyPendingTimers()
                jest.useRealTimers()
            })

            expect(setShowModalBudget).toBeCalled()
            expect(setShowModalBudget).toBeCalledWith(false)
            expect(setShowModalNewBudgetConfirmation).toBeCalled()
            expect(setShowModalNewBudgetConfirmation).toBeCalledWith(false)
            expect(filterBudget).toBeCalled()
            expect(filterBudget).toBeCalledWith({ ingredient: '', amount: 0, cost: 0 }, 'not-save-budget', 'manual')
        })
    })
    describe('When user chose the fast option', () => {
        let setShowModalNewBudgetConfirmation = jest.fn(),
            setShowModalBudget = jest.fn(),
            filterBudget = jest.fn(),
            manual = false;

        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Router>
                    <BudgetConfirmation
                        setShowModalNewBudgetConfirmation={setShowModalNewBudgetConfirmation}
                        setShowModalBudget={setShowModalBudget}
                        filterBudget={filterBudget}
                        manual={manual}
                    />
                </Router>
            );
        })

        test('component should render', () => {
            const title = screen.getByText('¿Quieres guardar este presupuesto?')
            expect(title).toBeInTheDocument()
        })
        test('should complete stage 3 and create a new budget', () => {
            const buttonEl = screen.getByRole('save')

            jest.useFakeTimers()
            fireEvent.click(buttonEl)

            act(() => {
                jest.runOnlyPendingTimers()
                jest.useRealTimers()
            })

            expect(setShowModalBudget).toBeCalled()
            expect(setShowModalBudget).toBeCalledWith(false)
            expect(setShowModalNewBudgetConfirmation).toBeCalled()
            expect(setShowModalNewBudgetConfirmation).toBeCalledWith(false)
            expect(filterBudget).toBeCalled()
            expect(filterBudget).toBeCalledWith({ ingredient: '', amount: 0, cost: 0 }, 'save-budget', 'fast')
        })
        test('should cancel stage 3 and not create a new budget', () => {
            const buttonEl = screen.getByRole('cancel')

            jest.useFakeTimers()
            fireEvent.click(buttonEl)

            act(() => {
                jest.runOnlyPendingTimers()
                jest.useRealTimers()
            })

            expect(setShowModalBudget).toBeCalled()
            expect(setShowModalBudget).toBeCalledWith(false)
            expect(setShowModalNewBudgetConfirmation).toBeCalled()
            expect(setShowModalNewBudgetConfirmation).toBeCalledWith(false)
            expect(filterBudget).toBeCalled()
            expect(filterBudget).toBeCalledWith({ ingredient: '', amount: 0, cost: 0 }, 'not-save-budget', 'fast')
        })
    })


})
