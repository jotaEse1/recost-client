import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RecipeRow from '../components/RecipeRow';
import RecipeMissingIngr from '../components/RecipeMissingIngr';

describe('RecipeMissingIngr component', () => {
    let ingredients = ['Azucar', 'Chocolate', 'Menta'],
        setShowModalMissingIngrRecipe = jest.fn();

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Router>
                <RecipeMissingIngr
                    missingIngrRecipe={ingredients}
                    setShowModalMissingIngrRecipe={setShowModalMissingIngrRecipe}
                />
            </Router>
        );
    })

    test('component should render', () => {
        const title = screen.getByText('!Faltan ingredientes!')
        expect(title).toBeInTheDocument()
    });
    test('should list render', () => {
        const listedIngredients = screen.getAllByRole('list').map(div => div.textContent),
            arrayIngredients = ingredients.map(ing => ing);
        
        expect(listedIngredients).toEqual(arrayIngredients)
    })
    
    test('should close button works', () => {
        const buttonEl = screen.getByRole('close')

        fireEvent.click(buttonEl)

        expect(setShowModalMissingIngrRecipe).toBeCalled()
    });
    
})