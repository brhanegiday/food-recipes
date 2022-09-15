import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { cuisineId } = useParams();

  const getCuisine = useCallback(
    (cat) => {
      const check = localStorage.getItem(`cuisine-${cuisineId}`);
      if (check) {
        setCuisine(JSON.parse(check));
        setLoading(false);
        setError(null);
      } else {
        fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_Key}&cuisine=${cat}`
        )
          .then((res) => {
            if (!res.ok)
              throw new Error(`This is an HTTP error: ${res.status}`);
            return res.json();
          })
          .then((data) => {
            localStorage.setItem(
              `cuisine-${cuisineId}`,
              JSON.stringify(data.results)
            );
            setCuisine(data.results);
            setError(null);
            console.log(data.results);
          })
          .catch((err) => {
            setError(err.message);
            setCuisine(null);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [cuisineId]
  );

  useEffect(() => {
    getCuisine(cuisineId);
  }, [cuisineId, getCuisine]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className='pb-6 text-2xl'>
        <span className='capitalize'>{cuisineId}</span> Cuisine
      </h1>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-6 gap-x-4 w-full mx-auto'>
        {cuisine &&
          cuisine.map((recipe) => (
            <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
              <img
                className='w-full object-cover h-52 rounded-lg'
                src={recipe.image}
                alt={recipe.title}
              />
              <p className='font-bold text-sm py-2'>{recipe.title}</p>
            </Link>
          ))}
      </div>
    </motion.div>
  );
}

export default Cuisine;
