import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllServices } from "../redux/actions/servicesAction";
// row cloumn has been imported from antd for Grid system!!

import { Col, Row, Divider, DatePicker, Checkbox } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
const { RangePicker } = DatePicker;
function Services() {
  // Getting the Cars Data from carReducer
  const { services } = useSelector((state) => state.servicesReducer);

  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalServices, setTotalServices] = useState([]);
  const dispatch = useDispatch();

  // getting the data of cars in Home Page from backend
  useEffect(() => {
    dispatch(getAllServices());
  }, []);

  useEffect(() => {
    setTotalServices(services);
  }, [services]);

  return (
    <DefaultLayout>
      {loading == true && <Spinner />}

      <Row justify="center" gutter={16}>
        {totalServices.map((service) => {
          // In one row of antd , there are 24 cols. So, as we need to store 4 cars per row , we have allocated
          //  5 cols for per larger cars , and for smaller and extra smaller 24 cols
          return (
            <Col lg={5} sm={24} xs={24}>
              <div className="car p-2 bs1">
                <img src={service.image} className="carimg" />

                <div className="car-content d-flex align-items-center justify-content-between">
                  {/* <div className='text-left pl-2'> */}
                  <div className="text1 -left pl-2">
                    <p>{service.name}</p>
                    <p> Service Rate :{service.rate} /-</p>
                    <p> Service Time : {service.servicetime} hrs</p>
                  </div>

                  <div>
                    {/* <button className="btn1 mr-2"><Link to={`/booking/${car._id}`}>Book Now</Link></button> */}
                    <button className="btn2 mr-2">
                      <Link to={`/bookingService/${service._id}`}>
                        Book Now
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </DefaultLayout>
  );
}

export default Services;
