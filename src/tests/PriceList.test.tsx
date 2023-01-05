import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import PriceList from '../components/PriceList';

describe('PriceLista component', () => {
    let setShowModalAddItem = jest.fn(),
        setRowDetails = jest.fn(),
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
        setPriceList = jest.fn(),
        setShowModalDelete = jest.fn(),
        setMsg = jest.fn(),
        setShowModalMsg = jest.fn(),
        user = '1',
        handleAuth = jest.fn(),
        loadOption = false,
        setLoadOption = jest.fn();

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Router>
                <PriceList
                    setShowModalAddItem={setShowModalAddItem}
                    setRowDetails={setRowDetails}
                    priceList={priceList}
                    setPriceList={setPriceList}
                    setShowModalDelete={setShowModalDelete}
                    setMsg={setMsg}
                    setShowModalMsg={setShowModalMsg}
                    user={user}
                    handleAuth={handleAuth}
                    loadOption={loadOption}
                    setLoadOption={setLoadOption}
                />
            </Router>
        );
    })

    test('component should render', () => {
        const title = screen.getByText('Lista de Precios')
        expect(title).toBeInTheDocument()
    });
    test('should toggle from button to input, and input should works', () => {
        const buttonEl = screen.getByText('Buscar ingrediente')

        jest.useFakeTimers()
        fireEvent.click(buttonEl)

        act(() => {
            jest.runOnlyPendingTimers()
            jest.useRealTimers()
        })

        expect(screen.getByPlaceholderText('Nombre ingrediente...')).toBeInTheDocument()
        expect(buttonEl).not.toBeInTheDocument()

        //input works
        const inputEl: HTMLInputElement = screen.getByPlaceholderText('Nombre ingrediente...')

        fireEvent.change(inputEl, {
            target: {
                value: 'Chocotorta'
            }
        })

        expect(inputEl.value).toBe('Chocotorta')
    })
    test('should show add item modal', () => {
        const buttonEl = screen.getByText('Agregar ingrediente')

        fireEvent.click(buttonEl)

        expect(setShowModalAddItem).toBeCalled()
        expect(setShowModalAddItem).toBeCalledWith(true)
    })
    test('should dynamic search works', () => {
        const buttonEl = screen.getByText('Buscar ingrediente')

        jest.useFakeTimers()
        fireEvent.click(buttonEl)

        act(() => {
            jest.runOnlyPendingTimers()
            jest.useRealTimers()
        })

        
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

        expect(screen.getByText('No hay ingredientes')).toBeInTheDocument()
    })
})
