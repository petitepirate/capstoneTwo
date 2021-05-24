import React from 'react';
import { render } from '@testing-library/react';
import Books from './BookShelf';

it('matches snapshot', function() {
	const { asFragment } = render(<Books />);
	expect(asFragment()).toMatchSnapshot();
});
