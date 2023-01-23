/** @format */

import React from "react";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HttpRequest } from "../../utils/axiosInstance";
import Layout from "../Layout";

export default function NextFormComplaint() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { user } = useSelector((state) => state.auth);
   const { state } = useLocation();

   if (!user || state?.items) {
      navigate("/complaint");
   }
   const handleComplaint = async () => {
      await HttpRequest.post(
         `/complaints`,
         {
            problem: state?.items?.problem,
            description: state?.items?.description,
            support_image: state?.items?.support_image,
            userId: user?.id,
         },
         {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         }
      ).then((res) => {
         console.log(res);
         navigate(`/complaint/success/${res.data.data.id}`, { replace: true });
      });
   };
   return (
      <Layout>
         <Container className="mt-4">
            <div className="text-center fs-4 fw-bold">Detail Keluhan</div>
            <div className="my-4 fs-5 fw-normal border p-3 rounded">
               {/* Name */}
               <Row className="mb-3">
                  <Col>
                     <div>Nama Mitra</div>
                  </Col>
                  <Col md={8}>
                     <div>: {user?.firstname + " " + user?.lastname}</div>
                  </Col>
               </Row>
               {/* Phone number */}
               <Row className="mb-3">
                  <Col>
                     <div>Nomor Handphone</div>
                  </Col>
                  <Col md={8}>
                     <div>: {user?.phone_number}</div>
                  </Col>
               </Row>
               {/* Mitra type */}
               <Row className="mb-3">
                  <Col>
                     <div>Jenis Mitra</div>
                  </Col>
                  <Col md={8}>
                     <div>: {user?.mitra_type}</div>
                  </Col>
               </Row>
               {/* Problem type */}
               <Row className="mb-3">
                  <Col>
                     <div>Jenis Masalah</div>
                  </Col>
                  <Col md={8}>
                     <div>: {state?.items?.problem}</div>
                  </Col>
               </Row>
               {/* Support image */}
               <Row className="mb-3">
                  <Col>
                     <div>Support Image</div>
                  </Col>
                  <Col md={8}>
                     <div>: {state?.items?.support_image ? "Tercantum" : "Tidak Tercantum"}</div>
                  </Col>
               </Row>
               {/* Description */}
               <Row className="mb-3">
                  <Col>
                     <div>Description</div>
                  </Col>
                  <Col md={8}>
                     <div>: {state?.items?.description}</div>
                  </Col>
               </Row>
               <Button variant={"main"} className="text-white my-2  fw-bold lh-lg text-break" onClick={handleComplaint}>
                  Lanjutkan Pengajuan
               </Button>
            </div>
         </Container>
      </Layout>
   );
}
