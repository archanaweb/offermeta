import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Card from '../components/Card/index';
import CardConvertion from '../components/Conversion';
import PayoutCard from '../components/Payout';
import RevenueCard from '../components/Revenue';
import ConversionRateCard from '../components/ConversionRate';
// import ProfitCard from '../components/Profit';
import Sidebar2 from '../components/Sidebar2';
import Navbar from '../components/navbar';

const Dashboard = () => {
  return (
    <div className='Container_card'>
      <Sidebar2>
        <Navbar />
        <Container>
          <Row>
            <Col>
              <Card
                title="Click2"
              />
            </Col>
            <Col>
              <CardConvertion
                title="Converstion"
              />
            </Col>
            <Col>
              <PayoutCard
                title="Payout"
              />
            </Col>
            <Col>
              <RevenueCard
                title="Revenue"
              />
            </Col>

          </Row>
          <Row>
            <Col>
              <ConversionRateCard
                title="CR"
              />
            </Col>
            <Col>
              <CardConvertion
                title="Profit"
              />
            </Col>
            <Col>
              {/* <PayoutCard
            title="Payout"
          /> */}
            </Col>
            <Col>
              {/* <RevenueCard
            title="Revenue"
          /> */}
            </Col>

          </Row>
        </Container>
      </Sidebar2>
    </div>
  );
};

export default Dashboard;