import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigateToTableButton = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/publisher');
  };

  return (
    <div>
      <button onClick={handleNavigate}>Submit</button>
    </div>
  );
};

export default NavigateToTableButton;
