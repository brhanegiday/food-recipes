import { useState, useEffect } from 'react';
import Card from './Card';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

function Popular() {
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPopularRecipes = () => {
    const check = localStorage.getItem('popular');
    if (check) {
      setPopularRecipes(JSON.parse(check));
      setLoading(false);
      setError(null);
    } else {
      fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_Key}&number=20`
      )
        .then((res) => {
          if (!res.ok) throw new Error(`This is an HTTP error: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          localStorage.setItem('popular', JSON.stringify(data.recipes));
          setPopularRecipes(data.recipes);
          setError(null);
          console.log(data.recipes);
        })
        .catch((err) => {
          setError(err.message);
          setPopularRecipes(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    getPopularRecipes();
  }, []);

  return (
    <div>
      <h1 className='pb-6 text-2xl'>Popular picks</h1>
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
        {popularRecipes &&
          popularRecipes.map((recipe) => (
            <SplideSlide key={recipe.id}>
              <Card recipe={recipe} />
            </SplideSlide>
          ))}
      </Splide>
    </div>
  );
}

export default Popular;
