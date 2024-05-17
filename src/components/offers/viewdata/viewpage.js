import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import BoxComponent from './box1';
import BoxComponent1 from './box2';
import BoxComponent2 from './box3';
import Revenue from "./revenue/goal";
import BASE_URL from "../../../Api/base";
import { Link } from 'react-router-dom';
import Sidebar from "../../Sidebar";
import Navbar from "../../navbar";
import { useLocation } from "react-router-dom";
import PageTitle from "../../PageTitle";

const StaticTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [subadminId, setSubAdminId] = useState('');
    const location = useLocation();
    const adminId = window.localStorage.getItem('subadminId')
    const [clickData, setClickData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(BASE_URL + `offer/offerList?partners_Id=${adminId}`);
            const data = response.data.responseResult; // Access the responseResult property
            setClickData(data);
            console.log("===============================>42", data);
        } catch (error) {
            console.error('Error fetching click data:', error);
        }
    };

    useEffect(() => {
        const storedSubAdminId = localStorage.getItem('subadminId');
        setSubAdminId(storedSubAdminId);
        console.log('Stored SubAdminId:', storedSubAdminId);

    }, []);

    useEffect(() => {
        fetchData();
    }, []);;

    return (
        <div className='Container_card'>
            <Sidebar>
                <Navbar />
                <div className='page_sec'>
          <PageTitle />
                <Container>
                    <Row>
                        <Col>
                            <BoxComponent />
                            <Revenue />
                            <BoxComponent1 />
                        </Col>
                        <Col>
                            <BoxComponent2 />
                        </Col>
                    </Row>
                </Container>
                </div>
            </Sidebar>
        </div>
    );
};
export default StaticTable;