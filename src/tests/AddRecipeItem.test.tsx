import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AddRecipeItem from '../components/AddRecipeItem';

describe('AddRecipeItem component', () => {
    describe('Add a new ingredient', () => {
        let recipeRow = {ingredient: '', amount: 0},
            setShowModalAddRecipeRow = jest.fn(),
            setRecipeRow = jest.fn(),
            filterRecipe = jest.fn(),
            setMsg = jest.fn(),
            setShowModalMsg = jest.fn(),
            recipe = {title: 'Chocotorta', idUser: '1', description: 'Choco especial'};

        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Router>
                    <AddRecipeItem
                        recipeRow={recipeRow}
                        setShowModalAddRecipeRow={setShowModalAddRecipeRow}
                        setRecipeRow={setRecipeRow}
                        filterRecipe={filterRecipe}
                        setMsg={setMsg}
                        setShowModalMsg={setShowModalMsg}
                        recipe={recipe}
                    />
                </Router>
            );
        })

        test('component should render', () => {
            const title = screen.getByText('Agregar Ingrediente')
            expect(title).toBeInTheDocument()
        })
        test('should not pass if statement because empty unit and price', () => {
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

            expect(filterRecipe).toBeCalled()
            expect(filterRecipe).toBeCalledWith({recipeTitle: recipe.title, recipeDescription: recipe.description, ingredient: 'azucar', amount: '100'}, 'add')
            expect(setShowModalAddRecipeRow).toBeCalled()
            expect(setShowModalAddRecipeRow).toBeCalledWith(false)
            expect(setRecipeRow).toBeCalled()
            expect(setRecipeRow).toBeCalledWith({ ingredient: '', amount: 0})
        });
    })
    describe('Update an ingredient', () => {
        let recipeRow = {ingredient: 'azucar', amount: 100},
            setShowModalAddRecipeRow = jest.fn(),
            setRecipeRow = jest.fn(),
            filterRecipe = jest.fn(),
            setMsg = jest.fn(),
            setShowModalMsg = jest.fn(),
            recipe = {title: 'Chocotorta', idUser: '1', description: 'Choco especial'};

        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Router>
                    <AddRecipeItem
                        recipeRow={recipeRow}
                        setShowModalAddRecipeRow={setShowModalAddRecipeRow}
                        setRecipeRow={setRecipeRow}
                        filterRecipe={filterRecipe}
                        setMsg={setMsg}
                        setShowModalMsg={setShowModalMsg}
                        recipe={recipe}
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

            fireEvent.change(amountInput, { target: { value: '200' } })

            fireEvent.click(submitBt)

            expect(filterRecipe).toBeCalled()
            expect(filterRecipe).toBeCalledWith({recipeTitle: recipe.title, recipeDescription: recipe.description, ingredient: 'azucar', amount: '200'}, 'update')
            expect(setShowModalAddRecipeRow).toBeCalled()
            expect(setShowModalAddRecipeRow).toBeCalledWith(false)
            expect(setRecipeRow).toBeCalled()
            expect(setRecipeRow).toBeCalledWith({ ingredient: '', amount: 0})
        });

    })

})
