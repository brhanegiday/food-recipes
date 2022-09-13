import React from 'react';
import Popular from '../../components/Popular';
import Veggie from '../../components/Veggie';

function Home() {
  return (
    <div className='container max-w-6xl mx-auto'>
      <Popular />
      <Veggie />
    </div>
  );
}

export default Home;
