import React from 'react';
import { render, screen } from '@testing-library/react';
import Tooltip from '../components/Tooltip';

describe('Tooltip component', () => {
    let component;

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        component = render(<Tooltip children={'chau'} text={'hola'} />);
    })
    
    test('component renders', () => {
        const tooltip = screen.getByText('hola')
        expect(tooltip).toBeInTheDocument()
    });
    test('renders text', () => {
      const text = screen.getByText('hola');
      expect(text).toHaveTextContent('hola');
    });
    test('renders children', () => {
        const children = screen.getByText('chau');
        expect(children).toHaveTextContent('chau');
    });

})