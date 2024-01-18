import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllServices } from "../redux/actions/servicesAction";
import moment from "moment";
import { bookService } from "../redux/actions/bookingsServicesAction";
import StripeCheckout from "react-stripe-checkout";

import AOS from "aos";

import "aos/dist/aos.css"; // You can also use <link> for styles
const { RangePicker } = DatePicker;
function BookingServices({ match }) {
  const { services } = useSelector((state) => state.servicesReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [service, setservices] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [today, setToday] = useState();
  const [toOrg, setToOrg] = useState();

  const [totalHours, setTotalHours] = useState(0);
  const [overallTest, setOverallTest] = useState(false);
  const [premiumServices, setPremiumServices] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  // const [totalBook, setTotalBook] = useState([]);
  useEffect(() => {
    if (services.length == 0) {
      dispatch(getAllServices());
    } else {
      // if The Car id of mongodb matches with the car id off the booking then the car is set
      setservices(services.find((o) => o._id == match.params.serviceid));
    }
  }, [services]);

  useEffect(() => {
    setTotalAmount((service.rate * totalHours) / totalHours);
    if (overallTest) {
      setTotalAmount(totalAmount + 3000);
    }
    if (premiumServices) {
      setTotalAmount(totalAmount + 5000);
    }
  }, [overallTest, premiumServices, totalHours]);

  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
    setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));
    setTotalHours(values[1].diff(values[0], "hours"));
    // minTime();
  }
  console.log(totalHours, service.servicetime);
  // function minTime() {
  //   if (totalHours > service.servicetime) {
  //     alert("Less than minimum service time is selected!");
  //   } else {
  //     alert("Service time");
  //     // setTotalHours();
  //   }
  // }

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().startOf("day");
  };
  const disabledHours = () => {
    var hours = [];

    for (var i = 0; i < moment().hour(); i++) {
      hours.push(i);
    }
    return hours;
  };

  const disabledMinutes = (selectedHour) => {
    var minutes = [];
    if (selectedHour == moment().hour()) {
      var i = 0;
      for ( i = 0; i < moment().minute(); i++) {
        minutes.push(i);
      }
      for (var k = i; k < i + 5; k++) {
        minutes.push(k);
      }
    }
    return minutes;
  };

  function onToken(token) {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      service: service._id,
      totalHours,
      totalAmount,
      overallTestRequired: overallTest,
      premiumServicesRequired: premiumServices,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    dispatch(bookService(reqObj));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24} className="p-3">
          <img
            src={service.image}
            className="carimg2 bs1 w-100"
            data-aos="flip-left"
            data-aos-duration="1500"
          />
        </Col>

        <Col lg={10} sm={24} xs={24} className="text-right ">
          <Divider className="text1" type="horizontal" dashed>
            {/******************************************************************************************************************************/}
            Service Details
          </Divider>
          <div className="text3" style={{ textAlign: "right" }}>
            <p>{service.name}</p>
            <p>Service Type : {service.serviceType}</p>
            <p>Rate: {service.rate} /-</p>
            <p>Service Time: {service.servicetime} hrs</p>
          </div>

          <Divider className="text3" type="horizontal" dashed>
            {/******************************************************************************************************************************/}
            Select Drop Off and Pickup Time
          </Divider>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={selectTimeSlots}
            disabledDate={disabledDate}
            disabledHours={disabledHours}
            disabledMinutes={disabledMinutes}
          />
          <br />

          {from && to && totalHours >= service.servicetime && (
            <div className="text3">
              <p>
                Overall Test Rate : <b>3000/-</b>
              </p>
              <p>
                Premium Package Rate : <b>5000/-</b>
              </p>
              <Checkbox
                className="text3"
                onChange={(e) => {
                  if (e.target.checked) {
                    setOverallTest(true);
                  } else {
                    setOverallTest(false);
                  }
                }}
              >
                Overall Condition Test
              </Checkbox>
              <Checkbox
                className="text3"
                onChange={(e) => {
                  if (e.target.checked) {
                    setPremiumServices(true);
                  } else {
                    setPremiumServices(false);
                  }
                }}
              >
                Premium Package
              </Checkbox>
              <h3 className="text3">Total Amount : {totalAmount}</h3>
              <StripeCheckout
                shippingAddress
                token={onToken}
                currency="BDT"
                amount={totalAmount * 10}
                stripeKey="pk_test_51LIzXBJwQzOW9VgLbuWbw9ErR9nYLjKLudSv2p7Q0gynt3gQbgr8THh6ALpy1s5dimOFUZvoM3oDxD8vOXd9u24Y00WryY8rkr"
              >
                <button className="btn2">Book Now</button>
              </StripeCheckout>
            </div>
          )}
          {from && to && totalHours < service.servicetime && (
            <p className="text7">
              * Less than minimum service time is selected!
               </p>
          )}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default BookingServices;
