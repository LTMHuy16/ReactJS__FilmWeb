import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';
import tmpApi, { category, movieType, tvType } from '../../api/tmdApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay,Pagination,Navigation } from 'swiper';
import './hero-slide.scss';
import Button, { OutlineButton } from '../button/Button';
import Modal, { ModalContent } from '../modal/Modal';

SwiperCore.use([Autoplay,Pagination,Navigation]);


const HeroSlide = (props) => {
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = {_page: 1}

      try {
        const response = await tmpApi.getMovieList(movieType.popular, {params})
        setMovieItems(response.results.slice(0,4));
      }
      catch {
        console.log('Error');
      }
    }
    getMovies();
  }, []);
  
  return (
    <>
      <section id='heroSlide'>
        <Swiper 
          spaceBetween={0} 
          centeredSlides={true} 
          autoplay={{
            "delay": 3000,
            "disableOnInteraction": false
          }} 
          navigation={true} 
          className="hero-slide"
        >
          {
            movieItems.map((item, i) => (
              <SwiperSlide key={i}>
                {
                  ({ isActive }) => (
                    <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} /> 
                  )
                }
              </SwiperSlide>
            ))
          }
        </Swiper>
        
        {
          movieItems.map((item, i) => <TrailerModal key={i} item={item} />) 
        }
      </section>
    </>
  );
};

const HeroSlideItem = props => {
  let history = useHistory();
  const item = props.item;
  const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)


  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`)
    
    try {
      const videos = await tmpApi.getVideos(category.movie, item.id)
      console.log(videos);
      console.log(videos.results[0].key);

      if (videos.results.length > 0) {
        const videoSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
        modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc)
      } 
      else {
        modal.querySelector('.modal__content').innerHTML = 'No trailer for this movie.'
      }
    } catch (error) {
      console.log('Error at setModalActive');
    }
    
    modal.classList.toggle('active');
  }


  return (
    <div 
      className={`hero-slide_item ${props.className}`}
      style={{backgroundImage: `url(${background})`}}
    >
      <div className="hero-slide_item__content container">
        <div className="content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} />
        </div>
        <div className="content__info">
          <h2 className='title'>{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="buttons">
            <Button onClick={() => history.push('/movie/' + item.id)}>
              Watch Now
            </Button>
            <OutlineButton onClick={() => setModalActive()}>
              Watch Trailer
            </OutlineButton>
          </div>
        </div>
      </div>
    </div>
  )
}

const TrailerModal = props => {

  const item = props.item
  const iframeRef = useRef(null)
  const onClose = () => iframeRef.current.setAttribute('src', '')



  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={() => onClose()}>
        <iframe ref={iframeRef} width='100%' height='500' title='Trailer'></iframe>
      </ModalContent>
    </Modal>
  )
}


export default HeroSlide;
