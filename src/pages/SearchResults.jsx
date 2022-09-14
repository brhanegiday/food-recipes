import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';

function SearchResults() {
  const [searchRecipe, setSearchRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { query } = useParams();

  const getRecipes = useCallback(
    (cat) => {
      const check = localStorage.getItem(`cuisine-${query}`);
      if (check) {
        setSearchRecipe(JSON.parse(check));
        setLoading(false);
        setError(null);
      } else {
        fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_Key}&query=${cat}`
        )
          .then((res) => {
            if (!res.ok)
              throw new Error(`This is an HTTP error: ${res.status}`);
            return res.json();
          })
          .then((data) => {
            localStorage.setItem(
              `cuisine-${query}`,
              JSON.stringify(data.results)
            );
            setSearchRecipe(data.results);
            setError(null);
            console.log(data.results);
          })
          .catch((err) => {
            setError(err.message);
            setSearchRecipe(null);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [query]
  );

  useEffect(() => {
    getRecipes(query);
  }, [query, getRecipes]);

  return (
    <div className='py-5'>
      <h1 className='pb-6 text-2xl'>
        <span className='capitalize'>{query}</span> Recipes
      </h1>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-6 gap-x-4 w-full mx-auto'>
        {searchRecipe &&
          searchRecipe.map((recipe) => (
            <Link to={`cuisine/${query}`} key={recipe.id}>
              <img
                className='w-full object-cover overflow-hidden h-52 rounded-lg'
                src={recipe.image}
                alt={recipe.title}
              />
              <p className='font-bold text-sm py-2'>{recipe.title}</p>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default SearchResults;
