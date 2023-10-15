import css from './SearchBar.module.css'

export default function SearchBar({ searchValue, onSearch }) {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className='container'>
      <input
        className={css.search__input}
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Поиск"
      />
    </div>

  )
};