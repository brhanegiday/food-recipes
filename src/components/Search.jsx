import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.length > 2) {
      navigate('search/' + searchTerm);
    }
    setSearchTerm('');
  };
  return (
    <form
      className='relative justify-center mx-auto flex items-center w-fit'
      onSubmit={handleSearch}
    >
      <div className='absolute right-2 cursor-pointer'>
        <BiSearch color='' size={23} onClick={handleSearch} />
      </div>

      {searchTerm.length > 0 && (
        <div className='absolute right-10 cursor-pointer'>
          <MdClose color='' size={17} onClick={() => setSearchTerm('')} />
        </div>
      )}
      <input
        className='w-[25rem] rounded-md pl-3 py-2 border border-gray-500'
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
}

export default Search;
