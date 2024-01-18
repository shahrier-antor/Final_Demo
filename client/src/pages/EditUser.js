import React, { useEffect, useState } from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { Popconfirm, message } from "antd";

import {
  userRegister,
  editUser,
  deleteUser,
  getAllUsers,
} from "../redux/actions/userActions";

import AOS from "aos";
import Spinner from "../components/Spinner";
import "aos/dist/aos.css"; // You can also use <link> for styles
import Password from "antd/lib/input/Password";

// ..
// on finish actio for register
// AOS.init();
function EditUser() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const { users } = useSelector((state) => state.usersReducer);
  // const [user, setUser] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [passwd, setPasswd] = useState("");
  const [cpasswd, setcPasswd] = useState("");

  console.log(passwd, cpasswd);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    setTotalUsers(users);
  }, [users]);
  function onFinish(values) {
    values._id = user._id;

    dispatch(editUser(values));
    console.log(values);
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className="p-5">
          <Form
            initialValues={user}
            layout="vertical"
            className="text1 p-5"
            onFinish={onFinish}
          >
            <h3>Update Profile Infomations</h3>
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
              <Input
                onChange={(e) => setPasswd(e.target.value)}
                placeholder="Enter your Password"
                type="password"
              />
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
                onChange={(e) => setcPasswd(e.target.value)}
                placeholder="Enter your Password again to confirm"
                type="password"
              />
            </Form.Item>

            <div className="text-right">
              <button className="btn2">Save Changes!</button>

              <button
                className="btn2"
                onClick={() => {
                  if (passwd == cpasswd) {
                    dispatch(deleteUser({ userid: user._id }));
                  }
                  else {
                    alert("Please confirm your password to delete");
                  }
                }}
              >
                Delete Account
              </button>
            </div>
          </Form>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default EditUser;
