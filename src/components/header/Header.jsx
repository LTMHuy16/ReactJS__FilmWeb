import React, { useEffect, useRef } from 'react';
import './header.scss';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../asset/img/logo.png'


const headerNav = [
  {
    display: 'Home',
    path: '/'
  },
  {
    display: 'Movies',
    path: '/movie'
  },
  {
    display: 'Tv Series',
    path: '/tv'
  }
]

const Header = () => {

  const { pathName } = useLocation();
  const headerRef = useRef(null)

  const active = headerNav.findIndex(e => e.path === pathName)
  
  useEffect(() => {
    const shrinkHeader = () => {
      if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        headerRef.current.classList.add('shrink')
      } else {
        headerRef.current.classList.remove('shrink')
      }
    }
    window.addEventListener('scroll', shrinkHeader)

    return () => {
      window.removeEventListener('scroll', shrinkHeader)
    }
  }, []);
  

  return (
    <div ref={headerRef} className='header'>
      <div className="header__wrapper container">

        <div className="logo">
          <img src={logo} alt="" />
          <Link to="/">Movies</Link>
        </div>

        <ul className="header__nav">
          {
            headerNav.map((item, i) => (
              <li key={i} className={`${i === active ? 'active' : ''}`}>
                <Link to={item.path}>
                  {item.display}
                </Link>
              </li>
            ))
          }
        </ul>

      </div>
    </div>
  )
  ;
};

export default Header;
