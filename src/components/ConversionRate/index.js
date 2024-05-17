import React, {useState, useEffect} from 'react';
import "./card.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import BASE_URL from '../../Api/base';
import { click } from '@testing-library/user-event/dist/click';

const ConversionRateCard = ({ title, yesterdayData, currentmonthData, lastmonthData, today}) => {

  const [data, setData] = useState(null);
  const [responseResult, setClicks] = useState(0);
  const loggedIn = JSON.parse(localStorage.getItem('userData'));

  const fetchData = async() => {
    try {
      const response = await axios.get(BASE_URL +`conversion/conversionRate?partners_Id=${loggedIn._id}`);
      const resData = await response
      console.log('conversionRate',resData)
      setClicks(resData.data.responseResult);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchData()
  }, []);

  const cardStyle = {
    borderRadius:10, // Border size and color
  };
      
  return (
    <div className="card" style={cardStyle}>
      <div className="card-content">
          <h6>{title}</h6>
          <div className='cardTop'>
            <p>Today</p>
            <p className='counter-total'>{today}</p>
          </div>
        {/* <div className="viewall">
          <Link to="/table">
            View Click
          </Link>
        </div> */}
        
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
            <span>{responseResult}</span>
          </div>
      </div>
    </div>
    </div>
  );
};
export default ConversionRateCard;