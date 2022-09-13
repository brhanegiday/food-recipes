import { useState, useEffect } from 'react';
import Card from './Card';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

function Veggie() {
  const [veggie, setVeggieRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getVeggieRecipes = () => {
    const check = localStorage.getItem('veggie');
    if (check) {
      setVeggieRecipes(JSON.parse(check));
      setLoading(false);
      setError(null);
    } else {
      fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_Key}&number=20&tags=vegetarian`
      )
        .then((res) => {
          if (!res.ok) throw new Error(`This is an HTTP error: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          localStorage.setItem('veggie', JSON.stringify(data.recipes));
          setVeggieRecipes(data.recipes);
          setError(null);
          console.log(data.recipes);
        })
        .catch((err) => {
          setError(err.message);
          setVeggieRecipes(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    getVeggieRecipes();
  }, []);

  return (
    <div className='py-10'>
      <h1 className='pb-6 text-2xl'>Vegetarian picks</h1>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <Splide
        options={{
          perPage: 4,
          gap: '1rem',
          arrows: false,
          pagination: false,
          drag: 'free',
          breakpoints: {
            640: {
              perPage: 2,
            },
            950: {
              perPage: 3,
            },
          },
        }}
      >
        {veggie &&
          veggie.map((recipe) => (
            <SplideSlide key={recipe.id}>
              <Card recipe={recipe} />
            </SplideSlide>
          ))}
      </Splide>
    </div>
  );
}

export default Veggie;
