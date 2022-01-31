import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { BiSearch } from "react-icons/bi";
import { category } from '../../api/tmdApi';
import { OutlineButton } from '../button/Button';
import Input from '../input/Input';
import './movie-search.scss'



const MovieSearch = (props) => {

   const history = useHistory();
   const [keyword, setKeyWord] = useState(props.keyword ? props.keyword : '');

   const goToSearch = useCallback(() => {
      if (keyword.trim().length > 0) {
         history.push(`/${category[props.category]}/search/${keyword}`)
      }
   },[keyword, props.category, history]);

   const searchByClick = () => {
      goToSearch()
   }


   useEffect(() => {
      const enterEvent = (e) => {
         e.preventDefault();
         if (e.keyCode == 13) {
            goToSearch()
         }
      }
      document.addEventListener('keyup', enterEvent)

      return () => {
         document.removeEventListener('keyup', enterEvent);
      };

   }, [keyword, goToSearch]);
   
   
   return (
      <div className='movie-search'>
         <Input
            type='text'
            placeholder='Enter keyword ...'
            value={keyword}
            onChange={e => setKeyWord(e.target.value)}
         />
         <OutlineButton onClick={searchByClick}>
            <BiSearch />
         </OutlineButton>
      </div>
   );
};

export default MovieSearch;
