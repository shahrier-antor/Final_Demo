import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllCars } from "../redux/actions/carsActions";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
import StripeCheckout from "react-stripe-checkout";
import AOS from "aos";

import "aos/dist/aos.css"; // You can also use <link> for styles
const { RangePicker } = DatePicker; 
function BookingCar({ match }) {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setcar] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [today, setToday] = useState();
  const [toOrg, setToOrg] = useState();
  
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setdriver] = useState(false);
  const [airCondition, setairCondition] = useState(false);
  const [premiumCondition, setpremiumCondition] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  // const [totalBook, setTotalBook] = useState([]);
  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    } else {
      // if The Car id of mongodb matches with the car id off the booking then the car is set
      setcar(cars.find((o) => o._id == match.params.carid));
    }
  }, [cars]);

  //  useEffect(() => {
  //    setTotalBook(cars.bookedTimeSlots);
  //  }, [cars]);

  useEffect(() => {
    
      setTotalAmount(totalHours * car.rentPerHour);
    if (driver) {
      setTotalAmount(totalAmount + 30 * totalHours);
    }
    if (airCondition) {
      setTotalAmount(totalAmount + 20 * totalHours);
    }
    if (premiumCondition) {
      setTotalAmount(totalAmount + 40 * totalHours);
    }
  }, [driver, airCondition, premiumCondition, totalHours]);


  function selectTimeSlots(values) {
    var selectedFrom = moment(values[0], "MMM DD yyyy HH:mm");
    var selectedTo = moment(values[1], "MMM DD yyyy HH:mm");

    var flag = true;
    for (var booking of car.bookedTimeSlots) {
      if (
        selectedFrom.isBetween(booking.from, booking.to) ||
        selectedTo.isBetween(booking.from, booking.to) ||
        moment(booking.from).isBetween(selectedFrom, selectedTo) ||
        moment(booking.to).isBetween(selectedFrom, selectedTo)
      ) {
        flag = false;
      }
    }
    if (flag) {
      setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
      setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));
      setTotalHours(values[1].diff(values[0], "hours")); 
    } else {
      setFrom();
      setTo();
      alert(
        "Sorry ! The Car is booked in this timeslot. Please, try another slot!!"
      );
    }
  }
  
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
     if (selectedHour === moment().hour()) {
      for (var i = 0; i < moment().minute(); i++) {
        minutes.push(i);
      }
    }
    return minutes;
  };

  function onToken(token) {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      acRequired: airCondition,
      premiumConditionRequired: premiumCondition,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    dispatch(bookCar(reqObj));
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
            src={car.image}
            className="carimg2 bs1 w-100"
            data-aos="flip-left"
            data-aos-duration="1500"
          />
        </Col>

        <Col lg={10} sm={24} xs={24} className="text-right ">
          <Divider className="text1" type="horizontal" dashed>
            {/******************************************************************************************************************************/}
            Car Details
          </Divider>
          <div className="text3" style={{ textAlign: "right" }}>
            <p>{car.name}</p>
            <p>Fuel Type : {car.fuelType}</p>
            <p>Max Persons : {car.capacity}</p>
            <p>{car.rentPerHour} Rent Per hour /-</p>
          </div>

          <Divider className="text1" type="horizontal" dashed>
            {/******************************************************************************************************************************/}
            Select Time Slots
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

          {/* *****************************************button******************************************************************************** */}
          <button
            className="btn2 mt-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            See Booked Slots
          </button>
          {/* *************************************************************************************************************** */}

          {from && to && totalHours && (
            <div className="text3">
              <p>
                Total Hours : <b>{totalHours}</b>
              </p>
              <p>
                Rent Per Hour : <b>{car.rentPerHour}</b>
              </p>

              <Checkbox
                className="text3"
                onChange={(e) => {
                  if (e.target.checked) {
                    setdriver(true);
                  } else {
                    setdriver(false);
                  }
                }}
              >
                Driver Required
              </Checkbox>
              <Checkbox
                className="text3"
                onChange={(e) => {
                  if (e.target.checked) {
                    setairCondition(true);
                  } else {
                    setairCondition(false);
                  }
                }}
              >
                Air Condition Required
              </Checkbox>
              <Checkbox
                className="text3"
                onChange={(e) => {
                  if (e.target.checked) {
                    setpremiumCondition(true);
                  } else {
                    setpremiumCondition(false);
                  }
                }}
              >
                Premium Condition
              </Checkbox>
              <h3 className="text3">Total Amount : {totalAmount}</h3>
              <StripeCheckout
                shippingAddress
                token={onToken}
                currency="BDT"
                amount={totalAmount * 100}
                stripeKey="pk_test_51LIzXBJwQzOW9VgLbuWbw9ErR9nYLjKLudSv2p7Q0gynt3gQbgr8THh6ALpy1s5dimOFUZvoM3oDxD8vOXd9u24Y00WryY8rkr"
              >
                <button className="btn2">Book Now</button>
              </StripeCheckout>
            </div>
          )}
          {from && to && totalHours <= 0 && (
            <p className="text7">
              *You need to book for at least 1 Hour!!
            </p>
          )}
        </Col>

        {car.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked time slots"
            className="text3"
          >
            <div className="p-2">
              {car.bookedTimeSlots.map((slot) => {
                return (
                  <button className="btn2 mt-2">
                    {slot.from} - {slot.to}
                  </button>
                );
              })}
              <div className="text-right mt-5">
                <button
                  className="btn2"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Row>
    </DefaultLayout>
  );
}

export default BookingCar;
