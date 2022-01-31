import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import apiConfig from '../../api/apiConfig';
import tmpApi from '../../api/tmdApi';
import CastList from './CastList';
import './detail.scss'


const Details = () => {

  const { category, id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmpApi.detail(category, id, {params: {}})
      setItem(response)
      window.scrollTo(0,0)
    }
    getDetail()
  }, [category, id]);


  console.log(item);

  return (
    <>
      {
        item && (
          <>
            <div className="banner" style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}></div>
            <div className="mb-3 movie-content container">
              <div className="movie-content__poster">
                <div className="movie-content__poster__img" style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}></div>
              </div>
              <div className="movie-content__info">
                <h1 className='title'>{item.title || item.name}</h1>
                <div className="genres">
                  {
                    item.genres.slice(0, 5).map((genre, i) => (
                      <span className='genres__item' key={i}>{genre.name}</span>
                    ))
                  }
                </div>
                <p className="overview">{item.overview}</p>
                <div className="cast">
                  <div className="section__header">
                    <h2>Cats</h2>
                  </div>
                  <CastList id={item.id} />
                </div>
              </div>
            </div>
          </>
        )
      }
    </>
  );
};

export default Details;
