import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import MissingIngredients from '../components/MissingIngredients';

describe('MissingIngredients component', () => {
    let missingIngr = ['Azucar', 'Chocolate', 'Huevos'],
        setShowModalMissingIngr = jest.fn(),
        setShowModalBudget = jest.fn(),
        handleBudget = jest.fn(),
        budget = { title: 'Chocotorta', description: 'Choco especial', idUser: '1' };

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Router>
                <MissingIngredients
                    missingIngr={missingIngr}
                    setShowModalMissingIngr={setShowModalMissingIngr}
                    setShowModalBudget={setShowModalBudget}
                    handleBudget={handleBudget}
                    budget={budget}
                />
            </Router>
        );
    })

    test('component should render', () => {
        const title = screen.getByText('!Faltan ingredientes!')
        expect(title).toBeInTheDocument()
    })
    test('should render the list of missing ingredients', () => {
        const listIngredients = screen.getAllByRole('list').map(p => p.textContent),
            arrayIngredients = missingIngr.map(el => el)

        expect(listIngredients).toStrictEqual(arrayIngredients)
    });
    test('should button close the page and delete the budget because user has to add ingredients in priceList', () => {
        const buttonEl = screen.getByRole('close')

        jest.useFakeTimers()
        fireEvent.click(buttonEl)

        act(() => {
            jest.runOnlyPendingTimers()
            jest.useRealTimers()
        })

        expect(setShowModalBudget).toBeCalled()
        expect(setShowModalBudget).toBeCalledWith(false)
        expect(setShowModalMissingIngr).toBeCalled()
        expect(setShowModalMissingIngr).toBeCalledWith(false)
        expect(handleBudget).toBeCalled()
        expect(handleBudget).toBeCalledWith('delete', budget)
    })
})
