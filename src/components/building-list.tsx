import React from 'react';
import type { FormattedContinent, Coordinate } from '../utils';

interface ListProps {
  coordinate: FormattedContinent;
  isActive?: boolean;
}

interface CoordinateProps extends Coordinate {
  color: string;
}
const Coordinates = ({
  latitude,
  longitude,
  color,
}: CoordinateProps): JSX.Element => {
  return (
    <li style={{ backgroundColor: color }}>
      Latitude: {latitude}, Longitude: {longitude}
    </li>
  );
};

const BuildingList = ({ coordinate, isActive }: ListProps): JSX.Element => {
  const sortedCoordinates = [...(coordinate?.coordinates || [])].sort(
    (a, b) => {
      return a.latitude - b.latitude;
    }
  );

  const backgroundColor = isActive ? 'blue' : 'transparent';

  return (
    <li style={{ backgroundColor: backgroundColor }}>
      {coordinate?.name}
      <ul>
        {sortedCoordinates?.map((item: Coordinate, index: number) => {
          let backgroundColor = 'orange';

          if (index === 0) {
            backgroundColor = 'red'; // Smallest (first) item
          } else if (index === sortedCoordinates.length - 1) {
            backgroundColor = 'green'; // Largest (last) item
          }

          return (
            <Coordinates
              key={item.latitude + index}
              {...item}
              color={backgroundColor}
            />
          );
        })}
      </ul>
    </li>
  );
};

export default BuildingList;
