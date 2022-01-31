import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay,Pagination,Navigation } from 'swiper';
import './movie-list.scss'
import tmpApi, { category } from '../../api/tmdApi';
import apiConfig from '../../api/apiConfig';
import MovieCard from '../movie-card/MovieCard';


const MovieList = (props) => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const getList = async () => {
        let response = null;
        const params = {};
        
        if (props.type !== 'similar') {
          switch (props.category) {
            case category.movie:
              response = await tmpApi.getMovieList(props.type, {params})
              break;
            default:
              response = await tmpApi.getTvList(props.type, {params})
              break;
          }
        }
        else {
          response = await tmpApi.similar(props.category, props.id)
        }
        setItems(response.results)
      }
      getList();
    }
    catch {
      console.log('Error at MovieList GetList');
    }
    

  }, []);
  

  return (
    <div className='movie-list'>
      <Swiper
        spaceBetween={10}
        slidesPerView={'auto'}
        pagination={{
          "type": "progressbar"
        }}
      >
        {
          items.map((item, i) => (
            <SwiperSlide key={i}>
              <MovieCard item={item} category={props.category} />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default MovieList;
