import React from 'react'
import './public.scss';
import unauthorizedImg from'../../assets/images/unauthorized.svg';

type Props = {}

const Unauthorized = (props: Props) => {
  return (
    <div className='unauthorizedWrp'>
      <img src={unauthorizedImg} />
      <h1>No authorization found</h1>
      <h5>This page is not publically available.<br/>
          To access it please login first.
      </h5>
      <button className='btn'>Return to login</button>
    </div>
  )
}

export default Unauthorized