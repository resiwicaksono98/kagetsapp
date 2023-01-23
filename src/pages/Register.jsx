/** @format */

import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Col, Stack, Form, Button, Image, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import RegisterImage from "../assets/images/register-image.png";
import { HttpRequest } from "../utils/axiosInstance";
import * as Yup from "yup";

export default function Register() {
   const [categories, setCategories] = useState([]);
   const navigate = useNavigate();

   useEffect(() => {
      const getCategory = async () => {
         const { data } = await HttpRequest.get("/categories");
         setCategories(data.data);
      };
      getCategory();
   }, []);
   return (
      <Formik
         initialValues={{
            fullname: "",
            email: "",
            password: "",
            phone_number: "",
            address: "",
            mitra_type: "",
         }}
         validationSchema={Yup.object().shape({
            firstname: Yup.string().required("Firstname is required"),
            lastname: Yup.string().required("Lastname is required"),
            email: Yup.string().required("Email is required"),
            password: Yup.string().required("Password is required"),
            phone_number: Yup.string().required("phone number is required"),
            address: Yup.string().required("address is required"),
            mitra_type: Yup.string().required("mitra type is required"),
         })}
         onSubmit={async (values) => {
            await HttpRequest.post(`/register`, values)
               .then((res) => {
                  alert("Success Register");
                  navigate("/login");
               })
               .catch((err) => console.log(err));
         }}
      >
         {({ handleSubmit, handleChange, values, errors, touched, handleBlur }) => (
            <div>
               <Row className="gap-2 my-4">
                  <Col className=" min-vh-100 d-flex ">
                     <Stack className="d-flex justify-content-center align-items-center">
                        <div className="fs-1 fw-bold">Registrasi</div>
                        <Form className="mt-4" onSubmit={handleSubmit}>
                           <Form.Group className="mb-3 " style={{ width: "24rem" }}>
                              <Form.Label>Firstname </Form.Label>
                              <Form.Control type="text" placeholder="Enter email" name="firstname" onChange={handleChange} value={values.firstname} onBlur={handleBlur} />
                              {errors.firstname && touched.firstname ? (
                                 <Alert variant="pink" className="my-2">
                                    {errors.firstname}
                                 </Alert>
                              ) : null}
                           </Form.Group>
                           <Form.Group className="mb-3 " style={{ width: "24rem" }}>
                              <Form.Label>Lastname </Form.Label>
                              <Form.Control type="text" placeholder="Enter email" name="lastname" onChange={handleChange} value={values.lastname} onBlur={handleBlur} />
                              {errors.lastname && touched.lastname ? (
                                 <Alert variant="pink" className="my-2">
                                    {errors.lastname}
                                 </Alert>
                              ) : null}
                           </Form.Group>
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
                              <Form.Control type="password" placeholder="Enter password" name="password" onChange={handleChange} value={values.password} onBlur={handleBlur} />
                              {errors.password && touched.password ? (
                                 <Alert variant="pink" className="my-2">
                                    {errors.password}
                                 </Alert>
                              ) : null}
                           </Form.Group>
                           <Form.Group className="mb-3 " style={{ width: "24rem" }}>
                              <Form.Label>No.Hp </Form.Label>
                              <Form.Control type="text" placeholder="Enter your phone number" name="phone_number" onChange={handleChange} value={values.phone_number} onBlur={handleBlur} />
                              {errors.phone_number && touched.phone_number ? (
                                 <Alert variant="pink" className="my-2">
                                    {errors.phone_number}
                                 </Alert>
                              ) : null}
                           </Form.Group>
                           <Form.Group className="mb-3 " style={{ width: "24rem" }}>
                              <Form.Label>Address</Form.Label>
                              <Form.Control as={"textarea"} type="text" placeholder="Enter your address" name="address" onChange={handleChange} value={values.address} onBlur={handleBlur} />
                              {errors.address && touched.address ? (
                                 <Alert variant="pink" className="my-2">
                                    {errors.address}
                                 </Alert>
                              ) : null}
                           </Form.Group>
                           <Form.Group className="mb-3">
                              <Form.Label>Mitra</Form.Label>
                              <Form.Select name="mitra_type" onChange={handleChange} value={values.mitra_type} onBlur={handleBlur}>
                                 <option value={""}>Choose one</option>
                                 {categories.map((category, i) => (
                                    <option key={i}>{category.name}</option>
                                 ))}
                              </Form.Select>
                              {errors.mitra_type && touched.mitra_type ? (
                                 <Alert variant="pink" className="my-2">
                                    {errors.mitra_type}
                                 </Alert>
                              ) : null}
                           </Form.Group>
                           <div>
                              Sudah punya akun? Masuk{" "}
                              <span className="text-primary" role={"button"}>
                                 <Link to={"/login"}>Disini</Link>
                              </span>
                           </div>
                           <div className="text-center mt-4">
                              <Button type="submit" variant="yellow" style={{ width: "15rem" }}>
                                 Register
                              </Button>
                           </div>
                        </Form>
                     </Stack>
                  </Col>
                  {/* Right */}
                  <Col className=" d-none d-md-block">
                     <Image src={RegisterImage} height={700} />
                  </Col>
               </Row>
            </div>
         )}
      </Formik>
   );
}
