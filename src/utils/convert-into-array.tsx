interface Coordinate {
  latitude: number;
  longitude: number;
}

interface ContinentData {
  [continent: string]: Coordinate[];
}

interface FormattedContinent {
  name: string;
  coordinates: Coordinate[];
}

const convertDataToFormat = (data: ContinentData): FormattedContinent[] => {
  const array: FormattedContinent[] = [];

  for (const continent in data) {
    if (data.hasOwnProperty(continent)) {
      const continentObj: FormattedContinent = {
        name: continent,
        coordinates: [],
      };

      for (const coordinatesObj of data[continent]) {
        const coordinate: Coordinate = {
          latitude: coordinatesObj.latitude,
          longitude: coordinatesObj.longitude,
        };

        continentObj.coordinates.push(coordinate);
      }

      array.push(continentObj);
    }
  }

  return array;
};

export type { FormattedContinent, Coordinate, ContinentData };
export default convertDataToFormat;
