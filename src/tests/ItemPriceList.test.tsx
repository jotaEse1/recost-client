import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ItemPriceList from '../components/ItemPriceList';

describe('ItemPriceList component', () => {
    let row = { item: 'Azucar', unit: 100, price: 100 },
        setRowDetails = jest.fn(),
        setShowModalAddItem = jest.fn(),
        setShowModalDelete = jest.fn();

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Router>
                <table>
                    <tbody>
                        <ItemPriceList
                            row={row}
                            setRowDetails={setRowDetails}
                            setShowModalAddItem={setShowModalAddItem}
                            setShowModalDelete={setShowModalDelete}
                            i={1}
                        />
                    </tbody>
                </table>
            </Router>
        );
    })

    test('should component render and text too', () => {
        const item = screen.getByText(`${row.item}`),
            unit = screen.getByText(`${row.unit}gr`),
            price = screen.getByText(`$ ${row.price}`);

        expect(item).toBeInTheDocument()
        expect(unit).toBeInTheDocument()
        expect(price).toBeInTheDocument()
    })
    test('should edit button works', () => {
        const buttonEl = screen.getByRole('edit')

        fireEvent.click(buttonEl)

        expect(setRowDetails).toBeCalled()
        expect(setRowDetails).toBeCalledWith(row)
        expect(setShowModalAddItem).toBeCalled()
    });
    test('should delete button works', () => {
        const buttonEl = screen.getByRole('delete')

        fireEvent.click(buttonEl)

        expect(setRowDetails).toBeCalled()
        expect(setRowDetails).toBeCalledWith(row)
        expect(setShowModalDelete).toBeCalled()
    });
})