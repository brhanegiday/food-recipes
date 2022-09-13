function Card({ recipe }) {
  return (
    <div className='min-h-fit relative'>
      <div className='absolute left-0 top-0 z-1 bg-[rgba(0,0,0,0.4)] w-full rounded-lg h-full'></div>
      <img
        className='w-fit overflow-hidden z-10 object-cover mix-blend-multiply h-52 rounded-lg'
        src={recipe.image}
        alt={recipe.title}
      />
      <p className='absolute bottom-4 font-bold flex w-full mx-auto justify-center z-10 text-sm text-white text-center'>
        {recipe.title}
      </p>
    </div>
  );
}

export default Card;
