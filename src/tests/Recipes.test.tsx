import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Recipes from '../components/Recipes';

describe('Recipes component', () => {
    let setShowModalRecipe = jest.fn(),
        setShowModalRecipeInfo = jest.fn(),
        setRecipe = jest.fn(),
        setShowRecipeDetails = jest.fn(),
        setMsg = jest.fn(),
        setShowModalMsg = jest.fn(),
        setAllRecipes = jest.fn(),
        handleAuth = jest.fn(),
        setLoadOption = jest.fn(),
        setMissingIngrRecipe = jest.fn(),
        setShowModalMissingIngrRecipe = jest.fn(),
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
        ];

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Router>
                <Recipes
                    allRecipes={allRecipes}
                    setShowModalRecipe={setShowModalRecipe}
                    setShowModalRecipeInfo={setShowModalRecipeInfo}
                    setRecipe={setRecipe}
                    setShowRecipeDetails={setShowRecipeDetails}
                    setMsg={setMsg}
                    setShowModalMsg={setShowModalMsg}
                    user='1'
                    setAllRecipes={setAllRecipes}
                    handleAuth={handleAuth}
                    loadOption={false}
                    setLoadOption={setLoadOption}
                    priceList={priceList}
                    setMissingIngrRecipe={setMissingIngrRecipe}
                    setShowModalMissingIngrRecipe={setShowModalMissingIngrRecipe}
                />
            </Router>
        );
    })

    test('component should render', () => {
        const title = screen.getByText('Recetas')
        expect(title).toBeInTheDocument()
    });
    test('should toggle from button to input, and input should works', () => {
        const buttonEl = screen.getByText('Buscar Receta')

        jest.useFakeTimers()
        fireEvent.click(buttonEl)

        act(() => {
            jest.runOnlyPendingTimers()
            jest.useRealTimers()
        })

        expect(screen.getByPlaceholderText('Nombre receta...')).toBeInTheDocument()
        expect(buttonEl).not.toBeInTheDocument()

        //input works
        const inputEl: HTMLInputElement = screen.getByPlaceholderText('Nombre receta...')

        fireEvent.change(inputEl, {
            target: {
                value: 'Chocotorta'
            }
        })

        expect(inputEl.value).toBe('Chocotorta')
    })
    test('should show add recipe modal', () => {
        const buttonEl = screen.getByText('Nueva Receta')

        fireEvent.click(buttonEl)

        expect(setShowModalRecipe).toBeCalled()
        expect(setShowModalRecipeInfo).toBeCalled()
    })
    test('should dynamic search works', () => {
        const buttonEl = screen.getByText('Buscar Receta')

        jest.useFakeTimers()
        fireEvent.click(buttonEl)

        act(() => {
            jest.runOnlyPendingTimers()
            jest.useRealTimers()
        })

        
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
})