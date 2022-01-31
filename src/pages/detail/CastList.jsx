import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';
import tmpApi from '../../api/tmdApi';

const CastList = props => {

  const { category } = useParams();

  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getCredits = async () => {
      const response = await tmpApi.credits(category, props.id);
      setCasts(response.cast.slice(0, 5));
    }
    getCredits()
  }, [category, props.id]);

  console.log(casts);
  

  return (
    <div className='casts'>
      {
        casts.map((cat, i) => (
          <div key={i} className="casts__item">
            <div className="casts__item__img" style={{backgroundImage: `url(${apiConfig.w500Image(cat.profile_path)})`}}></div>
            <p className="casts__item__name">{cat.name}</p>
          </div>
        ))
      }
    </div>
  );
};

export default CastList;
