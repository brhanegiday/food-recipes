import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

function RecipeDetail() {
  const [recipeDetail, setRecipeDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState('instructions');

  const params = useParams();
  const id = Number(params.id);

  const getRecipeDetail = useCallback(() => {
    const check = localStorage.getItem(id);
    if (check) {
      setRecipeDetail(JSON.parse(check));
      setLoading(false);
      setError(null);
    } else {
      fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_Key}`
      )
        .then((res) => {
          if (!res.ok) throw new Error(`This is an HTTP error: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          localStorage.setItem(id, JSON.stringify(data));
          setRecipeDetail(data);
          setError(null);
          console.log(data);
        })
        .catch((err) => {
          setError(err.message);
          setRecipeDetail(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    getRecipeDetail();
  }, [id, getRecipeDetail]);
  console.log('recipeDetail', recipeDetail);

  return (
    <motion.div
      className='py-5'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-10'>
        <div>
          <h2 className='font-semibold text-2xl pb-4'>{recipeDetail.title}</h2>
          <img
            className='w-full object-cover overflow-hidden h-[30rem] rounded-lg'
            src={recipeDetail.image}
            alt={recipeDetail.title}
          />
        </div>
        <div className='w-full pt-10 lg:py-0 lg:w-5/6 mx-auto'>
          <div className='flex gap-x-5 items-center pb-5'>
            <button
              className={`rounded-md ${
                activeTab === 'instructions'
                  ? 'bg-[#BF0916] text-white'
                  : 'bg-white0'
              }  border-2 py-2 px-5 font-semibold`}
              onClick={() => setActiveTab('instructions')}
            >
              Instructions
            </button>
            <button
              className={`rounded-md ${
                activeTab === 'ingredients'
                  ? 'bg-[#BF0916] text-white'
                  : 'bg-white0'
              }  border-2 py-2 px-5 font-semibold`}
              onClick={() => setActiveTab('ingredients')}
            >
              Ingredients
            </button>
          </div>
          {activeTab === 'instructions' && (
            <div>
              <h3
                dangerouslySetInnerHTML={{ __html: recipeDetail.summary }}
              ></h3>
              <h3
                className='py-4'
                dangerouslySetInnerHTML={{ __html: recipeDetail.summary }}
              ></h3>
            </div>
          )}
          {activeTab === 'ingredients' && (
            <ul className='px-5'>
              {recipeDetail &&
                recipeDetail.extendedIngredients.map((recipe) => (
                  <li type='disc' key={recipe.id}>
                    {recipe.original}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default RecipeDetail;
