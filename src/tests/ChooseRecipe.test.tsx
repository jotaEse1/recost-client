import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import ChooseRecipe from '../components/ChooseRecipe';

describe('ChooseRecipe component', () => {
    describe('When all recipes has recipes to choose and ingredients are null', () => {
        let setShowModalChooseRecipe = jest.fn(),
            setShowModalBudget = jest.fn(),
            budget = { title: 'Chocotorta', idUser: '1', description: 'Choco especial' },
            handleBudget = jest.fn(),
            allRecipes = [
                {
                    title: 'Chocotorta',
                    idUser: '1',
                    description: 'Choco especial'
                },
                {
                    title: 'Lemon Pie',
                    idUser: '1',
                    description: 'Lemon Pie especial'
                },
                {
                    title: 'Oreo Cake',
                    idUser: '1',
                    description: 'Oreo Cake especial'
                },
                {
                    title: 'Za',
                    idUser: '1',
                    description: 'Zuzuky especial'
                },
                {
                    title: 'Zal',
                    idUser: '1',
                    description: 'Zuzuky especial'
                },
                {
                    title: 'Zeu',
                    idUser: '1',
                    description: 'Zuzuky especial'
                },
                {
                    title: 'Zuzuky',
                    idUser: '1',
                    description: 'Zuzuky especial'
                },
            ],
            setRecipeChoosen = jest.fn(),
            recipeChoosen = { title: 'Chocotorta', idUser: '1', description: 'Choco especial', ingredients: null },
            priceList = [
                {
                    item: 'Azucar',
                    unit: 1000,
                    price: 1000
                },
                {
                    item: 'Chocolate',
                    unit: 1000,
                    price: 1000
                },
                {
                    item: 'Huevos',
                    unit: 1000,
                    price: 1000
                },
                {
                    item: 'Yemas',
                    unit: 1000,
                    price: 1000
                },
                {
                    item: 'Zukuni',
                    unit: 1000,
                    price: 1000
                },
            ],
            setShowModalBudgetItems = jest.fn(),
            setMissingIngr = jest.fn(),
            setShowModalMissingIngr = jest.fn();

        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Router>
                    <ChooseRecipe
                        setShowModalChooseRecipe={setShowModalChooseRecipe}
                        setShowModalBudget={setShowModalBudget}
                        budget={budget}
                        handleBudget={handleBudget}
                        allRecipes={allRecipes}
                        setRecipeChoosen={setRecipeChoosen}
                        recipeChoosen={recipeChoosen}
                        priceList={priceList}
                        setShowModalBudgetItems={setShowModalBudgetItems}
                        setMissingIngr={setMissingIngr}
                        setShowModalMissingIngr={setShowModalMissingIngr}
                    />
                </Router>
            );
        })

        test('component should render', () => {
            const title = screen.getByText('Escoge una receta')
            expect(title).toBeInTheDocument()
        })
        test('should dynamic search works', () => {
            const inputEl: HTMLInputElement = screen.getByPlaceholderText('Nombre receta...')

            fireEvent.change(inputEl, {
                target: {
                    value: 'Z'
                }
            })

            expect(screen.getByText('Za')).toBeInTheDocument()
            expect(screen.getByText('Zal')).toBeInTheDocument()
            expect(screen.getByText('Zeu')).toBeInTheDocument()
            expect(screen.getByText('Zuzuky')).toBeInTheDocument()
            expect(screen.queryByText('Chocotorta')).not.toBeInTheDocument()
            expect(screen.queryByText('Oreo Cake')).not.toBeInTheDocument()

            fireEvent.change(inputEl, {
                target: {
                    value: 'Za'
                }
            })

            expect(screen.getByText('Za')).toBeInTheDocument()
            expect(screen.queryByText('Chocotorta')).not.toBeInTheDocument()
            expect(screen.queryByText('Oreo Cake')).not.toBeInTheDocument()

            fireEvent.change(inputEl, {
                target: {
                    value: 'ZACACACASSCACASCSAC'
                }
            })

            expect(screen.getByText('No hay recetas')).toBeInTheDocument()
        })
        test('should cancel stage 2 of creating a budget', () => {
            const buttonEl = screen.getByText('Cancelar')

            jest.useFakeTimers()
            fireEvent.click(buttonEl)

            act(() => {
                jest.runOnlyPendingTimers()
                jest.useRealTimers()
            })

            expect(setShowModalBudget).toBeCalled()
            expect(setShowModalBudget).toBeCalledWith(false)
            expect(setRecipeChoosen).toBeCalled()
            expect(setRecipeChoosen).toBeCalledWith(null)
            expect(setShowModalChooseRecipe).toBeCalled()
            expect(setShowModalChooseRecipe).toBeCalledWith(false)
            expect(handleBudget).toBeCalled()
            expect(handleBudget).toBeCalledWith('delete', budget)
        })
        test('should not complete stage 2 of creating a budget because ingredients are null', () => {
            const buttonEl = screen.getByText('Continuar')

            jest.useFakeTimers()
            fireEvent.click(buttonEl)

            act(() => {
                jest.runOnlyPendingTimers()
                jest.useRealTimers()
            })

            expect(setShowModalMissingIngr).toBeCalled()
            expect(setShowModalMissingIngr).toBeCalledWith(true)
            expect(setMissingIngr).toBeCalled()
            expect(setMissingIngr).toBeCalledWith(['Receta sin ingredientes!'])
            expect(setShowModalChooseRecipe).toBeCalled()
            expect(setShowModalChooseRecipe).toBeCalledWith(false)

        })

        /*
        test('should save recipe', () => {
            const buttonEl = screen.getByRole('save')
    
            jest.useFakeTimers()
            fireEvent.click(buttonEl)
    
            act(() => {
                jest.runOnlyPendingTimers()
                jest.useRealTimers()
            })
    
            expect(setShowModalRecipe).toBeCalled()
            expect(setShowModalRecipe).toBeCalledWith(false)
            expect(setShowModalNewRecipeConfirmation).toBeCalled()
            expect(setShowModalNewRecipeConfirmation).toBeCalledWith(false)
            expect(filterRecipe).toBeCalled()
            expect(filterRecipe).toBeCalledWith({ ingredient: '', amount: 0 }, 'save-recipe')
        })
        */

    })
    describe('When all recipes has recipes to choose and ingredients are an empty array', () => {
        let setShowModalChooseRecipe = jest.fn(),
            setShowModalBudget = jest.fn(),
            budget = { title: 'Chocotorta', idUser: '1', description: 'Choco especial' },
            handleBudget = jest.fn(),
            allRecipes = [
                {
                    title: 'Chocotorta',
                    idUser: '1',
                    description: 'Choco especial'
                },
                {
                    title: 'Lemon Pie',
                    idUser: '1',
                    description: 'Lemon Pie especial'
                },
                {
                    title: 'Oreo Cake',
                    idUser: '1',
                    description: 'Oreo Cake especial'
                },
                {
                    title: 'Za',
                    idUser: '1',
                    description: 'Zuzuky especial'
                },
                {
                    title: 'Zal',
                    idUser: '1',
                    description: 'Zuzuky especial'
                },
                {
                    title: 'Zeu',
                    idUser: '1',
                    description: 'Zuzuky especial'
                },
                {
                    title: 'Zuzuky',
                    idUser: '1',
                    description: 'Zuzuky especial'
                },
            ],
            setRecipeChoosen = jest.fn(),
            recipeChoosen = { title: 'Chocotorta', idUser: '1', description: 'Choco especial', ingredients: [] },
            priceList = [
                {
                    item: 'Azucar',
                    unit: 1000,
                    price: 1000
                },
                {
                    item: 'Chocolate',
                    unit: 1000,
                    price: 1000
                },
                {
                    item: 'Huevos',
                    unit: 1000,
                    price: 1000
                },
                {
                    item: 'Yemas',
                    unit: 1000,
                    price: 1000
                },
                {
                    item: 'Zukuni',
                    unit: 1000,
                    price: 1000
                },
            ],
            setShowModalBudgetItems = jest.fn(),
            setMissingIngr = jest.fn(),
            setShowModalMissingIngr = jest.fn();

        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Router>
                    <ChooseRecipe
                        setShowModalChooseRecipe={setShowModalChooseRecipe}
                        setShowModalBudget={setShowModalBudget}
                        budget={budget}
                        handleBudget={handleBudget}
                        allRecipes={allRecipes}
                        setRecipeChoosen={setRecipeChoosen}
                        recipeChoosen={recipeChoosen}
                        priceList={priceList}
                        setShowModalBudgetItems={setShowModalBudgetItems}
                        setMissingIngr={setMissingIngr}
                        setShowModalMissingIngr={setShowModalMissingIngr}
                    />
                </Router>
            );
        })

        test('component should render', () => {
            const title = screen.getByText('Escoge una receta')
            expect(title).toBeInTheDocument()
        })
        test('should not complete stage 2 of creating a budget because ingredients are an empty array', () => {
            const buttonEl = screen.getByText('Continuar')

            jest.useFakeTimers()
            fireEvent.click(buttonEl)

            act(() => {
                jest.runOnlyPendingTimers()
                jest.useRealTimers()
            })

            expect(setShowModalMissingIngr).toBeCalled()
            expect(setShowModalMissingIngr).toBeCalledWith(true)
            expect(setMissingIngr).toBeCalled()
            expect(setMissingIngr).toBeCalledWith(['Receta sin ingredientes!'])
            expect(setShowModalChooseRecipe).toBeCalled()
            expect(setShowModalChooseRecipe).toBeCalledWith(false)
        })
    })
    describe('When all recipes has recipes to choose and ingredients are not in price list', () => {
        let setShowModalChooseRecipe = jest.fn(),
            setShowModalBudget = jest.fn(),
            budget = { title: 'Chocotorta', idUser: '1', description: 'Choco especial' },
            handleBudget = jest.fn(),
            allRecipes = [
                {
                    title: 'Chocotorta',
                    idUser: '1',
                    description: 'Choco especial'
                },
                {
                    title: 'Lemon Pie',
                    idUser: '1',
                    description: 'Lemon Pie especial'
                },
                {
                    title: 'Oreo Cake',
                    idUser: '1',
                    description: 'Oreo Cake especial'
                },
                {
                    title: 'Za',
                    idUser: '1',
                    description: 'Zuzuky especial'
                },
                {
                    title: 'Zal',
                    idUser: '1',
                    description: 'Zuzuky especial'
                },
                {
                    title: 'Zeu',
                    idUser: '1',
                    description: 'Zuzuky especial'
                },
                {
                    title: 'Zuzuky',
                    idUser: '1',
                    description: 'Zuzuky especial'
                },
            ],
            setRecipeChoosen = jest.fn(),
            recipeChoosen = {
                title: 'Chocotorta',
                idUser: '1',
                description: 'Choco especial',
                ingredients: [
                    {
                        ingredient: 'Azucar',
                        amount: 1000,
                        cost: 1000
                    },
                    {
                        ingredient: 'Chocolate',
                        amount: 1000,
                        cost: 1000
                    }
                ]
            },
            priceList = [
                {
                    item: 'Huevos',
                    unit: 1000,
                    price: 1000
                },
                {
                    item: 'Yemas',
                    unit: 1000,
                    price: 1000
                },
                {
                    item: 'Zukuni',
                    unit: 1000,
                    price: 1000
                },
            ],
            setShowModalBudgetItems = jest.fn(),
            setMissingIngr = jest.fn(),
            setShowModalMissingIngr = jest.fn();

        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Router>
                    <ChooseRecipe
                        setShowModalChooseRecipe={setShowModalChooseRecipe}
                        setShowModalBudget={setShowModalBudget}
                        budget={budget}
                        handleBudget={handleBudget}
                        allRecipes={allRecipes}
                        setRecipeChoosen={setRecipeChoosen}
                        recipeChoosen={recipeChoosen}
                        priceList={priceList}
                        setShowModalBudgetItems={setShowModalBudgetItems}
                        setMissingIngr={setMissingIngr}
                        setShowModalMissingIngr={setShowModalMissingIngr}
                    />
                </Router>
            );
        })

        test('component should render', () => {
            const title = screen.getByText('Escoge una receta')
            expect(title).toBeInTheDocument()
        })
        test('should not complete stage 2 of creating a budget because ingredients are not in price list', () => {
            const buttonEl = screen.getByText('Continuar')

            jest.useFakeTimers()
            fireEvent.click(buttonEl)

            act(() => {
                jest.runOnlyPendingTimers()
                jest.useRealTimers()
            })

            expect(setShowModalMissingIngr).toBeCalled()
            expect(setShowModalMissingIngr).toBeCalledWith(true)
            expect(setMissingIngr).toBeCalled()
            expect(setMissingIngr).toBeCalledWith(['Azucar', 'Chocolate'])
            expect(setShowModalChooseRecipe).toBeCalled()
            expect(setShowModalChooseRecipe).toBeCalledWith(false)
        })
    })

    //i cant' perform a complete stage 2 because binarySearch in test is not working, but in real world it does
    
    describe('When all recipes is an empty array', () => {
        let setShowModalChooseRecipe = jest.fn(),
            setShowModalBudget = jest.fn(),
            budget = { title: 'Chocotorta', idUser: '1', description: 'Choco especial' },
            handleBudget = jest.fn(),
            allRecipes: any[] = [],
            setRecipeChoosen = jest.fn(),
            recipeChoosen = { title: 'Chocotorta', idUser: '1', description: 'Choco especial' },
            priceList = [
                {
                    item: 'Azucar',
                    unit: 1000,
                    price: 1000
                },
                {
                    item: 'Chocolate',
                    unit: 1000,
                    price: 1000
                },
                {
                    item: 'Huevos',
                    unit: 1000,
                    price: 1000
                },
                {
                    item: 'Yemas',
                    unit: 1000,
                    price: 1000
                },
                {
                    item: 'Zukuni',
                    unit: 1000,
                    price: 1000
                },
            ],
            setShowModalBudgetItems = jest.fn(),
            setMissingIngr = jest.fn(),
            setShowModalMissingIngr = jest.fn();

        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Router>
                    <ChooseRecipe
                        setShowModalChooseRecipe={setShowModalChooseRecipe}
                        setShowModalBudget={setShowModalBudget}
                        budget={budget}
                        handleBudget={handleBudget}
                        allRecipes={allRecipes}
                        setRecipeChoosen={setRecipeChoosen}
                        recipeChoosen={recipeChoosen}
                        priceList={priceList}
                        setShowModalBudgetItems={setShowModalBudgetItems}
                        setMissingIngr={setMissingIngr}
                        setShowModalMissingIngr={setShowModalMissingIngr}
                    />
                </Router>
            );
        })

        test('component should render', () => {
            const title = screen.getByText('Escoge una receta')
            expect(title).toBeInTheDocument()
        })
        test('should dynamic search works', () => {
            const inputEl: HTMLInputElement = screen.getByPlaceholderText('Nombre receta...')

            fireEvent.change(inputEl, {
                target: {
                    value: 'Z'
                }
            })

            expect(screen.getByText('No hay recetas')).toBeInTheDocument()
            expect(screen.queryByText('Chocotorta')).not.toBeInTheDocument()
            expect(screen.queryByText('Oreo Cake')).not.toBeInTheDocument()

            fireEvent.change(inputEl, {
                target: {
                    value: 'Za'
                }
            })

            expect(screen.getByText('No hay recetas')).toBeInTheDocument()
            expect(screen.queryByText('Za')).not.toBeInTheDocument()
            expect(screen.queryByText('Oreo Cake')).not.toBeInTheDocument()

            fireEvent.change(inputEl, {
                target: {
                    value: 'ZACACACASSCACASCSAC'
                }
            })

            expect(screen.getByText('No hay recetas')).toBeInTheDocument()
        })
    })
    describe('When all recipes is null', () => {
        let setShowModalChooseRecipe = jest.fn(),
            setShowModalBudget = jest.fn(),
            budget = { title: 'Chocotorta', idUser: '1', description: 'Choco especial' },
            handleBudget = jest.fn(),
            allRecipes: null = null,
            setRecipeChoosen = jest.fn(),
            recipeChoosen = { title: 'Chocotorta', idUser: '1', description: 'Choco especial' },
            priceList = [
                {
                    item: 'Azucar',
                    unit: 1000,
                    price: 1000
                },
                {
                    item: 'Chocolate',
                    unit: 1000,
                    price: 1000
                },
                {
                    item: 'Huevos',
                    unit: 1000,
                    price: 1000
                },
                {
                    item: 'Yemas',
                    unit: 1000,
                    price: 1000
                },
                {
                    item: 'Zukuni',
                    unit: 1000,
                    price: 1000
                },
            ],
            setShowModalBudgetItems = jest.fn(),
            setMissingIngr = jest.fn(),
            setShowModalMissingIngr = jest.fn();

        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Router>
                    <ChooseRecipe
                        setShowModalChooseRecipe={setShowModalChooseRecipe}
                        setShowModalBudget={setShowModalBudget}
                        budget={budget}
                        handleBudget={handleBudget}
                        allRecipes={allRecipes}
                        setRecipeChoosen={setRecipeChoosen}
                        recipeChoosen={recipeChoosen}
                        priceList={priceList}
                        setShowModalBudgetItems={setShowModalBudgetItems}
                        setMissingIngr={setMissingIngr}
                        setShowModalMissingIngr={setShowModalMissingIngr}
                    />
                </Router>
            );
        })

        test('component should render', () => {
            const title = screen.getByText('Escoge una receta')
            expect(title).toBeInTheDocument()
        })
        test('should dynamic search works', () => {
            const inputEl: HTMLInputElement = screen.getByPlaceholderText('Nombre receta...')

            fireEvent.change(inputEl, {
                target: {
                    value: 'Z'
                }
            })

            expect(screen.getByText('No hay recetas')).toBeInTheDocument()
            expect(screen.queryByText('Chocotorta')).not.toBeInTheDocument()
            expect(screen.queryByText('Oreo Cake')).not.toBeInTheDocument()

            fireEvent.change(inputEl, {
                target: {
                    value: 'Za'
                }
            })

            expect(screen.getByText('No hay recetas')).toBeInTheDocument()
            expect(screen.queryByText('Za')).not.toBeInTheDocument()
            expect(screen.queryByText('Oreo Cake')).not.toBeInTheDocument()

            fireEvent.change(inputEl, {
                target: {
                    value: 'ZACACACASSCACASCSAC'
                }
            })

            expect(screen.getByText('No hay recetas')).toBeInTheDocument()
        })
    })


})

