import React, {useState, useEffect} from 'react';
import "./revenue.css";
import axios from 'axios';
import BASE_URL from '../../Api/base';
import { Link } from 'react-router-dom';

const RevenueCard = ({ title, yesterdayData, currentmonthData, today }) => {

  // const [data, setData] = useState(null);
  const [responseResult, setClicks] = useState(0);
  const adminId = window.localStorage.getItem('subadminId');
  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL + `conversion/totalRevenue?partners_Id=${adminId}`)
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
  const labelValueStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 12,
    fontFamily: 'sans-serif',
    marginTop: '-10px',
    marginLeft: '10px'
  };

  const valueStyle = {
    marginLeft: '80px'
  };
  const titleBoxStyle = {
    backgroundColor: 'rgb(209 207 207)', // Add your preferred background color
    padding: '6px', // Add padding around the title
    borderRadius: '0px', // Add rounded corners
  };
  const titleContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:'-15px',
    marginLeft:'5px' 
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
            <span className='text-muted'>MTD</span>
            <span>${responseResult}</span>
          </div>
      </div>
    </div>
    </div>
  );
};
export default RevenueCard;