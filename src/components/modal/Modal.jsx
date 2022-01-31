import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './modal.scss'
import { BiX } from "react-icons/bi";


function Modal (props) {

  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(props.active)
  }, [props.active]);

  return (
    <div id={props.id} className={`modal ${active ? 'active' : ''}`}>
      {props.children}
    </div>
  )
}

Modal.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string
};


/* ============ ModalContent =============== */

export function ModalContent (props) {
  const contentRef = useRef(null);

  const closeModal = () => {
    contentRef.current.parentNode.classList.remove('active')
    if(props.onClose) props.onClose()
  }

  return (
    <div ref={contentRef} className='modal__content'>
      {props.children}
      <div 
        className="modal__content-close"
        onClick={closeModal}
      >
        <BiX />
      </div>
    </div>
  )
}

ModalContent.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string
};


export default Modal;
