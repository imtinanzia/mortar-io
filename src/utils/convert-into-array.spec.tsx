import convertDataToFormat, {
  ContinentData,
  FormattedContinent,
} from './convert-into-array';

describe('convertDataToFormat', () => {
  it('should convert ContinentData to FormattedContinent', () => {
    const continentData: ContinentData = {
      Europe: [
        {
          latitude: 1,
          longitude: 2,
        },
        {
          latitude: 3,
          longitude: 4,
        },
      ],
      Asia: [
        {
          latitude: 5,
          longitude: 6,
        },
        {
          latitude: 7,
          longitude: 8,
        },
      ],
    };

    const expectedFormattedData: FormattedContinent[] = [
      {
        name: 'Europe',
        coordinates: [
          {
            latitude: 1,
            longitude: 2,
          },
          {
            latitude: 3,
            longitude: 4,
          },
        ],
      },
      {
        name: 'Asia',
        coordinates: [
          {
            latitude: 5,
            longitude: 6,
          },
          {
            latitude: 7,
            longitude: 8,
          },
        ],
      },
    ];

    const formattedData = convertDataToFormat(continentData);

    expect(formattedData).toEqual(expectedFormattedData);
  });
});
