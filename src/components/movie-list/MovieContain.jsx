import React from 'react';
import { Link } from 'react-router-dom';
import { OutlineButton } from '../button/Button';
import MovieList from './MovieList';

const MovieContain = (props) => {
  const { title, link, category, type } = props;

  return (
    <div className="container">
      <div className="section mb-3">
        <div className="section__header mb-2">
          <h2>{`${title}`}</h2>
          <Link to={link}>
            <OutlineButton className='small'>View More</OutlineButton>
          </Link>
        </div>
        <MovieList category={category} type={type} />
      </div>
    </div>
  )
};


export default MovieContain;
