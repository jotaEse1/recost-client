import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RecipeListHelper from '../components/RecipeListHelper';

describe('RecipeListHelper component', () => {
    let list = [
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
        setShowModalPriceList = jest.fn();

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Router>
                <RecipeListHelper
                    priceList={list}
                    setShowModalPriceList={setShowModalPriceList}
                />
            </Router>
        );
    })

    test('component should render', () => {
        const title = screen.getByText('Lista de Precios')
        expect(title).toBeInTheDocument()
    });
    test('should input works', () => {
        const inputEl: HTMLInputElement = screen.getByPlaceholderText('Nombre ingrediente...')

        fireEvent.change(inputEl, {
            target: {
                value: 'Azucar'
            }
        })

        expect(inputEl.value).toBe('Azucar')
        expect(inputEl.value).not.toBe('Azucarrrrr')
    })
    test('should dynamic search works', () => {
        const inputEl: HTMLInputElement = screen.getByPlaceholderText('Nombre ingrediente...')

        fireEvent.change(inputEl, {
            target: {
                value: 'Z'
            }
        })

        expect(screen.getByText('Za')).toBeInTheDocument()
        expect(screen.getByText('Zal')).toBeInTheDocument()
        expect(screen.getByText('Zekuni')).toBeInTheDocument()
        expect(screen.getByText('Zikuni')).toBeInTheDocument()
        expect(screen.getByText('Zukuni')).toBeInTheDocument()
        expect(screen.queryByText('Azucar')).not.toBeInTheDocument()
        expect(screen.queryByText('Chocolate')).not.toBeInTheDocument()

        fireEvent.change(inputEl, {
            target: {
                value: 'Za'
            }
        })

        expect(screen.getByText('Za')).toBeInTheDocument()
        expect(screen.queryByText('Azucar')).not.toBeInTheDocument()
        expect(screen.queryByText('Chocolate')).not.toBeInTheDocument()

        fireEvent.change(inputEl, {
            target: {
                value: 'ZACACACASSCACASCSAC'
            }
        })

        expect(screen.getByText('No hay ingredientes')).toBeInTheDocument()
    });
    test('should close the page', () => {
        const buttonEl = screen.getByRole('close')

        fireEvent.click(buttonEl)

        expect(setShowModalPriceList).toBeCalled()
    })

})