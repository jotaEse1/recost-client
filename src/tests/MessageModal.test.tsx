import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MessageModal from '../components/MessageModal';

describe('MessageModal component', () => {
    let msg = 'Operación exitosa'

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Router>
                <MessageModal
                    msg={msg}
                />
            </Router>
        );
    })

    test('component should render', () => {
        const title = screen.getByText(`${msg}`)
        expect(title).toBeInTheDocument()
    })
})
