import React from 'react'
import { setSearchValue } from '../../redux/slices/filterSlice'
import debounce from 'lodash.debounce'
import { useDispatch } from 'react-redux';
import styles from './Search.module.scss';

const Search: React.FC = () => {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState('');

  const inputRef = React.useRef<HTMLInputElement>(null);

  const updateSearchValue = React.useCallback(debounce((e) => {
    dispatch(setSearchValue(e));
  }, 275), []);


  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('')
    inputRef.current?.focus();
  }

  const onChangeInput  = (e : React.ChangeEvent<HTMLInputElement> ) => {
    setValue(e.target.value)
    updateSearchValue(e.target.value);
  }

  return (
    <div className={styles.root}>

      <svg
        className={styles.icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title /><g data-name="Layer 2" id="Layer_2"><path d="M18,10a8,8,0,1,0-3.1,6.31l6.4,6.4,1.41-1.41-6.4-6.4A8,8,0,0,0,18,10Zm-8,6a6,6,0,1,1,6-6A6,6,0,0,1,10,16Z" /></g>
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder='Поиск пиццы...'
      />
      {
        value && (
          <svg 
            onClick={onClickClear}
            className={styles.clearIcon}
            data-fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="18" x2="6" y1="6" y2="18" />
            <line x1="6" x2="18" y1="6" y2="18" />
          </svg>)}

    </div>

  )
}

export default Search;