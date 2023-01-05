import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AddBudgetingredient from '../components/AddBudgetingredient';

describe('AddBudgetIngredient component', () => {
    describe('When user chose the manual option', () => {
        describe('Add a new ingredient', () => {
            let budgetRow = { ingredient: '', amount: 0, cost: 0 },
                setShowModalAddBudgetRow = jest.fn(),
                setBudgetRow = jest.fn(),
                filterBudget = jest.fn(),
                setMsg = jest.fn(),
                setShowModalMsg = jest.fn(),
                budget = { title: 'Chocotorta', idUser: '1', description: 'Choco' },
                setPriceListItem = jest.fn(),
                manual = true;

            beforeEach(() => {
                // eslint-disable-next-line testing-library/no-render-in-setup
                render(
                    <Router>
                        <AddBudgetingredient
                            budgetRow={budgetRow}
                            setShowModalAddBudgetRow={setShowModalAddBudgetRow}
                            setBudgetRow={setBudgetRow}
                            filterBudget={filterBudget}
                            setMsg={setMsg}
                            setShowModalMsg={setShowModalMsg}
                            budget={budget}
                            setPriceListItem={setPriceListItem}
                            manual={manual}
                        />
                    </Router>
                );
            })

            test('component should render', () => {
                const title = screen.getByText('Agregar Ingrediente')
                expect(title).toBeInTheDocument()
            })
            test('should not pass if statement because empty amount', () => {
                const ingredientInput: HTMLInputElement = screen.getByLabelText('Ingrediente'),
                    submitBt = screen.getByText('Agregar');

                fireEvent.change(ingredientInput, { target: { value: 'azucar' } })
                fireEvent.click(submitBt)

                expect(ingredientInput.value).toBe('azucar')
                expect(setMsg).toBeCalled()
                expect(setMsg).toBeCalledWith('Casilleros incompletos')

            });
            test('should add', () => {
                const ingredientInput: HTMLInputElement = screen.getByLabelText('Ingrediente'),
                    amountInput: HTMLInputElement = screen.getByLabelText('Unidad en gr'),
                    submitBt = screen.getByText('Agregar');

                fireEvent.change(ingredientInput, { target: { value: 'azucar' } })
                fireEvent.change(amountInput, { target: { value: '100' } })
                fireEvent.click(submitBt)

                expect(filterBudget).toBeCalled()
                expect(filterBudget).toBeCalledWith({
                    budgetTitle: 'Chocotorta',
                    budgetDescription: 'Choco',
                    ingredient: 'azucar',
                    amount: '100',
                    cost: 0
                }, 'add', 'manual', { item: 'azucar', unit: '100', price: 0 })
                expect(setShowModalAddBudgetRow).toBeCalled()
                expect(setShowModalAddBudgetRow).toBeCalledWith(false)
                expect(setBudgetRow).toBeCalled()
                expect(setBudgetRow).toBeCalledWith({ ingredient: '', amount: 0, cost: 0 })
            });
        })
        describe('Update an ingredient', () => {
            let budgetRow = { ingredient: 'azucar', amount: 1000, cost: 1000 },
                setShowModalAddBudgetRow = jest.fn(),
                setBudgetRow = jest.fn(),
                filterBudget = jest.fn(),
                setMsg = jest.fn(),
                setShowModalMsg = jest.fn(),
                budget = { title: 'Chocotorta', idUser: '1', description: 'Choco' },
                setPriceListItem = jest.fn(),
                manual = true;

            beforeEach(() => {
                // eslint-disable-next-line testing-library/no-render-in-setup
                render(
                    <Router>
                        <AddBudgetingredient
                            budgetRow={budgetRow}
                            setShowModalAddBudgetRow={setShowModalAddBudgetRow}
                            setBudgetRow={setBudgetRow}
                            filterBudget={filterBudget}
                            setMsg={setMsg}
                            setShowModalMsg={setShowModalMsg}
                            budget={budget}
                            setPriceListItem={setPriceListItem}
                            manual={manual}
                        />
                    </Router>
                );
            })

            test('component should render', () => {
                const title = screen.getByText('Modificar Ingrediente')
                expect(title).toBeInTheDocument()
            })
            test('should update', () => {
                const amountInput: HTMLInputElement = screen.getByLabelText('Unidad en gr'),
                    submitBt = screen.getByText('Modificar');

                fireEvent.change(amountInput, { target: { value: '2000' } })
                fireEvent.click(submitBt)

                expect(filterBudget).toBeCalled()
                expect(filterBudget).toBeCalledWith({
                    budgetTitle: 'Chocotorta',
                    budgetDescription: 'Choco',
                    ingredient: 'azucar',
                    amount: '2000',
                    cost: 1000
                }, 'update', 'manual', { item: 'azucar', unit: '2000', price: 1000 })
                expect(setShowModalAddBudgetRow).toBeCalled()
                expect(setShowModalAddBudgetRow).toBeCalledWith(false)
                expect(setBudgetRow).toBeCalled()
                expect(setBudgetRow).toBeCalledWith({ ingredient: '', amount: 0, cost: 0 })
            });
        })
    })
    describe('When user chose the fast option', () => {
        describe('Add a new ingredient', () => {
            let budgetRow = { ingredient: '', amount: 0, cost: 0 },
                setShowModalAddBudgetRow = jest.fn(),
                setBudgetRow = jest.fn(),
                filterBudget = jest.fn(),
                setMsg = jest.fn(),
                setShowModalMsg = jest.fn(),
                budget = { title: 'Chocotorta', idUser: '1', description: 'Choco' },
                setPriceListItem = jest.fn(),
                manual = false;

            beforeEach(() => {
                // eslint-disable-next-line testing-library/no-render-in-setup
                render(
                    <Router>
                        <AddBudgetingredient
                            budgetRow={budgetRow}
                            setShowModalAddBudgetRow={setShowModalAddBudgetRow}
                            setBudgetRow={setBudgetRow}
                            filterBudget={filterBudget}
                            setMsg={setMsg}
                            setShowModalMsg={setShowModalMsg}
                            budget={budget}
                            setPriceListItem={setPriceListItem}
                            manual={manual}
                        />
                    </Router>
                );
            })

            test('component should render', () => {
                const title = screen.getByText('Agregar Ingrediente')
                expect(title).toBeInTheDocument()
            })
            test('should not pass if statement because empty amount', () => {
                const ingredientInput: HTMLInputElement = screen.getByLabelText('Ingrediente'),
                    submitBt = screen.getByText('Agregar');

                fireEvent.change(ingredientInput, { target: { value: 'azucar' } })
                fireEvent.click(submitBt)

                expect(ingredientInput.value).toBe('azucar')
                expect(setMsg).toBeCalled()
                expect(setMsg).toBeCalledWith('Casilleros incompletos')

            });
            test('should add', () => {
                const ingredientInput: HTMLInputElement = screen.getByLabelText('Ingrediente'),
                    amountInput: HTMLInputElement = screen.getByLabelText('Unidad en gr'),
                    submitBt = screen.getByText('Agregar');

                fireEvent.change(ingredientInput, { target: { value: 'azucar' } })
                fireEvent.change(amountInput, { target: { value: '100' } })
                fireEvent.click(submitBt)

                expect(filterBudget).toBeCalled()
                expect(filterBudget).toBeCalledWith({
                    budgetTitle: 'Chocotorta',
                    budgetDescription: 'Choco',
                    ingredient: 'azucar',
                    amount: '100',
                    cost: 0
                }, 'add', 'fast', { item: 'azucar', unit: '100', price: 0 })
                expect(setShowModalAddBudgetRow).toBeCalled()
                expect(setShowModalAddBudgetRow).toBeCalledWith(false)
                expect(setBudgetRow).toBeCalled()
                expect(setBudgetRow).toBeCalledWith({ ingredient: '', amount: 0, cost: 0 })
            });
        })
        describe('Update an ingredient', () => {
            let budgetRow = { ingredient: 'azucar', amount: 1000, cost: 1000 },
                setShowModalAddBudgetRow = jest.fn(),
                setBudgetRow = jest.fn(),
                filterBudget = jest.fn(),
                setMsg = jest.fn(),
                setShowModalMsg = jest.fn(),
                budget = { title: 'Chocotorta', idUser: '1', description: 'Choco' },
                setPriceListItem = jest.fn(),
                manual = false;

            beforeEach(() => {
                // eslint-disable-next-line testing-library/no-render-in-setup
                render(
                    <Router>
                        <AddBudgetingredient
                            budgetRow={budgetRow}
                            setShowModalAddBudgetRow={setShowModalAddBudgetRow}
                            setBudgetRow={setBudgetRow}
                            filterBudget={filterBudget}
                            setMsg={setMsg}
                            setShowModalMsg={setShowModalMsg}
                            budget={budget}
                            setPriceListItem={setPriceListItem}
                            manual={manual}
                        />
                    </Router>
                );
            })

            test('component should render', () => {
                const title = screen.getByText('Modificar Ingrediente')
                expect(title).toBeInTheDocument()
            })
            test('should update', () => {
                const amountInput: HTMLInputElement = screen.getByLabelText('Unidad en gr'),
                    submitBt = screen.getByText('Modificar');

                fireEvent.change(amountInput, { target: { value: '2000' } })
                fireEvent.click(submitBt)

                expect(filterBudget).toBeCalled()
                expect(filterBudget).toBeCalledWith({
                    budgetTitle: 'Chocotorta',
                    budgetDescription: 'Choco',
                    ingredient: 'azucar',
                    amount: '2000',
                    cost: 1000
                }, 'update', 'fast', { item: 'azucar', unit: '2000', price: 1000 })
                expect(setShowModalAddBudgetRow).toBeCalled()
                expect(setShowModalAddBudgetRow).toBeCalledWith(false)
                expect(setBudgetRow).toBeCalled()
                expect(setBudgetRow).toBeCalledWith({ ingredient: '', amount: 0, cost: 0 })
            });
        })
    })

})
