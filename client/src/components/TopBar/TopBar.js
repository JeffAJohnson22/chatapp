import React from 'react'
import './TopBar.css'


import closeIcon from '../../icons/closeIcon.png'
import online from '../../icons/onlineIcon.png'


const TopBar = ({room}) => (
    <div className='topBar'>
      <div className='left'>
        <img className='onlineIcon' alt='online icon' src={online}/>
        <h3>{room}</h3>
      </div>
      <div className='right'>
          <a href='/'><img alt ='close icon' src={closeIcon}/></a>
      </div>
    </div>
  )


export default TopBar
