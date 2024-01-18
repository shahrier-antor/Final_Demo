import { Col, Row, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import {
  addService,
  editService,
  getAllServices,
} from "../redux/actions/servicesAction";
import "aos/dist/aos.css";
function EditServices({ match }) {
  const { services } = useSelector((state) => state.servicesReducer);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [service, setService] = useState([]);
  const [totalServices, setTotalServices] = useState([]);
  useEffect(() => {
    if (services.length == 0) {
      dispatch(getAllServices());
    } else {
      setTotalServices(services);
      setService(services.find((o) => o._id == match.params.serviceid));
      console.log(service);
    }
  }, [services]);

  function onFinish(values) {
    values._id = service._id;

    dispatch(editService(values));
    console.log(values);
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className="p-5">
          {totalServices.length > 0 && (
            <Form
              initialValues={service}
              className="text1 p-5"
              layout="vertical"
              onFinish={onFinish}
            >
              <h3>Edit Service</h3>

              <hr />
              <Form.Item
                name="name"
                label="Service Name :"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="image"
                label="Image Url :"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="rate"
                label="Service Rate :"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="servicetime"
                label="Service Time :"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="serviceType"
                label="Service Type :"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <div className="text-right">
                <button className="btn2">Save Changes!</button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </DefaultLayout>
   
  );
}

export default EditServices;
