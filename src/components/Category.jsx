import { FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { GiNoodles, GiChopsticks } from 'react-icons/gi';
import { GiOpenedFoodCan } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';
import Search from './Search';

function Category() {
  const categories = [
    {
      id: 1,
      Icon: <FaPizzaSlice size={17} color='#BF0916' />,
      text: 'Italian',
      link: '/cuisine/italian',
    },
    {
      id: 2,
      Icon: <FaHamburger size={17} color='#BF0916' />,
      text: 'American',
      link: '/cuisine/american',
    },
    {
      id: 3,
      Icon: <GiNoodles size={17} color='#BF0916' />,
      text: 'Thai',
      link: '/cuisine/thai',
    },
    {
      id: 4,
      Icon: <GiChopsticks size={17} color='#BF0916' />,
      text: 'Chinese',
      link: '/cuisine/chinese',
    },
  ];
  let activeStyle = {
    color: '#BF0916',
  };

  return (
    <div className='flex justify-between items-center pb-10'>
      <NavLink
        className='font-bold flex items-center gap-x-1.5'
        to={'/'}
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        <GiOpenedFoodCan color='#b70916' size={20} />
        <span>Foodie</span>
      </NavLink>
      <Search />
      <div className='flex items-center justify-center pb-5 gap-x-6'>
        {categories.map((cat) => (
          <NavLink
            className='flex items-center gap-x-1'
            key={cat.id}
            to={cat.link}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <div>{cat.Icon}</div>
            <p>{cat.text}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Category;
