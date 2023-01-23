/** @format */

import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Image, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../assets/images/login-image.png";
import * as Yup from "yup";
import { loginUser } from "../features/AuthSlice";

export default function Login() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { isSuccess, user } = useSelector((state) => state.auth);
   const [message, setMessage] = useState();

   useEffect(() => {
      if (user && isSuccess) {
         navigate("/");
      }
   }, [isSuccess, user, dispatch]);
   return (
      <Formik
         initialValues={{
            email: "",
            password: "",
         }}
         validationSchema={Yup.object().shape({
            email: Yup.string().required("Email is required"),
            password: Yup.string().required("Password is required"),
         })}
         onSubmit={async (values) => {
            dispatch(loginUser(values));
            if (isSuccess) {
               alert("Login Success");
               navigate("/");
            } else {
               setMessage("Wrong Email Or Password ");
            }
         }}
      >
         {({ handleSubmit, errors, touched, handleChange, handleBlur, values }) => (
            <div>
               <Row className="gap-2">
                  <Col className=" min-vh-100 d-flex ">
                     <Stack className="d-flex justify-content-center align-items-center">
                        <div className="fs-1 fw-bold">Welcome Back</div>
                        <Form className="mt-4" onSubmit={handleSubmit}>
                           {message ? <Alert variant="pink">{message}</Alert> : null}
                           <Form.Group className="mb-3 " style={{ width: "24rem" }}>
                              <Form.Label>Email </Form.Label>
                              <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} value={values.email} onBlur={handleBlur} />
                              {errors.email && touched.email ? (
                                 <Alert variant="pink" className="my-2">
                                    {errors.email}
                                 </Alert>
                              ) : null}
                           </Form.Group>
                           <Form.Group className="mb-3 " style={{ width: "24rem" }}>
                              <Form.Label>Password </Form.Label>
                              <Form.Control type="password" placeholder="Enter password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} />
                              {errors.password && touched.password ? (
                                 <Alert variant="pink" className="my-2">
                                    {errors.password}
                                 </Alert>
                              ) : null}
                           </Form.Group>
                           <div>
                              Belum punya akun? Daftar{" "}
                              <span className="text-primary" role={"button"}>
                                 <Link to={"/register"}>Disini</Link>
                              </span>
                           </div>
                           <div className="text-center mt-4">
                              <Button type="submit" variant="yellow" style={{ width: "15rem" }}>
                                 Masuk
                              </Button>
                           </div>
                        </Form>
                     </Stack>
                  </Col>
                  {/* Right */}
                  <Col className=" d-none d-md-block" xs={"6"}>
                     <Image src={LoginImage} style={{ width: "633px", height: "630px" }} />
                  </Col>
               </Row>
            </div>
         )}
      </Formik>
   );
}
