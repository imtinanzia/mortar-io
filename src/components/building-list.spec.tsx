import { render, screen } from '@testing-library/react';
import BuildingList from './building-list';
import '@testing-library/jest-dom';

describe('BuildingList Component', () => {
  it('renders the component with correct data and styles', () => {
    const coordinate = {
      name: 'Test Building',
      coordinates: [
        {
          latitude: 10,
          longitude: 20,
        },
        {
          latitude: 15,
          longitude: 25,
        },
        {
          latitude: 5,
          longitude: 10,
        },
      ],
    };

    render(<BuildingList coordinate={coordinate} isActive />);

    const buildingName = screen.getByText('Test Building');

    expect(buildingName).toBeInTheDocument();

    const coordinateItems = screen.getAllByRole('listitem');

    expect(coordinateItems).toHaveLength(4);

    const [coordinate1, coordinate2, coordinate3] = coordinate.coordinates;

    expect(
      screen.getByText(
        `Latitude: ${coordinate1.latitude}, Longitude: ${coordinate1.longitude}`
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        `Latitude: ${coordinate2.latitude}, Longitude: ${coordinate2.longitude}`
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        `Latitude: ${coordinate3.latitude}, Longitude: ${coordinate3.longitude}`
      )
    ).toBeInTheDocument();
  });
});
