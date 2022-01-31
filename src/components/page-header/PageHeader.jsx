import React from 'react';
import './page-header.scss'
import bg from '../../asset/img/bg.png'


function PageHeader(props) {
  return (
    <div 
      className='page-header'
      style={{backgroundImage: `url(${bg})`}}
    >
      <h2>{props.children}</h2>
    </div>
  );
}


export default PageHeader;
