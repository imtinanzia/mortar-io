import React from 'react';
import { BuildingList } from '../../components';
import { useCordinates } from '../../hooks';
import type { FormattedContinent } from '../../utils';

const Main = () => {
  const {
    coordinates,
    currentIndex,
    loading,
    error,
    jumpToNextBuilding,
    refreshCoordinates,
  } = useCordinates();

  if (loading) {
    return <h1>Loading....</h1>;
  }

  if (error) {
    return (
      <React.Fragment>
        <h1>Something went wrong</h1>
        <button onClick={refreshCoordinates}>Try Again</button>
      </React.Fragment>
    );
  }

  return (
    <div>
      <h1>Coordinates Visualization</h1>
      <button onClick={jumpToNextBuilding}>Jump to Next Building</button>
      <ul>
        {coordinates?.map((cordiante: FormattedContinent, index: number) => {
          return (
            <BuildingList
              key={cordiante?.name}
              coordinate={cordiante}
              isActive={index === currentIndex}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Main;
