/** @format */

import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { HttpRequest } from "../../utils/axiosInstance";
import Layout from "../Layout";

export default function Dashboard() {
   const [complaints, setComplaints] = useState([]);
   const { userId } = useParams();

   useEffect(() => {
      const getComplaint = async () => {
         await HttpRequest.get(`/complaints/all/${userId}`).then((res) => setComplaints(res.data.data));
      };
      getComplaint();
   }, [userId]);
   return (
      <Layout>
         <Container className="my-4">
            <div className="fs-4 fw-bold">Dashboard</div>
            <Row className="my-4">
               <Col>
                  <Card style={{ width: "18rem" }} className="bg-main text-white">
                     <Card.Body className="text-center">
                        <Card.Title className="fs-2">Success</Card.Title>
                        <Card.Text className="my-4 fs-1">3</Card.Text>
                     </Card.Body>
                  </Card>
               </Col>
               <Col>
                  <Card style={{ width: "18rem" }} className="bg-purple text-white">
                     <Card.Body className="text-center">
                        <Card.Title className="fs-2">Checking</Card.Title>
                        <Card.Text className="my-4 fs-1">5</Card.Text>
                     </Card.Body>
                  </Card>
               </Col>
               <Col>
                  <Card style={{ width: "18rem" }} className="bg-pink text-white">
                     <Card.Body className="text-center">
                        <Card.Title className="fs-2">Failured</Card.Title>
                        <Card.Text className="my-4 fs-1">1</Card.Text>
                     </Card.Body>
                  </Card>
               </Col>
            </Row>
            {/* History */}
            <div className="fs-4 fw-bold  ">History</div>
            {complaints.map((complaint, i) => (
               <div className="mt-3 border p-3 rounded bg-history " role={"button"} key={i}>
                  {moment(complaint.createdAt).format("D MMMM YYYY")} Mengajukan Complaint , Status : <span className="text-purple fw-bold">{complaint?.complaint_result?.status}</span>
               </div>
            ))}
         </Container>
      </Layout>
   );
}
