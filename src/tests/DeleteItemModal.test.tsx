import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import DeleteItemModal from '../components/DeleteItemModal';

describe('DeleteItemModal component', () => {
    let handleList = jest.fn(),
    setShowModalDelete = jest.fn(),
    rowDetails = {item: 'Azucar', unit: 1000, price: 1000},
    setRowDetails = jest.fn();

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Router>
                <DeleteItemModal
                    handleList={handleList}
                    setShowModalDelete={setShowModalDelete}
                    rowDetails={rowDetails}
                    setRowDetails={setRowDetails}
                />
            </Router>
        );
    })

    test('component should render', () => {
        const title = screen.getByText('¿Quieres eliminarlo?')
        expect(title).toBeInTheDocument()
    })
    test('should delete the item', () => {
        const buttonEl = screen.getByRole('delete')

        jest.useFakeTimers()
        fireEvent.click(buttonEl)

        act(() => {
            jest.runOnlyPendingTimers()
            jest.useRealTimers()
        })

        expect(setShowModalDelete).toBeCalled()
        expect(setShowModalDelete).toBeCalledWith(false)
        expect(setRowDetails).toBeCalled()
        expect(setRowDetails).toBeCalledWith({item: '', unit: '', price: ''})
        expect(handleList).toBeCalled()
        expect(handleList).toBeCalledWith(rowDetails, 'delete') 
    })
    test('should not delete the item', () => {
        const buttonEl = screen.getByRole('cancel')

        fireEvent.click(buttonEl)

        expect(setShowModalDelete).toBeCalled()
        expect(setShowModalDelete).toBeCalledWith(false)
        expect(setRowDetails).toBeCalled()
        expect(setRowDetails).toBeCalledWith({item: '', unit: '', price: ''})
    })
})
