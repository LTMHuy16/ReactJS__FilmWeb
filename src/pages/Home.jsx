import React from 'react';
import { category, movieType, tvType } from '../api/tmdApi';
import HeroSlide from '../components/hero-slide/HeroSlide';
import MovieContain from '../components/movie-list/MovieContain';

function Home() {
  return ( 
    <>
      <HeroSlide />
      <div className="container">
        <MovieContain 
          title='Trending Movies' 
          link='/movie' 
          category={category.movie} 
          type={movieType.popular} 
        />

        <MovieContain 
          title='Top Rated Movies' 
          link='/movie' 
          category={category.movie} 
          type={movieType.top_rated} 
        />

        <MovieContain 
          title='Trending TVs' 
          link='/movie' 
          category={category.tv} 
          type={tvType.popular} 
        />

        <MovieContain 
          title='Top Rated TVs' 
          link='/movie' 
          category={category.tv} 
          type={tvType.top_rated} 
        />
      </div>
    </>
  )
}

export default Home;
