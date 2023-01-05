import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AddConfirmation from '../components/AddConfirmation';

describe('AddConfirmation component', () => {
    let setShowModalConfirmation = jest.fn(),
        setShowModalAddItem = jest.fn();

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Router>
                <AddConfirmation
                    setShowModalConfirmation={setShowModalConfirmation}
                    setShowModalAddItem={setShowModalAddItem}
                />
            </Router>
        );
    })

    test('component should render', () => {
        const title = screen.getByText('¿Quieres agregarlo?')
        expect(title).toBeInTheDocument()
    })
    test('should add item in price list', () => {
        const buttonEl = screen.getByRole('add')

        fireEvent.click(buttonEl)

        expect(setShowModalConfirmation).toBeCalled()
        expect(setShowModalConfirmation).toBeCalledWith(false)
        expect(setShowModalAddItem).toBeCalled()
        expect(setShowModalAddItem).toBeCalledWith(true)
    })
    test('should not add item in price list', () => {
        const buttonEl = screen.getByRole('cancel')

        fireEvent.click(buttonEl)

        expect(setShowModalConfirmation).toBeCalled()
        expect(setShowModalConfirmation).toBeCalledWith(false)
    })
})
