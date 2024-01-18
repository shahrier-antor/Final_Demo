import React, { useState, useEffect } from "react";

import { Row, Col, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/actions/userActions";
import AOS from "aos";
import Spinner from "../components/Spinner";
import "aos/dist/aos.css"; // You can also use <link> for styles
import GS1 from "../Gallery5.png";
import AB from "../AboutUS2.png";
import FS from "../FullService.png";
import "aos/dist/aos.css";

import { getAllCars } from "../redux/actions/carsActions";
import { getAllServices } from "../redux/actions/servicesAction";

import moment from "moment";

// On submit action for Login
AOS.init();
function Home() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const { cars } = useSelector((state) => state.carsReducer);
  const { services } = useSelector((state) => state.servicesReducer);

  useEffect(() => {
    dispatch(getAllCars());
  }, []);
  useEffect(() => {
    dispatch(getAllServices());
  }, []);
  const size = 4;
  const items = cars.slice(0, size);
  const sizee = 4;
  const itemss = services.slice(0, sizee);
  return (
    <div className="login">
      {loading && <Spinner />}
      <Row justify="center" gutter={16} className="mt-2">
        <Col lg={21} style={{ position: "relative" }}></Col>
        <Col lg={3}>
          <div className="d-flex justify-content-between align-items-center">
            <row>
              <button className="btn2">
                <Link to="/login">Login</Link>
              </button>
              <button className="btn2">
                <Link to="/register">Register</Link>
              </button>
            </row>
          </div>
        </Col>
      </Row>
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={24} style={{ position: "relative" }}>
          <img
            className="w-10"
            // image slides to right
            data-aos="slide-right"
            data-aos-duration="1500"
            src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
          />
          <h1 className="login-logo">GARI LAGBE !</h1>
          <h2 className="text3">
            <p>SINCE 2019</p>
          </h2>
        </Col>
      </Row>
      <Row justify="center" gutter={16}>
        <h1>ENRICHED WITH BRANDED CARS!</h1>
      </Row>
      <Row justify="center" gutter={16}>
        {items.map((car) => {
          // In one row of antd , there are 24 cols. So, as we need to store 4 cars per row , we have allocated
          //  5 cols for per larger cars , and for smaller and extra smaller 24 cols
          return (
            <Col lg={5} sm={24} xs={24}>
              <div className="car p-2 bs1">
                <img src={car.image} className="carimg" />

                <div className="car-content d-flex align-items-center justify-content-between">
                  {/* <div className='text-left pl-2'> */}
                  <div className="text5 text-left pl-2">
                    <p>{car.name}</p>
                    <p>Capacity: {car.capacity} People</p>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={24} style={{ position: "relative" }}>
          <img
            className="w-100"
            // image slides to right
            // data-aos="slide-right"
            data-aos-duration="1500"
            src={FS}
          />
        </Col>
      </Row>
      <Row justify="center" gutter={16}>
        <p></p>
        <p><h1>ENTITLED WITH QUALITY SERVICES!</h1></p>
      </Row>
      <Row justify="center" gutter={16}>
        {itemss.map((service) => {
          // In one row of antd , there are 24 cols. So, as we need to store 4 cars per row , we have allocated
          //  5 cols for per larger cars , and for smaller and extra smaller 24 cols
          return (
            <Col lg={5} sm={24} xs={24}>
              <div className="car p-2 bs1">
                <img src={service.image} className="carimg" />

                <div className="car-content d-flex align-items-center justify-content-between">
                  {/* <div className='text-left pl-2'> */}
                  <div className="text5 text-left pl-2">
                    <p>{service.name}</p>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={12} style={{ position: "relative" }}>
          <h1>ABOUT US</h1>
          <img
            className=" carimg2 w-10 "
            // image slides to right
            // data-aos="slide-right"
            data-aos-duration="1500"
            src={AB}
          />
        </Col>
        <Col lg={12} style={{ position: "relative" }}>
          <h1>OUR GALLERY</h1>
          {/* <p className="text5">
            A collection of cars we've repaired with passion and our auto
            bodyshop
          </p> */}
          <img
            className="carimg2 w-10"
            // image slides to right
            // data-aos="slide-right"
            data-aos-duration="1500"
            src={GS1}
          />
        </Col>
      </Row>
      <div className="footer text-center text3">
        <hr />
        <p>CONTACT US</p>
        <p>Email: garilagbe@gmail.com</p>
        <p>Telephone: 0521-52138</p>
        <p>Mobile: 01776722381</p>
      </div>
    </div>
  );
}

export default Home;
