import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Button, Space, Row, Col, Modal } from "antd";
import { Link } from "react-router-dom";

function DefaultLayout(props) {
  // Getting the username from the local storage
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  const menu1 = (
    <Menu>
      <Menu.Item
        // On clicking logout moves to login page
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/";
        }}
      >
        <li style={{ color: "RoyalBlue" }}>Logout</li>
      </Menu.Item>
    </Menu>
  );
  const menu2 = (
    <Menu>
      <Menu.Item
        onClick={() => {
          window.location.href = "/userbookings";
        }}
      >
        <li style={{ color: "RoyalBlue" }}>Cars</li>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          window.location.href = "/userServicebookings";
        }}
      >
        <li style={{ color: "RoyalBlue" }}>Services</li>
      </Menu.Item>
    </Menu>
  );
  const menu3 = (
    <Menu>
      <Menu.Item
        onClick={() => {
          window.location.href = "/admin";
        }}
      >
        <li style={{ color: "RoyalBlue" }}>Cars</li>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          window.location.href = "/adminService";
        }}
      >
        <li style={{ color: "RoyalBlue" }}>Services</li>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <div className="header bs1">
        <Row gutter={16} justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between">
              <h1 className="text2 -left pl-2">
                <b>GARI LAGBE !</b>
              </h1>
              <button className="btn3 mr-2">
                <Link to={"/Rent"}>Rent Car</Link>
              </button>

              <button className="btn3 mr-2">
                <Link to={"/services"}>Services</Link>
              </button>
              <Dropdown overlay={menu2} placement="bottomCenter">
                <button className="btn3 mr-2">Bookings</button>
              </Dropdown>

              {user.email == "antor3036@gmail.com" && (
                <Dropdown overlay={menu3} placement="bottomCenter">
                  <button className="btn3 mr-2">Admin</button>
                </Dropdown>
              )}
              {/* <button className="btn3 mr-2">
                <Link to={"/edituser"}>Update Profile</Link>
              </button> */}

              <Dropdown overlay={menu1} placement="bottomCenter">
                <button className="btn3 mr-2">
                  {/* <Link to={"/edituser"}>{user._id}</Link> */}

                  <Link to={"/edituser"}>{user.username}</Link>
                  {/* {user.username} */}
                </button>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
      <div className="content">{props.children}</div>

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

export default DefaultLayout;
