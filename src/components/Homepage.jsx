/** @format */

import React from "react";
import { Container, Image, Row, Col, Button, Stack } from "react-bootstrap";
import HomepageImage from "../assets/images/homepage-image.png";
import HomepageBottom from "../assets/images/Homepage-bottom.png";
import { Link } from "react-router-dom";

export default function Homepage() {
   return (
      <div>
         <Container className="mt-3" fluid="md ">
            <Row>
               <Col>
                  <Image src={HomepageImage} style={{ height: "30rem" }} />
               </Col>
               <Col className="d-flex align-items-center justify-content-center">
                  <Stack className="my-auto">
                     <div className="display-4 text-center fw-bolder">Mengatasi Keluhan Driver Gojek Tangerang.</div>
                     <Link to={"/complaint"} className="text-decoration-none d-flex justify-content-center">
                        <Button variant="main" size="lg" className="mt-4 text-white ">
                           Coba Sekarang
                        </Button>
                     </Link>
                  </Stack>
               </Col>
            </Row>
            {/*  */}
         </Container>
         <Image src={HomepageBottom} style={{ width: "80rem" }} />
      </div>
   );
}
