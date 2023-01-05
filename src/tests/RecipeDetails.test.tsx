import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RecipeDetails from '../components/RecipeDetails'
import { act } from 'react-dom/test-utils';

describe('RecipeDetails component', () => {
    describe('When recipe has ingredients', () => {
        let setShowRecipeDetails = jest.fn(),
            recipe = {
                title: 'Chocotorta',
                idUser: '1',
                description: 'Choco especial',
                ingredients: [
                    { ingredient: 'Azucar', amount: 100 },
                    { ingredient: 'Chocolate', amount: 1000 }
                ]
            },
            setIngredientsRecipeArr = jest.fn(),
            setShowModalRecipeItems = jest.fn(),
            setShowModalRecipe = jest.fn(),
            setUpdateRecipe = jest.fn(),
            setShowDeleteRecipe = jest.fn();

        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Router>
                    <RecipeDetails
                        setShowRecipeDetails={setShowRecipeDetails}
                        recipe={recipe}
                        setIngredientsRecipeArr={setIngredientsRecipeArr}
                        setShowModalRecipeItems={setShowModalRecipeItems}
                        setShowModalRecipe={setShowModalRecipe}
                        setUpdateRecipe={setUpdateRecipe}
                        setShowDeleteRecipe={setShowDeleteRecipe}
                    />
                </Router>
            );
        })

        test('component should render', () => {
            const title = screen.getByText('Ingredientes de la receta')
            expect(title).toBeInTheDocument()
        })
        test('should text content render', () => {
            const title = screen.getByText(`${recipe.title}`),
                description = screen.getByText(`${recipe.description}`);

            expect(title).toBeInTheDocument()
            expect(description).toBeInTheDocument()
        })
        test('should close the recipeDetails', () => {
            const buttonEl = screen.getByRole('close')

            jest.useFakeTimers()
            fireEvent.click(buttonEl)

            act(() => {
                jest.runOnlyPendingTimers()
                jest.useRealTimers()
            })

            expect(setShowModalRecipe).toBeCalled()
            expect(setShowModalRecipe).toBeCalledWith(false)
            expect(setShowRecipeDetails).toBeCalled()
            expect(setShowRecipeDetails).toBeCalledWith(false)
        })
        test('should render ingredient list and cost calculations', () => {
            const firstEl = screen.getByText(recipe.ingredients[0].ingredient),
                secondEl = screen.getByText(recipe.ingredients[1].ingredient),
                costCalc = screen.getByText('% utilidad');

            expect(firstEl).toBeInTheDocument()
            expect(secondEl).toBeInTheDocument()
            expect(costCalc).toBeInTheDocument()
        })
        test('should show confirmation to delete recipe', () => {
          const buttonEl = screen.getByText('Eliminar')

          fireEvent.click(buttonEl)

          expect(setShowDeleteRecipe).toBeCalled()
          expect(setShowDeleteRecipe).toBeCalledWith(true)
        })
        test('should show confirmation to modify recipe', () => {
            const buttonEl = screen.getByText('Modificar')
  
            jest.useFakeTimers()
            fireEvent.click(buttonEl)

            act(() => {
                jest.runOnlyPendingTimers()
                jest.useRealTimers()
            })
  
            expect(setUpdateRecipe).toBeCalled()
            expect(setUpdateRecipe).toBeCalledWith(true)
            expect(setShowModalRecipeItems).toBeCalled()
            expect(setShowModalRecipeItems).toBeCalledWith(true)
            expect(setShowRecipeDetails).toBeCalled()
            expect(setShowRecipeDetails).toBeCalledWith(false)

            /* 
            setUpdateRecipe(true)
setShowModalRecipeItems(true)
setShowRecipeDetails(false)
            */
          })
    })
    describe('When recipe has no ingredients', () => {
        let setShowRecipeDetails = jest.fn(),
            recipe = {
                title: 'Chocotorta',
                idUser: '1',
                description: 'Choco especial',
                ingredients: []
            },
            setIngredientsRecipeArr = jest.fn(),
            setShowModalRecipeItems = jest.fn(),
            setShowModalRecipe = jest.fn(),
            setUpdateRecipe = jest.fn(),
            setShowDeleteRecipe = jest.fn();

        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Router>
                    <RecipeDetails
                        setShowRecipeDetails={setShowRecipeDetails}
                        recipe={recipe}
                        setIngredientsRecipeArr={setIngredientsRecipeArr}
                        setShowModalRecipeItems={setShowModalRecipeItems}
                        setShowModalRecipe={setShowModalRecipe}
                        setUpdateRecipe={setUpdateRecipe}
                        setShowDeleteRecipe={setShowDeleteRecipe}
                    />
                </Router>
            );
        })

        test('component should render', () => {
            const title = screen.getByText('Ingredientes de la receta')
            expect(title).toBeInTheDocument()
        })
        test('should render No hay ingredientes and No hay Costo', () => {
            const firstEl = screen.getByText('Sin Costo'),
                secondEl = screen.getByText('No hay ingredientes');

            expect(firstEl).toBeInTheDocument()
            expect(secondEl).toBeInTheDocument()
        })


    })
    describe('When recipes ingredients is null', () => {
        let setShowRecipeDetails = jest.fn(),
            recipe = {
                title: 'Chocotorta',
                idUser: '1',
                description: 'Choco especial',
                ingredients: null
            },
            setIngredientsRecipeArr = jest.fn(),
            setShowModalRecipeItems = jest.fn(),
            setShowModalRecipe = jest.fn(),
            setUpdateRecipe = jest.fn(),
            setShowDeleteRecipe = jest.fn();

        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Router>
                    <RecipeDetails
                        setShowRecipeDetails={setShowRecipeDetails}
                        recipe={recipe}
                        setIngredientsRecipeArr={setIngredientsRecipeArr}
                        setShowModalRecipeItems={setShowModalRecipeItems}
                        setShowModalRecipe={setShowModalRecipe}
                        setUpdateRecipe={setUpdateRecipe}
                        setShowDeleteRecipe={setShowDeleteRecipe}
                    />
                </Router>
            );
        })

        test('component should render', () => {
            const title = screen.getByText('Ingredientes de la receta')
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
