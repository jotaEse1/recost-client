import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Option from '../components/Option';

describe('Option component', () => {
    let title = 'Recipes', description = 'Aquí podras ver tus recetas'

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Router>
                <Option
                    title={title} 
                    description={description}
                />
            </Router>
        );
    })

    test('component should render', () => {
        const title1 = screen.getByText(`${title}`),
        description1 = screen.getByText(`${description}`);

        expect(title1).toBeInTheDocument()
        expect(description1).toBeInTheDocument()
    })
})
