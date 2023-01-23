/** @format */

import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Container, Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HttpRequest } from "../../utils/axiosInstance";
import * as Yup from "yup";

export default function FormComplaint() {
   const { user, isLoading } = useSelector((state) => state.auth);
   const navigate = useNavigate();
   const [problems, setProblems] = useState([]);
   const dispatch = useDispatch();
   const [image, setImage] = useState(null);

   useEffect(() => {
      const getProblem = async () => {
         const { data } = await HttpRequest.get("/problem_type");
         setProblems(data.data);
      };
      getProblem();
   }, []);

   useEffect(() => {
      if (!user) {
         navigate("/");
      }
   }, [user]);

   if (isLoading) {
      return <div>Loading....</div>;
   } else {
      return (
         <Formik
            initialValues={{
               problem: "",
               description: "",
               user_id: user?.id,
            }}
            validationSchema={Yup.object().shape({
               problem: Yup.string().required("problem is required"),
               support_image: Yup.string().required("support image is required"),
               description: Yup.string().required("description is required"),
            })}
            onSubmit={async (values) => {
               navigate("/complaint/next", { state: { items: values } });
            }}
         >
            {({ handleSubmit, handleChange, errors, handleBlur, values, setFieldValue, touched }) => (
               <div>
                  <Container className="mt-4">
                     <div className="fs-4">Form Keluhan</div>
                     <Form className="my-4" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                           <Form.Label>Pilih Masalah</Form.Label>
                           <Form.Select name="problem" onChange={handleChange} onBlur={handleBlur}>
                              <option selected value={""}>
                                 Pilih Masalah
                              </option>
                              {problems.map((problem, i) => (
                                 <option key={i}>{problem.name}</option>
                              ))}
                           </Form.Select>
                           {errors.problem && touched.problem ? (
                              <Alert variant="pink" className="my-2">
                                 {errors.problem}
                              </Alert>
                           ) : null}
                        </Form.Group>
                        <Form.Group className="mb-3">
                           <Form.Label>Gambar Pendukung Sebagi Bukti</Form.Label>
                           <Form.Control
                              type="file"
                              name="support_image"
                              onChange={(e) => {
                                 setFieldValue("support_image", e.currentTarget.files[0]);
                              }}
                           />
                           {errors.support_image && touched.support_image ? (
                              <Alert variant="pink" className="my-2">
                                 {errors.support_image}
                              </Alert>
                           ) : null}
                        </Form.Group>
                        <Form.Group>
                           <Form.Label>Deskripsi</Form.Label>
                           <FloatingLabel controlId="floatingTextarea2" label="Deskripsikan masalahmu disini dengan jelas">
                              <Form.Control as="textarea" placeholder="Leave a comment here" name="description" onChange={handleChange} onBlur={handleBlur} style={{ height: "100px" }} />
                           </FloatingLabel>
                           {errors.description && touched.description ? (
                              <Alert variant="pink" className="my-2">
                                 {errors.description}
                              </Alert>
                           ) : null}
                        </Form.Group>
                        <div className="my-4">
                           <Button type="submit" variant="main" className="text-white">
                              Selanjutnya
                           </Button>
                        </div>
                     </Form>
                  </Container>
               </div>
            )}
         </Formik>
      );
   }
}
