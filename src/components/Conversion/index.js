import React, {useState, useEffect} from 'react';
import "./ctable.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import BASE_URL from '../../Api/base';
import PageTitle from '../PageTitle';
const CardConvertion = ({ title,  yesterdayData, currentmonthData, lastmonthData, today }) => {

  const [data, setData] = useState(null);
  const [clicks, setClicks] = useState(0);
  const [subadminId, setSubAdminId] = useState('');
  const adminId = window.localStorage.getItem('subadminId');
  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL +`conversion/totalConversion?partners_Id=${adminId}`);
      setClicks(response.data.responseResult);
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
      {/* <div className='d-flex justify-content-between align-items-center'>
      <h6>{title}</h6>
      <span>{clicks}</span>
      </div> */}
          <div className='cardTop'>
            <p>Today</p>
            <p className='counter-total'>{today}</p>
          </div>
        {/* <div className="viewall">
          <Link to="/conversion/ctable">
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
            <span className='text-muted'>MTD</span>
            <span>{lastmonthData}</span>
          </div>
      </div>
    </div>
    </div>
  );
};

export default CardConvertion;