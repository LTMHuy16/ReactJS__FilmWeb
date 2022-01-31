import React from 'react';
import { Link } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';
import Button from '../button/Button';
import { BiMoviePlay } from "react-icons/bi";
import './movie-card.scss';


const  MovieCard = props => {

  const item = props.item;
  const link = `/${props.category}/${item.id}`
  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
  
  
  return (
    <Link to={link}>
      <div className="movie-card"
        style={{backgroundImage: `url(${bg})`}}
      >
        <Button>
          <BiMoviePlay />
        </Button>
      </div>
      <h5>{item.title || item.name}</h5>
    </Link>
  )
}

export default MovieCard;
