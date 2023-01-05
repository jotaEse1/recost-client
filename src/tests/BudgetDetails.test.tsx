import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import BudgetDetails from '../components/BudgetDetails';

describe('BudgetDetails component', () => {
    describe('When budget has ingredients', () => {
        let setShowBudgetDetails = jest.fn(),
            budget = {
                title: 'Chocotorta',
                idUser: '1',
                description: 'Choco especial',
                ingredients: [
                    { ingredient: 'Azucar', amount: 100, cost: 100 },
                    { ingredient: 'Chocolate', amount: 1000, cost: 100 }
                ]
            },
            setBudgetRow = jest.fn(),
            setIngredientsArr = jest.fn(),
            setShowModalBudgetItems = jest.fn(),
            setShowModalBudget = jest.fn(),
            setUpdateBudget = jest.fn(),
            setShowDeleteBudget = jest.fn();

        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Router>
                    <BudgetDetails
                        setShowBudgetDetails={setShowBudgetDetails}
                        budget={budget}
                        setBudgetRow={setBudgetRow}
                        setIngredientsArr={setIngredientsArr}
                        setShowModalBudgetItems={setShowModalBudgetItems}
                        setShowModalBudget={setShowModalBudget}
                        setUpdateBudget={setUpdateBudget}
                        setShowDeleteBudget={setShowDeleteBudget}
                    />
                </Router>
            );
        })

        test('component should render', () => {
            const title = screen.getByText('Ingredientes del presupuesto')
            expect(title).toBeInTheDocument()
        })
        test('should text content render', () => {
            const title = screen.getByText(`${budget.title}`),
                description = screen.getByText(`${budget.description}`);

            expect(title).toBeInTheDocument()
            expect(description).toBeInTheDocument()
        })
        test('should render ingredient list and cost calculations', () => {
            const firstEl = screen.getByText(budget.ingredients[0].ingredient),
                secondEl = screen.getByText(budget.ingredients[1].ingredient),
                costCalc = screen.getByText('% utilidad');

            expect(firstEl).toBeInTheDocument()
            expect(secondEl).toBeInTheDocument()
            expect(costCalc).toBeInTheDocument()
        })
        test('should show confirmation to delete budget', () => {
            const buttonEl = screen.getByText('Eliminar')

            fireEvent.click(buttonEl)

            expect(setShowDeleteBudget).toBeCalled()
            expect(setShowDeleteBudget).toBeCalledWith(true)
        })
        test('should show confirmation to modify budget', () => {
            const buttonEl = screen.getByText('Modificar')

            jest.useFakeTimers()
            fireEvent.click(buttonEl)

            act(() => {
                jest.runOnlyPendingTimers()
                jest.useRealTimers()
            })

            expect(setUpdateBudget).toBeCalled()
            expect(setUpdateBudget).toBeCalledWith(true)
            expect(setShowModalBudgetItems).toBeCalled()
            expect(setShowModalBudgetItems).toBeCalledWith(true)
            expect(setShowBudgetDetails).toBeCalled()
            expect(setShowBudgetDetails).toBeCalledWith(false)
            expect(setIngredientsArr).toBeCalled()
            expect(setIngredientsArr).toBeCalledWith(budget.ingredients)
        })
    })
    describe('When budget has no ingredients', () => {
        let setShowBudgetDetails = jest.fn(),
            budget = {
                title: 'Chocotorta',
                idUser: '1',
                description: 'Choco especial',
                ingredients: []
            },
            setBudgetRow = jest.fn(),
            setIngredientsArr = jest.fn(),
            setShowModalBudgetItems = jest.fn(),
            setShowModalBudget = jest.fn(),
            setUpdateBudget = jest.fn(),
            setShowDeleteBudget = jest.fn();

        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Router>
                    <BudgetDetails
                        setShowBudgetDetails={setShowBudgetDetails}
                        budget={budget}
                        setBudgetRow={setBudgetRow}
                        setIngredientsArr={setIngredientsArr}
                        setShowModalBudgetItems={setShowModalBudgetItems}
                        setShowModalBudget={setShowModalBudget}
                        setUpdateBudget={setUpdateBudget}
                        setShowDeleteBudget={setShowDeleteBudget}
                    />
                </Router>
            );
        })

        test('component should render', () => {
            const title = screen.getByText('Ingredientes del presupuesto')
            expect(title).toBeInTheDocument()
        })
        test('should render No hay ingredientes and No hay Costo', () => {
            const firstEl = screen.getByText('Sin Costo'),
                secondEl = screen.getByText('No hay ingredientes');

            expect(firstEl).toBeInTheDocument()
            expect(secondEl).toBeInTheDocument()
        })


    })
    describe('When budget ingredients is null', () => {
        let setShowBudgetDetails = jest.fn(),
            budget = {
                title: 'Chocotorta',
                idUser: '1',
                description: 'Choco especial',
                ingredients: null
            },
            setBudgetRow = jest.fn(),
            setIngredientsArr = jest.fn(),
            setShowModalBudgetItems = jest.fn(),
            setShowModalBudget = jest.fn(),
            setUpdateBudget = jest.fn(),
            setShowDeleteBudget = jest.fn();

        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Router>
                    <BudgetDetails
                        setShowBudgetDetails={setShowBudgetDetails}
                        budget={budget}
                        setBudgetRow={setBudgetRow}
                        setIngredientsArr={setIngredientsArr}
                        setShowModalBudgetItems={setShowModalBudgetItems}
                        setShowModalBudget={setShowModalBudget}
                        setUpdateBudget={setUpdateBudget}
                        setShowDeleteBudget={setShowDeleteBudget}
                    />
                </Router>
            );
        })

        test('component should render', () => {
            const title = screen.getByText('Ingredientes del presupuesto')
            expect(title).toBeInTheDocument()
        })
        test('should render No hay ingredientes and No hay Costo', () => {
            const firstEl = screen.getByText('Sin Costo'),
                secondEl = screen.getByText('No hay ingredientes');

            expect(firstEl).toBeInTheDocument()
            expect(secondEl).toBeInTheDocument()
        })
    })
});
