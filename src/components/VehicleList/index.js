import React from 'react';
import Card from '../Card';
import useData from './useData';
import './style.scss';

export default function VehicleList() {
  const [loading, error, vehicles] = useData();


  if (loading) {
    return <div data-testid="loading" role="status">Loading</div>;
  }

  if (error) {
    return <div data-testid="error" role="alert">{error}</div>;
  }

  if (!vehicles || vehicles.length === 0) {
    return <div data-testid="no-data">No vehicles available</div>;
  }

  return (
    <section data-testid="results" className='VehicleList'>
      <ul className='VehicleList__grid'>
        {vehicles.map((vehicle) => (
          <li key={vehicle.id}>
            <Card vehicle={vehicle} />
          </li>
        ))}
      </ul>
    </section>
  );
}
