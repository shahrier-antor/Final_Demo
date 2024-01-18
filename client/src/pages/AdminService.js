import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { deleteService, getAllServices } from "../redux/actions/servicesAction";
import { Col, Row, Divider, DatePicker, Checkbox, Edit } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, message } from "antd";
const { RangePicker } = DatePicker;
function AdminService() {
  const { services } = useSelector((state) => state.servicesReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalServices, setTotalServices] = useState([]);
  const dispatch = useDispatch();

   useEffect(() => {
     dispatch(getAllServices());
   }, []);

   useEffect(() => {
     setTotalServices(services);
   }, [services]);

  return (
    <DefaultLayout>
      <Row justify="center" gutter={16} className="mt-2">
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-1 mr-2">Services Admin Panel</h3>
            <button className="btn2">
              <a href="/addservice">ADD SERVICE</a>
            </button>
          </div>
        </Col>
      </Row>

      {loading == true && <Spinner />}

      <Row justify="center" gutter={16}>
        {totalServices.map((service) => {
          return (
            <Col lg={5} sm={24} xs={24}>
              <div className="car p-2 bs1">
                <img src={service.image} className="carimg" />

                <div className="car-content d-flex align-items-center justify-content-between">
                  <div className="text1 -left pl-2">
                    <p>{service.name}</p>
                    <p> Service Rate: {service.rate} /-</p>
                    <p> Service Time : {service.servicetime} hrs</p>
                  </div>

                  <div className="mr-4">
                    <Link to={`/editservice/${service._id}`}>
                      <EditOutlined
                        className="mr-3"
                        style={{ color: "green", cursor: "pointer" }}
                      />
                    </Link>

                    <Popconfirm
                      title="Are you sure to delete this Service?"
                      onConfirm={() => {
                        dispatch(deleteService({ serviceid: service._id }));
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </Popconfirm>
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

export default AdminService;
