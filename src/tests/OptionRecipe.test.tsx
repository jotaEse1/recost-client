import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import OptionRecipe from '../components/OptionRecipe';

describe('OptionRecipe component', () => {
    describe('When datas ingredient has ingredients', () => {
        let data = {
            title: 'Chocotorta',
            idUser: '1',
            description: 'Choco especial',
            ingredients: [
                { ingredient: 'Azucar', amount: 1000, cost: 1000 },
                { ingredient: 'Chocolate', amount: 1000, cost: 1000 },
                { ingredient: 'Huevos', amount: 1000, cost: 1000 }
            ]
        },
            setRecipeChoosen = jest.fn(),
            id = '1',
            selected = '2',
            setSelected = jest.fn();
    
        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Router>
                    <OptionRecipe
                        data={data}
                        setRecipeChoosen={setRecipeChoosen}
                        id={id}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </Router>
            );
        })
    
        test('component should render', () => {
            const title = screen.getByText(`${data.title}`)
            expect(title).toBeInTheDocument()
        })
        test('should select the recipe', () => {
            const pressableDiv = screen.getByRole('pressable')
    
            fireEvent.click(pressableDiv)
    
            expect(setRecipeChoosen).toBeCalled()
            expect(setRecipeChoosen).toBeCalledWith(data)
            expect(setSelected).toBeCalled()
            expect(setSelected).toBeCalledWith(id)
    
        })
        test('should show the recipe when press the button and close again', () => {
            const openButtonEl = screen.getByRole('open')
    
            fireEvent.click(openButtonEl)
    
            const component = screen.getByText('Ingrediente');
    
            expect(component).toBeInTheDocument()
    
            const closeButtonEl = screen.getByRole('close')
    
            fireEvent.click(closeButtonEl)
    
            expect(component).not.toBeInTheDocument()
    
        });
        test('should render list of ingredients', () => {
            const openButtonEl = screen.getByRole('open')
            fireEvent.click(openButtonEl)
    
            const listIngredients = screen.getAllByRole('list').map(td => td.textContent),
                listArr = data.ingredients.map(ingr => ingr.ingredient)
                
            expect(listIngredients).toStrictEqual(listArr)
    
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
        test('should not save recipe', () => {
            const buttonEl = screen.getByRole('cancel')
    
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
            expect(filterRecipe).toBeCalledWith({ ingredient: '', amount: 0 }, 'not-save-recipe')
        })*/
    })
    describe('When datas ingredient has no ingredients', () => {
        let data = {
            title: 'Chocotorta',
            idUser: '1',
            description: 'Choco especial',
            ingredients: []
        },
            setRecipeChoosen = jest.fn(),
            id = '1',
            selected = '2',
            setSelected = jest.fn();
    
        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Router>
                    <OptionRecipe
                        data={data}
                        setRecipeChoosen={setRecipeChoosen}
                        id={id}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </Router>
            );
        })
    
        test('component should render', () => {
            const title = screen.getByText(`${data.title}`)
            expect(title).toBeInTheDocument()
        })
        test('should render No hay ingredients because of empty array', () => {
            const openButtonEl = screen.getByRole('open')
            fireEvent.click(openButtonEl)
    
            const title = screen.getByText('No hay ingredientes')
                
            expect(title).toBeInTheDocument()
    
        })
    })
    describe('When datas ingredient is null', () => {
        let data = {
            title: 'Chocotorta',
            idUser: '1',
            description: 'Choco especial',
            ingredients: null
        },
            setRecipeChoosen = jest.fn(),
            id = '1',
            selected = '2',
            setSelected = jest.fn();
    
        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Router>
                    <OptionRecipe
                        data={data}
                        setRecipeChoosen={setRecipeChoosen}
                        id={id}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </Router>
            );
        })
    
        test('component should render', () => {
            const title = screen.getByText(`${data.title}`)
            expect(title).toBeInTheDocument()
        })
        test('should render No hay ingredients because of null', () => {
            const openButtonEl = screen.getByRole('open')
            fireEvent.click(openButtonEl)
    
            const title = screen.getByText('No hay ingredientes')
                
            expect(title).toBeInTheDocument()
        })
    })
})


