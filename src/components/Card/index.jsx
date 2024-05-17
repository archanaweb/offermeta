import React from 'react';
import './card.css';
import { Spinner } from 'react-bootstrap';
import cardIcon from '../../assets/images/trend.png'

const Card = ({ title, yesterdayData, currentmonthData, lastmonthData ,today, loading}) => {
  
  const cardStyle = {
    borderRadius: 10, // Border size and color
  };
  return (
    <div className="card" style={cardStyle}>
      <div className="card-content">
        <div className='d-flex justify-content-between align-items-center'>
          <h6>{title}</h6>
          {title === 'Revenue' ?  <span className='card-currency'>USD</span> : title === 'Payout' ?  <span className='card-currency'>USD</span> : title === 'Profit' ?  <span className='card-currency'>USD</span> : <img src={cardIcon} alt='growthIcon' width={30} />}
          </div>
          <div className='cardTop'>
            <p>Today</p>
           { 
        loading ? <div className='spinner'>
    </div>:  <p className='counter-total'>{today}</p>}
          </div>
        <hr />
        <div className='cardBottom'>
          <div className='cardBottomItem'>
            <span className='text-muted'>Yesterday</span>
            <span>{yesterdayData}</span>
          </div>
          <div className='cardBottomItem'>
            <span className='text-muted'>This Week</span>
            <span>{currentmonthData}</span>
          </div>
          <div className='cardBottomItem'>
            <span className='text-muted'> MTD</span>
            <span>{lastmonthData}</span>
          </div>
      </div>
    </div>
    </div>
  );
};

export default Card;
