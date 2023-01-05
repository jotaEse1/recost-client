import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RecipeItems from '../components/RecipeItems';
import { act } from 'react-dom/test-utils';

describe('RecipeItems component', () => {
    describe('When there are ingredients and updateRecipe is false', () => {
        let setShowModalRecipeItems = jest.fn(),
            ingredientsRecipeArr = [
                { ingredient: 'Azucar', amount: 100 },
                { ingredient: 'Barro', amount: 100 },
                { ingredient: 'Chocolate', amount: 100 },
                { ingredient: 'Yemas', amount: 100 },
                { ingredient: 'Zukini', amount: 100 },
            ],
            setShowModalNewRecipeConfirmation = jest.fn(),
            setShowModalRecipe = jest.fn(),
            handleRecipe = jest.fn(),
            recipe = { title: 'Chocotorta', description: 'Choco especial', idUser: '1' },
            setShowModalAddRecipeRow = jest.fn(),
            setRecipeRow = jest.fn(),
            setShowModalDeleteRecipeRow = jest.fn(),
            setIngredientsRecipeArr = jest.fn(),
            updateRecipe = false,
            setUpdateRecipe = jest.fn(),
            setShowModalPriceList = jest.fn()

        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Router>
                    <RecipeItems
                        setShowModalRecipeItems={setShowModalRecipeItems}
                        ingredientsRecipeArr={ingredientsRecipeArr}
                        setShowModalNewRecipeConfirmation={setShowModalNewRecipeConfirmation}
                        setShowModalRecipe={setShowModalRecipe}
                        handleRecipe={handleRecipe}
                        recipe={recipe}
                        setShowModalAddRecipeRow={setShowModalAddRecipeRow}
                        setRecipeRow={setRecipeRow}
                        setShowModalDeleteRecipeRow={setShowModalDeleteRecipeRow}
                        setIngredientsRecipeArr={setIngredientsRecipeArr}
                        updateRecipe={updateRecipe}
                        setUpdateRecipe={setUpdateRecipe}
                        setShowModalPriceList={setShowModalPriceList}

                    />
                </Router>
            );
        })

        test('component should render', () => {
            const title = screen.getByText('Ingredientes de la Receta')
            expect(title).toBeInTheDocument()
        });
        test('should render title and description', () => {
            expect(screen.getByText(`${recipe.title}`)).toBeInTheDocument()
            expect(screen.getByText(`${recipe.description}`)).toBeInTheDocument()
        })
        test('should render ingredient list', () => {
            const firstEl = screen.getByText(ingredientsRecipeArr[0].ingredient),
                secondEl = screen.getByText(ingredientsRecipeArr[1].ingredient),
                thirdEl = screen.getByText(ingredientsRecipeArr[2].ingredient),
                fourthEl = screen.getByText(ingredientsRecipeArr[3].ingredient);

            expect(firstEl).toBeInTheDocument()
            expect(secondEl).toBeInTheDocument()
            expect(thirdEl).toBeInTheDocument()
            expect(fourthEl).toBeInTheDocument()
        })
        test('should Agregar ingrediente button works', () => {
            const buttonEl = screen.getByText('Agregar Ingrediente')

            fireEvent.click(buttonEl)

            expect(setShowModalAddRecipeRow).toBeCalledWith(true)
        });
        test('should cancel button works and delete the recipe', () => {
            const cancelarBt = screen.getByText('Cancelar');

            jest.useFakeTimers()
            fireEvent.click(cancelarBt)

            act(() => {
                jest.runOnlyPendingTimers()
                jest.useRealTimers()
            })

            expect(setShowModalRecipe).toBeCalled()
            expect(setShowModalRecipe).toBeCalledWith(false)
            expect(setIngredientsRecipeArr).toBeCalled()
            expect(setIngredientsRecipeArr).toBeCalledWith(null)
            expect(setShowModalRecipeItems).toBeCalled()
            expect(setShowModalRecipeItems).toBeCalledWith(false)
            expect(handleRecipe).toBeCalled()
            expect(handleRecipe).toBeCalledWith('delete', recipe)
        })
        test('should continue button works and continue with the recipe', () => {
            const continuarBt = screen.getByText('Continuar');

            jest.useFakeTimers()
            fireEvent.click(continuarBt)

            act(() => {
                jest.runOnlyPendingTimers()
                jest.useRealTimers()
            })

            expect(setShowModalRecipeItems).toBeCalled()
            expect(setShowModalRecipeItems).toBeCalledWith(false)
            expect(setShowModalNewRecipeConfirmation).toBeCalled()
            expect(setShowModalNewRecipeConfirmation).toBeCalledWith(true)
        })
        test('should priceList button works and render table', () => {
            const listBt = screen.getByRole('list');

            fireEvent.click(listBt)

            expect(setShowModalPriceList).toBeCalled()
            expect(setShowModalPriceList).toBeCalledWith(true)
        })


    })
    describe('When ingredients are null and updateRecipe is true', () => {
        let setShowModalRecipeItems = jest.fn(),
            ingredientsRecipeArr: null = null,
            setShowModalNewRecipeConfirmation = jest.fn(),
            setShowModalRecipe = jest.fn(),
            handleRecipe = jest.fn(),
            recipe = { title: 'Chocotorta', description: 'Choco especial', idUser: '1' },
            setShowModalAddRecipeRow = jest.fn(),
            setRecipeRow = jest.fn(),
            setShowModalDeleteRecipeRow = jest.fn(),
            setIngredientsRecipeArr = jest.fn(),
            updateRecipe = true,
            setUpdateRecipe = jest.fn(),
            setShowModalPriceList = jest.fn()

        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Router>
                    <RecipeItems
                        setShowModalRecipeItems={setShowModalRecipeItems}
                        ingredientsRecipeArr={ingredientsRecipeArr}
                        setShowModalNewRecipeConfirmation={setShowModalNewRecipeConfirmation}
                        setShowModalRecipe={setShowModalRecipe}
                        handleRecipe={handleRecipe}
                        recipe={recipe}
                        setShowModalAddRecipeRow={setShowModalAddRecipeRow}
                        setRecipeRow={setRecipeRow}
                        setShowModalDeleteRecipeRow={setShowModalDeleteRecipeRow}
                        setIngredientsRecipeArr={setIngredientsRecipeArr}
                        updateRecipe={updateRecipe}
                        setUpdateRecipe={setUpdateRecipe}
                        setShowModalPriceList={setShowModalPriceList}

                    />
                </Router>
            );
        })

        test('component should render', () => {
            const title = screen.getByText('Ingredientes de la Receta')
            expect(title).toBeInTheDocument()
        });
        test('should render No hay ingredientes', () => {
            const emptyList = screen.getByText('No hay ingredientes');

            expect(emptyList).toBeInTheDocument()
        })
        test('should cancel button works and close the recipe', () => {
            const cancelarBt = screen.getByText('Cancelar');

            jest.useFakeTimers()
            fireEvent.click(cancelarBt)

            act(() => {
                jest.runOnlyPendingTimers()
                jest.useRealTimers()
            })

            expect(setShowModalRecipe).toBeCalled()
            expect(setShowModalRecipe).toBeCalledWith(false)
            expect(setIngredientsRecipeArr).toBeCalled()
            expect(setIngredientsRecipeArr).toBeCalledWith(null)
            expect(setShowModalRecipeItems).toBeCalled()
            expect(setShowModalRecipeItems).toBeCalledWith(false)
            expect(setUpdateRecipe).toBeCalled()
            expect(setUpdateRecipe).toBeCalledWith(false)
        })

    })
    describe('When ingredients is an empty array', () => {
        let setShowModalRecipeItems = jest.fn(),
            ingredientsRecipeArr: any[] = [],
            setShowModalNewRecipeConfirmation = jest.fn(),
            setShowModalRecipe = jest.fn(),
            handleRecipe = jest.fn(),
            recipe = { title: 'Chocotorta', description: 'Choco especial', idUser: '1' },
            setShowModalAddRecipeRow = jest.fn(),
            setRecipeRow = jest.fn(),
            setShowModalDeleteRecipeRow = jest.fn(),
            setIngredientsRecipeArr = jest.fn(),
            updateRecipe = true,
            setUpdateRecipe = jest.fn(),
            setShowModalPriceList = jest.fn()

        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Router>
                    <RecipeItems
                        setShowModalRecipeItems={setShowModalRecipeItems}
                        ingredientsRecipeArr={ingredientsRecipeArr}
                        setShowModalNewRecipeConfirmation={setShowModalNewRecipeConfirmation}
                        setShowModalRecipe={setShowModalRecipe}
                        handleRecipe={handleRecipe}
                        recipe={recipe}
                        setShowModalAddRecipeRow={setShowModalAddRecipeRow}
                        setRecipeRow={setRecipeRow}
                        setShowModalDeleteRecipeRow={setShowModalDeleteRecipeRow}
                        setIngredientsRecipeArr={setIngredientsRecipeArr}
                        updateRecipe={updateRecipe}
                        setUpdateRecipe={setUpdateRecipe}
                        setShowModalPriceList={setShowModalPriceList}

                    />
                </Router>
            );
        })

        test('component should render', () => {
            const title = screen.getByText('Ingredientes de la Receta')
            expect(title).toBeInTheDocument()
        })
        test('should render No hay ingredientes', () => {
            const emptyRow = screen.getByText('No hay ingredientes');

            expect(emptyRow).toBeInTheDocument()
        })
        

    })
})


