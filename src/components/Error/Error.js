import React from 'react';
import './error.css';

const Error = ({ text }) => (
    <span className='error'>
      {text}
    </span>
);

export default Error;
