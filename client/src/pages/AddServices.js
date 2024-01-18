import { Col, Row, Form, Input } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { addService } from "../redux/actions/servicesAction";
function AddService() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  function onFinish(values) {
    values.bookedTimeSlots = [];

    dispatch(addService(values));
    console.log(values);
  }

  return (
    <DefaultLayout>
      {loading == true && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className="p-2">
          <Form className="text1 p-5" layout="vertical" onFinish={onFinish}>
            <h3>Add New Service</h3>
            <hr />
            <Form.Item
              name="name"
              label="Service name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="image"
              label="Image url"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="rate"
              label="Service Rate"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="servicetime"
              label="Service Time"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="serviceType"
              label="Service Type"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <div className="text-right">
              <button className="btn2">ADD SERVICE</button>
            </div>
          </Form>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default AddService;
