import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllServiceBookings } from "../redux/actions/bookingsServicesAction";
import { Col, Row } from "antd";
import Spinner from "../components/Spinner";
import moment from "moment";


function UserServicesBookings() {
  const dispatch = useDispatch();
  const { servicesbookings } = useSelector(
    (state) => state.bookingsServiceReducer
  );

  const { loading } = useSelector((state) => state.alertsReducer);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getAllServiceBookings());
  }, []);

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className="text3">
        <h3 className="text3-center mt-2">Booked Services</h3>
        <Row justify="center" gutter={16}>
          <Col lg={16} sm={24}>
            {servicesbookings
              .filter((o) => o.user == user._id)
              .reverse()
              .map((bookingService) => {
                return (
                  <Row gutter={16} className="bs1 mt-3 text3-left">
                    <Col lg={6} sm={24}>
                      <p>
                        <b>{bookingService.service.name}</b>
                      </p>
                      <p>
                     Between Drop Off & Pickup:  <b>{bookingService.totalHours} hrs</b>
                      </p>
                      <p>
                       Service Rate:{" "}
                        <b>{bookingService.service.rate}</b>
                      </p>
                      <p>
                        Total amount : <b>{bookingService.totalAmount}</b>
                      </p>
                    </Col>

                    <Col lg={12} sm={24}>
                      <p>
                        Transaction Id : <b>{bookingService.transactionId}</b>
                      </p>
                      <p>
                        Drop Off: <b>{bookingService.bookedTimeSlots.from}</b>
                      </p>
                      <p>
                        Pickup: <b>{bookingService.bookedTimeSlots.to}</b>
                      </p>
                      <p>
                        Date of booking:{" "}
                        <b>
                          {moment(bookingService.createdAt).format(
                            "MMM DD yyyy"
                          )}
                        </b>
                      </p>
                    </Col>

                    <Col lg={6} sm={24} className="text-right">
                      <img
                        style={{ borderRadius: 5 }}
                        src={bookingService.service.image}
                        height="140"
                        className="p-2"
                      />
                    </Col>
                  </Row>
                );
              })}
          </Col>
        </Row>
      </div>
    </DefaultLayout>
  );
}

export default UserServicesBookings;
