import React, { useState } from "react";
import { Row, Col, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../redux/actions/userActions";
import AOS from "aos";
import Spinner from "../components/Spinner";
import "aos/dist/aos.css"; // You can also use <link> for styles


// ..
// on finish actio for register
AOS.init();
function Register() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  function onFinish(values) {
    dispatch(userRegister(values));
    console.log(values);
  }

  return (
    <div className="login">
      {loading && <Spinner />}
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={16} style={{ position: "relative" }}>
          <img
            className="w-100"
            // image slides to left
            data-aos="slide-left"
            data-aos-duration="1500"
            src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
          />
          <h1 className="login-logo">GARI LAGBE !</h1>
          <h2 className="text3">SINCE 2019</h2>
        </Col>
        <Col lg={8} className="text-left p-5">
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={onFinish}
          >
            <h1>Register</h1>
            <hr />
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
                {
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="Type your Email" />
            </Form.Item>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: "Please enter your Username",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="Type your Username" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please enter your Password",
                },
                {
                  min: 6,
                  message: "Password should be at least 6 charecters",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="Enter your Password" type="password" />
            </Form.Item>
            <Form.Item
              name="cpassword"
              label="Confirm Password"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please enter to confirm Password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Password does not match");
                  },
                }),
              ]}
              hasFeedback
            >
              <Input
                placeholder="Enter your Password again to confirm"
                type="password"
              />
            </Form.Item>

            <button className="btn2 mt-2 mb-3">Register</button>
            <br />

            <Link to="/login">Click Here to Login</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
