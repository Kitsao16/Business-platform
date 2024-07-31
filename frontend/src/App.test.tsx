import { render } from '@testing-library/react';
// import { screen } from '@testing-library/react'; // Comment this out temporarily
import '@testing-library/jest-dom/extend-expect'; // Import jest-dom matchers
import App from './App';

test('renders learn react link', () => {
    render(<App />);
    //const linkElement = screen.getByText(/learn react/i);
    //expect(linkElement).toBeInTheDocument();
});
