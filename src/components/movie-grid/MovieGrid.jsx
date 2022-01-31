import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmpApi, { category, movieType, tvType } from '../../api/tmdApi';
import { OutlineButton } from '../button/Button';
import MovieCard from '../movie-card/MovieCard';
import './movie-grid.scss';
import MovieSearch from './MovieSearch';


const MovieGrid = (props) => {

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const { keyword } = useParams();

  const getListApi = async (response, params) => {
    switch (props.category) {
      case category.movie:
        response = await tmpApi.getMovieList(movieType.upcoming, {params})
        return response;
      default:
        response = await tmpApi.getMovieList(tvType.popular, {params})
        return response;
    }
  }

  useEffect (() => {
    const getList = async () => {
      let response = null;
      if (keyword === undefined) {
        const params = {};
        response = await getListApi(response, params)
      }
      else {
        const params = {
          query: keyword
        }
        response = await tmpApi.search(props.category, {params})
      }

      setItems(response.results);
      setTotalPage(response.total_pages)
    }
    getList()
  }, [props.category, keyword]);

  
  const loadMore = async () => {
    let response = null;
    if (keyword === undefined) {
      const params = {
        page: page + 1
      };
      response = await getListApi(response, params)
    }
    else {
      const params = {
        page: page + 1,
        query: keyword
      }
      response = await tmpApi.search(props.category, {params})
    }

    setItems([...items, ...response.results]);  
    setPage(page + 1)
  }
  
  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={props.category} keyword={keyword} />
      </div>
      <div className='movie-grid'>
        {
          items.map((item, i) => <MovieCard category={props.category} item={item} key={i} />)
        }
      </div>
      {
        page < totalPage ? (
          <div className='movie-grid__loadMore'>
            <OutlineButton className='small'onClick={() => loadMore()}>Load more....</OutlineButton>
          </div>
        ) : null
      }
    </>
    
  );
};

export default MovieGrid;

