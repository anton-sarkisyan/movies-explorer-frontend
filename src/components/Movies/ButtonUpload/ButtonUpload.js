import React from 'react';
import './buttonUpload.css';

const ButtonUpload = ({ handleButtonShowMore }) => (
    <button
      type='button'
      onClick={handleButtonShowMore}
      className='button-upload'>
      <p className='button-upload__text'>
        Ещё
      </p>
    </button>
);

export default ButtonUpload;
