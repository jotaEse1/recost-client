import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AddItemModal from '../components/AddItemModal';
import { act } from 'react-dom/test-utils';

describe('AddItemModal component', () => {
    describe('Add a new ingredient', () => {
        let setShowModalAddItem = jest.fn(),
            rowDetails = { item: '', unit: 0, price: 0 },
            setRowDetails = jest.fn(),
            handleList = jest.fn(),
            setMsg = jest.fn(),
            setShowModalMsg = jest.fn();

        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Router>
                    <AddItemModal
                        setShowModalAddItem={setShowModalAddItem}
                        rowDetails={rowDetails}
                        setRowDetails={setRowDetails}
                        handleList={handleList}
                        setMsg={setMsg}
                        setShowModalMsg={setShowModalMsg}
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
                priceInput: HTMLInputElement = screen.getByLabelText('Precio'),
                submitBt = screen.getByText('Agregar');

            fireEvent.change(ingredientInput, { target: { value: 'azucar' } })
            fireEvent.change(amountInput, { target: { value: '100' } })
            fireEvent.change(priceInput, { target: { value: '100' } })

            jest.useFakeTimers()
            fireEvent.click(submitBt)

            act(() => {
                jest.runOnlyPendingTimers()
                jest.useRealTimers()
            })

            expect(handleList).toBeCalled()
            expect(handleList).toBeCalledWith({ item: 'azucar', unit: '100', price: '100' }, 'new')
            expect(setShowModalAddItem).toBeCalled()
            expect(setShowModalAddItem).toBeCalledWith(false)
            expect(setRowDetails).toBeCalled()
            expect(setRowDetails).toBeCalledWith({ item: '', unit: '', price: '' })
        });
    })
    describe('Update an ingredient', () => {
        let setShowModalAddItem = jest.fn(),
            rowDetails = { item: 'azucar', unit: 100, price: 100 },
            setRowDetails = jest.fn(),
            handleList = jest.fn(),
            setMsg = jest.fn(),
            setShowModalMsg = jest.fn();

        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <Router>
                    <AddItemModal
                        setShowModalAddItem={setShowModalAddItem}
                        rowDetails={rowDetails}
                        setRowDetails={setRowDetails}
                        handleList={handleList}
                        setMsg={setMsg}
                        setShowModalMsg={setShowModalMsg}
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
                priceInput: HTMLInputElement = screen.getByLabelText('Precio'),
                submitBt = screen.getByText('Modificar');

            fireEvent.change(amountInput, { target: { value: '200' } })
            fireEvent.change(priceInput, { target: { value: '200' } })

            jest.useFakeTimers()
            fireEvent.click(submitBt)

            act(() => {
                jest.runOnlyPendingTimers()
                jest.useRealTimers()
            })

            expect(handleList).toBeCalled()
            expect(handleList).toBeCalledWith({ item: 'azucar', unit: '200', price: '200' }, 'update')
            expect(setShowModalAddItem).toBeCalled()
            expect(setShowModalAddItem).toBeCalledWith(false)
            expect(setRowDetails).toBeCalled()
            expect(setRowDetails).toBeCalledWith({ item: '', unit: '', price: '' })
        });

    })

})
