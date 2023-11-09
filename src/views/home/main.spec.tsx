import { useCordinates } from '../../hooks';
import Main from './main'; // Adjust the import path as needed
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('../../hooks', () => ({
  useCordinates: jest.fn(),
}));

describe('Main component', () => {
  it('renders loading message when loading is true', () => {
    (useCordinates as jest.Mock).mockReturnValue({
      coordinates: [],
      currentIndex: 0,
      loading: true,
      error: '',
      jumpToNextBuilding: jest.fn(),
      refreshCoordinates: jest.fn(),
    });

    render(<Main />);
    const loadingMessage = screen.getByText('Loading....');
    expect(loadingMessage).toBeInTheDocument();
  });

  it('renders error message and retry button when there is an error', () => {
    (useCordinates as jest.Mock).mockReturnValue({
      coordinates: [],
      currentIndex: 0,
      loading: false,
      error: 'Something went wrong',
      jumpToNextBuilding: jest.fn(),
      refreshCoordinates: jest.fn(),
    });

    render(<Main />);

    const errorMessage = screen.getByText('Something went wrong');
    const retryButton = screen.getByText('Try Again');

    expect(errorMessage).toBeInTheDocument();
    expect(retryButton).toBeInTheDocument();
  });

  it('renders the component with coordinates and buttons', () => {
    (useCordinates as jest.Mock).mockReturnValue({
      coordinates: [],
      currentIndex: 0,
      loading: false,
      error: '',
      jumpToNextBuilding: jest.fn(),
      refreshCoordinates: jest.fn(),
    });

    render(<Main />);

    const coordinatesVisualization = screen.getByText(
      'Coordinates Visualization'
    );
    expect(coordinatesVisualization).toBeInTheDocument();
  });

  it('clicking the "Jump to Next Building" button invokes jumpToNextBuilding', () => {
    const jumpToNextBuilding = jest.fn();

    (useCordinates as jest.Mock).mockReturnValue({
      coordinates: [],
      currentIndex: 0,
      loading: false,
      error: '',
      jumpToNextBuilding,
      refreshCoordinates: jest.fn(),
    });

    render(<Main />);
    const jumpButton = screen.getByText('Jump to Next Building');

    fireEvent.click(jumpButton);

    expect(jumpToNextBuilding).toHaveBeenCalledTimes(1);
  });
});
