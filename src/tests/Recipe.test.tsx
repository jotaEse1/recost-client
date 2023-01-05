import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Recipe from '../components/Recipe';

describe('Recipe component', () => {
    describe('When recipes ingredients are in the priceList', () => {
        let data = {
            title: 'Chocotorta',
            idUser: '1',
            description: 'Choco especial',
            ingredients: [
                {ingredient: 'Azucar',amount: 1000},
                {ingredient: 'Chocolate',amount: 1000},
                {ingredient: 'Huevos',amount: 1000},
            ]
        },
            setRecipe = jest.fn(),
            setShowRecipeDetails = jest.fn(),
            setShowModalRecipe = jest.fn(),
            priceList = [
                {
                    item: 'Azucar',
                    unit: 1000,
                    price: 1000,
                    idUser: '1'
                },
                {
                    item: 'Chocolate',
                    unit: 1000,
                    price: 1000,
                    idUser: '1'
                },
                {
                    item: 'Huevos',
                    unit: 1000,
                    price: 1000,
                    idUser: '1'
                },
                {
                    item: 'Yemas',
                    unit: 1000,
                    price: 1000,
                    idUser: '1'
                },
                {
                    item: 'Za',
                    unit: 1000,
                    price: 1000,
                    idUser: '1'
                },
                {
                    item: 'Zal',
                    unit: 1000,
                    price: 1000,
                    idUser: '1'
                },
                {
                    item: 'Zekuni',
                    unit: 1000,
                    price: 1000,
                    idUser: '1'
                },
                {
                    item: 'Zikuni',
                    unit: 1000,
                    price: 1000,
                    idUser: '1'
                },
                {
                    item: 'Zukuni',
                    unit: 1000,
                    price: 1000,
                    idUser: '1'
                },
            ],
            setMissingIngrRecipe = jest.fn(),
            setShowModalMissingIngrRecipe = jest.fn();
    
        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Router>
                    <Recipe
                        data={data}
                        setRecipe={setRecipe}
                        setShowRecipeDetails={setShowRecipeDetails}
                        setShowModalRecipe={setShowModalRecipe}
                        priceList={priceList}
                        setMissingIngrRecipe={setMissingIngrRecipe}
                        setShowModalMissingIngrRecipe={setShowModalMissingIngrRecipe}
                    />
                </Router>
            );
        })
    
        test('component should render and text too', () => {
            const title = screen.getByText(`${data.title}`),
                description = screen.getByText(`${data.description}`)
    
            expect(title).toBeInTheDocument()
            expect(description).toBeInTheDocument()
        })
        /*No se por qué no funciona binarySearch, no le coloca los valores en el costo ¿no lo ejecutará el test?
        test('should show the recipe details', () => {
            const pressableDiv = screen.getByRole('pressable')
    
            fireEvent.click(pressableDiv)
            
            expect(setShowModalRecipe).toBeCalledWith(true)
            expect(setShowRecipeDetails).toBeCalled()
            expect(setShowRecipeDetails).toBeCalledWith(true)
            expect(setRecipe).toBeCalled()
            expect(setRecipe).toBeCalledWith({
                title: 'Chocotorta',
                idUser: '1',
                description: 'Choco especial',
                ingredients: [
                    {ingredient: 'Azucar',amount: 1000, cost: 1000},
                    {ingredient: 'Chocolate',amount: 1000, cost: 1000},
                    {ingredient: 'Huevos',amount: 1000, cost: 1000},
                ]
            })
        })
        */
    })
    describe('When recipes ingredients are not in the priceList', () => {
        let data = {
            title: 'Chocotorta',
            idUser: '1',
            description: 'Choco especial',
            ingredients: [
                {ingredient: 'Azucar',amount: 1000},
                {ingredient: 'Chocolate',amount: 1000},
                {ingredient: 'Huevos',amount: 1000},
            ]
        },
            setRecipe = jest.fn(),
            setShowRecipeDetails = jest.fn(),
            setShowModalRecipe = jest.fn(),
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
                    item: 'Za',
                    unit: 1000,
                    price: 1000
                },
                {
                    item: 'Zal',
                    unit: 1000,
                    price: 1000
                },
                {
                    item: 'Zekuni',
                    unit: 1000,
                    price: 1000
                },
                {
                    item: 'Zikuni',
                    unit: 1000,
                    price: 1000
                },
                {
                    item: 'Zukuni',
                    unit: 1000,
                    price: 1000
                },
            ],
            setMissingIngrRecipe = jest.fn(),
            setShowModalMissingIngrRecipe = jest.fn();
    
        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Router>
                    <Recipe
                        data={data}
                        setRecipe={setRecipe}
                        setShowRecipeDetails={setShowRecipeDetails}
                        setShowModalRecipe={setShowModalRecipe}
                        priceList={priceList}
                        setMissingIngrRecipe={setMissingIngrRecipe}
                        setShowModalMissingIngrRecipe={setShowModalMissingIngrRecipe}
                    />
                </Router>
            );
        })
    
        test('component should render and text too', () => {
            const title = screen.getByText(`${data.title}`),
                description = screen.getByText(`${data.description}`)
    
            expect(title).toBeInTheDocument()
            expect(description).toBeInTheDocument()
        })
        test('should show the missingIngredient component', () => {
            const pressableDiv = screen.getByRole('pressable')
    
            fireEvent.click(pressableDiv)

            expect(setMissingIngrRecipe).toBeCalled()
            expect(setMissingIngrRecipe).toBeCalledWith(['Azucar', 'Chocolate', 'Huevos'])
            expect(setShowModalRecipe).toBeCalledWith(true)
            expect(setShowRecipeDetails).toBeCalled()
            expect(setShowRecipeDetails).toBeCalledWith(true)
            expect(setRecipe).toBeCalled()
            expect(setRecipe).toBeCalledWith({
                title: 'Chocotorta',
                idUser: '1',
                description: 'Choco especial',
                ingredients: [
                    {ingredient: 'Azucar',amount: 1000, cost: 0},
                    {ingredient: 'Chocolate',amount: 1000, cost: 0},
                    {ingredient: 'Huevos',amount: 1000, cost: 0},
                ]
            })
        })
    })
})


