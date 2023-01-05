import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import BudgetItems from '../components/BudgetItems';

describe('BudgetItems component', () => {
    describe('When the user chose the fast option', () => {
        describe('recipeChoosens ingredients has ingredients and creating a new budget', () => {
            let setShowModalBudgetItems = jest.fn(),
                setShowModalNewBudgetConfirmation = jest.fn(),
                setShowModalBudget = jest.fn(),
                handleBudget = jest.fn(),
                ingredientsArr = [
                    { ingredient: 'Azucar', amount: 100, cost: 100 },
                    { ingredient: 'Chocolate', amount: 100, cost: 100 },
                    { ingredient: 'Huevos', amount: 100, cost: 100 }
                ],
                budget = { title: 'Chocotorta', idUser: '1', description: 'Choco especial' },
                setShowModalAddBudgetRow = jest.fn(),
                setBudgetRow = jest.fn(),
                setShowModalDeleteBudgetRow = jest.fn(),
                setIngredientsArr = jest.fn(),
                updateBudget = false,
                setUpdateBudget = jest.fn(),
                manual = false,
                recipeChoosen = {
                    title: 'Chocotorta',
                    idUser: '1',
                    description: 'Choco especial',
                    ingredients: [
                        { ingredient: 'Almibar', amount: 100, cost: 100 },
                        { ingredient: 'Choco', amount: 100, cost: 100 },
                        { ingredient: 'Yemas', amount: 100, cost: 100 }
                    ]
                };

            beforeEach(() => {
                // eslint-disable-next-line testing-library/no-render-in-setup
                render(
                    <Router>
                        <BudgetItems
                            setShowModalBudgetItems={setShowModalBudgetItems}
                            setShowModalNewBudgetConfirmation={setShowModalNewBudgetConfirmation}
                            setShowModalBudget={setShowModalBudget}
                            handleBudget={handleBudget}
                            ingredientsArr={ingredientsArr}
                            budget={budget}
                            setShowModalAddBudgetRow={setShowModalAddBudgetRow}
                            setBudgetRow={setBudgetRow}
                            setShowModalDeleteBudgetRow={setShowModalDeleteBudgetRow}
                            setIngredientsArr={setIngredientsArr}
                            updateBudget={updateBudget}
                            setUpdateBudget={setUpdateBudget}
                            manual={manual}
                            recipeChoosen={recipeChoosen}
                        />
                    </Router>
                );
            })

            test('component should render', () => {
                const title = screen.getByText('Ingredientes del presupuesto')
                expect(title).toBeInTheDocument()
            })
            test('should list all ingredients', () => {
                const item1 = screen.getByText(`${recipeChoosen.ingredients[0].ingredient}`),
                    item2 = screen.getByText(`${recipeChoosen.ingredients[1].ingredient}`),
                    item3 = screen.getByText(`${recipeChoosen.ingredients[2].ingredient}`),
                    cost = screen.getByRole('cost')

                expect(item1).toBeInTheDocument()
                expect(item2).toBeInTheDocument()
                expect(item3).toBeInTheDocument()
                expect(cost).toBeInTheDocument()
            })
            test('should buttons work', () => {
                const addIngr = screen.getByText('Agregar Ingrediente'),
                    cancelBt = screen.getByText('Cancelar'),
                    continueBt = screen.getByText('Continuar');

                fireEvent.click(addIngr)

                expect(setShowModalAddBudgetRow).toBeCalled()
                expect(setShowModalAddBudgetRow).toBeCalledWith(true)

                jest.useFakeTimers()
                fireEvent.click(cancelBt)
                act(() => {
                    jest.runOnlyPendingTimers()
                    jest.useRealTimers()
                })

                expect(setShowModalBudget).toBeCalled()
                expect(setShowModalBudget).toBeCalledWith(false)
                expect(setIngredientsArr).toBeCalled()
                expect(setIngredientsArr).toBeCalledWith(null)
                expect(setShowModalBudgetItems).toBeCalled()
                expect(setShowModalBudgetItems).toBeCalledWith(false)
                expect(handleBudget).toBeCalled()
                expect(handleBudget).toBeCalledWith('delete', budget)

                jest.useFakeTimers()
                fireEvent.click(continueBt)
                act(() => {
                    jest.runOnlyPendingTimers()
                    jest.useRealTimers()
                })

                expect(setShowModalBudgetItems).toBeCalled()
                expect(setShowModalBudgetItems).toBeCalledWith(false)
                expect(setShowModalNewBudgetConfirmation).toBeCalled()
                expect(setShowModalNewBudgetConfirmation).toBeCalledWith(true)

            })

        })
        describe('recipeChoosens ingredients has ingredients and updating a budget', () => {
            let setShowModalBudgetItems = jest.fn(),
                setShowModalNewBudgetConfirmation = jest.fn(),
                setShowModalBudget = jest.fn(),
                handleBudget = jest.fn(),
                ingredientsArr = [
                    { ingredient: 'Azucar', amount: 100, cost: 100 },
                    { ingredient: 'Chocolate', amount: 100, cost: 100 },
                    { ingredient: 'Huevos', amount: 100, cost: 100 }
                ],
                budget = { title: 'Chocotorta', idUser: '1', description: 'Choco especial' },
                setShowModalAddBudgetRow = jest.fn(),
                setBudgetRow = jest.fn(),
                setShowModalDeleteBudgetRow = jest.fn(),
                setIngredientsArr = jest.fn(),
                updateBudget = true,
                setUpdateBudget = jest.fn(),
                manual = false,
                recipeChoosen = {
                    title: 'Chocotorta',
                    idUser: '1',
                    description: 'Choco especial',
                    ingredients: [
                        { ingredient: 'Almibar', amount: 100, cost: 100 },
                        { ingredient: 'Choco', amount: 100, cost: 100 },
                        { ingredient: 'Yemas', amount: 100, cost: 100 }
                    ]
                };

            beforeEach(() => {
                // eslint-disable-next-line testing-library/no-render-in-setup
                render(
                    <Router>
                        <BudgetItems
                            setShowModalBudgetItems={setShowModalBudgetItems}
                            setShowModalNewBudgetConfirmation={setShowModalNewBudgetConfirmation}
                            setShowModalBudget={setShowModalBudget}
                            handleBudget={handleBudget}
                            ingredientsArr={ingredientsArr}
                            budget={budget}
                            setShowModalAddBudgetRow={setShowModalAddBudgetRow}
                            setBudgetRow={setBudgetRow}
                            setShowModalDeleteBudgetRow={setShowModalDeleteBudgetRow}
                            setIngredientsArr={setIngredientsArr}
                            updateBudget={updateBudget}
                            setUpdateBudget={setUpdateBudget}
                            manual={manual}
                            recipeChoosen={recipeChoosen}
                        />
                    </Router>
                );
            })

            test('component should render', () => {
                const title = screen.getByText('Ingredientes del presupuesto')
                expect(title).toBeInTheDocument()
            })
            test('should buttons work', () => {
                const cancelBt = screen.getByText('Cancelar');

                jest.useFakeTimers()
                fireEvent.click(cancelBt)
                act(() => {
                    jest.runOnlyPendingTimers()
                    jest.useRealTimers()
                })

                expect(setShowModalBudget).toBeCalled()
                expect(setShowModalBudget).toBeCalledWith(false)
                expect(setIngredientsArr).toBeCalled()
                expect(setIngredientsArr).toBeCalledWith(null)
                expect(setShowModalBudgetItems).toBeCalled()
                expect(setShowModalBudgetItems).toBeCalledWith(false)
                expect(setUpdateBudget).toBeCalled()
                expect(setUpdateBudget).toBeCalledWith(false)
            })

        })
    })
    describe('When the user chose the manual option', () => {
        describe('ingredientsArr has ingredients', () => {
            let setShowModalBudgetItems = jest.fn(),
                setShowModalNewBudgetConfirmation = jest.fn(),
                setShowModalBudget = jest.fn(),
                handleBudget = jest.fn(),
                ingredientsArr = [
                    { ingredient: 'Azucar', amount: 100, cost: 100 },
                    { ingredient: 'Chocolate', amount: 100, cost: 100 },
                    { ingredient: 'Huevos', amount: 100, cost: 100 }
                ],
                budget = { title: 'Chocotorta', idUser: '1', description: 'Choco especial' },
                setShowModalAddBudgetRow = jest.fn(),
                setBudgetRow = jest.fn(),
                setShowModalDeleteBudgetRow = jest.fn(),
                setIngredientsArr = jest.fn(),
                updateBudget = false,
                setUpdateBudget = jest.fn(),
                manual = true,
                recipeChoosen: null = null;

            beforeEach(() => {
                // eslint-disable-next-line testing-library/no-render-in-setup
                render(
                    <Router>
                        <BudgetItems
                            setShowModalBudgetItems={setShowModalBudgetItems}
                            setShowModalNewBudgetConfirmation={setShowModalNewBudgetConfirmation}
                            setShowModalBudget={setShowModalBudget}
                            handleBudget={handleBudget}
                            ingredientsArr={ingredientsArr}
                            budget={budget}
                            setShowModalAddBudgetRow={setShowModalAddBudgetRow}
                            setBudgetRow={setBudgetRow}
                            setShowModalDeleteBudgetRow={setShowModalDeleteBudgetRow}
                            setIngredientsArr={setIngredientsArr}
                            updateBudget={updateBudget}
                            setUpdateBudget={setUpdateBudget}
                            manual={manual}
                            recipeChoosen={recipeChoosen}
                        />
                    </Router>
                );
            })
            test('component should render', () => {
                const title = screen.getByText('Ingredientes del presupuesto')
                expect(title).toBeInTheDocument()
            })
            test('should list all ingredients', () => {
                const item1 = screen.getByText(`${ingredientsArr[0].ingredient}`),
                    item2 = screen.getByText(`${ingredientsArr[1].ingredient}`),
                    item3 = screen.getByText(`${ingredientsArr[2].ingredient}`),
                    cost = screen.getByRole('cost')

                expect(item1).toBeInTheDocument()
                expect(item2).toBeInTheDocument()
                expect(item3).toBeInTheDocument()
                expect(cost).toBeInTheDocument()
            })

        })
        describe('ingredientsArr has no ingredients', () => {
            let setShowModalBudgetItems = jest.fn(),
                setShowModalNewBudgetConfirmation = jest.fn(),
                setShowModalBudget = jest.fn(),
                handleBudget = jest.fn(),
                ingredientsArr: any[] = [],
                budget = { title: 'Chocotorta', idUser: '1', description: 'Choco especial' },
                setShowModalAddBudgetRow = jest.fn(),
                setBudgetRow = jest.fn(),
                setShowModalDeleteBudgetRow = jest.fn(),
                setIngredientsArr = jest.fn(),
                updateBudget = false,
                setUpdateBudget = jest.fn(),
                manual = true,
                recipeChoosen: null = null;

            beforeEach(() => {
                // eslint-disable-next-line testing-library/no-render-in-setup
                render(
                    <Router>
                        <BudgetItems
                            setShowModalBudgetItems={setShowModalBudgetItems}
                            setShowModalNewBudgetConfirmation={setShowModalNewBudgetConfirmation}
                            setShowModalBudget={setShowModalBudget}
                            handleBudget={handleBudget}
                            ingredientsArr={ingredientsArr}
                            budget={budget}
                            setShowModalAddBudgetRow={setShowModalAddBudgetRow}
                            setBudgetRow={setBudgetRow}
                            setShowModalDeleteBudgetRow={setShowModalDeleteBudgetRow}
                            setIngredientsArr={setIngredientsArr}
                            updateBudget={updateBudget}
                            setUpdateBudget={setUpdateBudget}
                            manual={manual}
                            recipeChoosen={recipeChoosen}
                        />
                    </Router>
                );
            })
            test('component should render', () => {
                const title = screen.getByText('Ingredientes del presupuesto')
                expect(title).toBeInTheDocument()
            })
            test('should render No hay ingredientes and Sin Costo', () => {
                const item1 = screen.getByText('No hay ingredientes'),
                    item2 = screen.getByText('Sin Costo');

                expect(item1).toBeInTheDocument()
                expect(item2).toBeInTheDocument()
            })
        })
        describe('ingredientsArr is null', () => {
            let setShowModalBudgetItems = jest.fn(),
                setShowModalNewBudgetConfirmation = jest.fn(),
                setShowModalBudget = jest.fn(),
                handleBudget = jest.fn(),
                ingredientsArr: null = null,
                budget = { title: 'Chocotorta', idUser: '1', description: 'Choco especial' },
                setShowModalAddBudgetRow = jest.fn(),
                setBudgetRow = jest.fn(),
                setShowModalDeleteBudgetRow = jest.fn(),
                setIngredientsArr = jest.fn(),
                updateBudget = false,
                setUpdateBudget = jest.fn(),
                manual = true,
                recipeChoosen: null = null;

            beforeEach(() => {
                // eslint-disable-next-line testing-library/no-render-in-setup
                render(
                    <Router>
                        <BudgetItems
                            setShowModalBudgetItems={setShowModalBudgetItems}
                            setShowModalNewBudgetConfirmation={setShowModalNewBudgetConfirmation}
                            setShowModalBudget={setShowModalBudget}
                            handleBudget={handleBudget}
                            ingredientsArr={ingredientsArr}
                            budget={budget}
                            setShowModalAddBudgetRow={setShowModalAddBudgetRow}
                            setBudgetRow={setBudgetRow}
                            setShowModalDeleteBudgetRow={setShowModalDeleteBudgetRow}
                            setIngredientsArr={setIngredientsArr}
                            updateBudget={updateBudget}
                            setUpdateBudget={setUpdateBudget}
                            manual={manual}
                            recipeChoosen={recipeChoosen}
                        />
                    </Router>
                );
            })
            test('component should render', () => {
                const title = screen.getByText('Ingredientes del presupuesto')
                expect(title).toBeInTheDocument()
            })
            test('should render No hay ingredientes and Sin Costo', () => {
                const item1 = screen.getByText('No hay ingredientes'),
                    item2 = screen.getByText('Sin Costo');

                expect(item1).toBeInTheDocument()
                expect(item2).toBeInTheDocument()
            })
        })
    })

})