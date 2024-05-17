import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTotalProfit } from '../../Redux/ProfitSlice';
import axios from 'axios';
import BASE_URL from '../../Api/base';

const TotalProfit = ({ title, yesterdayData, currentmonthData , today}) => {

  const profit = useSelector((state)=> state.profit.total)
  const LoggedInUser = JSON.parse(localStorage.getItem('userData'));

  const dispatch = useDispatch()
  
  const [responseResult, setClicks] = useState(0);
  const adminId = window.localStorage.getItem('subadminId');
  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL + `conversion/totalProfit?partners_Id=${adminId}`);
      setClicks(response.data.responseResult.$);
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
          <span>${responseResult}</span>
        </div>
    </div>
      </div>
    </div>
  );
};
export default TotalProfit;