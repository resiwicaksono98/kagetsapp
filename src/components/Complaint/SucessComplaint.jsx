/** @format */

import React from "react";
import { Button, Container, Image, Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SuccessImage from "../../assets/images/success.png";

export default function SucessComplaint() {
   const { user } = useSelector((state) => state.auth);
   if (!user) {
      navigate("/complaint");
   }
   return (
      <div>
         <Container>
            <div>
               <Stack className="d-flex justify-content-center align-items-center " style={{ minHeight: "100vh" }}>
                  <div className="fs-3 fw-bold">Success!!</div>
                  <Image src={SuccessImage} height={350} />
                  <li>Cek Dashboardmu untuk melihat update status complaintmu</li>
                  <Link to={`/dashboard/${user?.id}`}>
                     <Button variant="main" className="text-white my-4" style={{ width: "20rem" }}>
                        Dashboard
                     </Button>
                  </Link>
               </Stack>
            </div>
         </Container>
      </div>
   );
}
