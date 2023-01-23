/** @format */

import React from "react";
import { Container, Navbar, Nav, Image, Button, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { LogOut } from "../features/AuthSlice";

export default function Topbar() {
   const { user } = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleLogout = async () => {
      dispatch(LogOut());
      setTimeout(() => {
         navigate("/login");
      }, 1000);
   };
   return (
      <div>
         <Navbar bg="white" expand="lg">
            <Container style={{ fontWeight: "600" }}>
               <Navbar.Brand style={{ fontSize: "2rem" }}>
                  <Link to="/">
                     <Image src={Logo} height={60} />
                  </Link>
               </Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                  <Nav style={{ fontSize: "1.2rem" }}>
                     <Nav.Link>
                        <Link className="text-purple text-decoration-none" to="/news">
                           Berita
                        </Link>
                     </Nav.Link>

                     <Nav.Link>
                        <Link className="text-purple text-decoration-none" to="/complaint">
                           Keluhan
                        </Link>
                     </Nav.Link>
                  </Nav>
               </Navbar.Collapse>
               <Navbar.Collapse className="justify-content-end d-flex gap-3">
                  {/* Is Logged In */}
                  <Stack direction="horizontal" gap={3} className={`${!user ? "d-none" : ""}`}>
                     <Navbar.Text>
                        <Link to={`/dashboard/${user?.id}`}>
                           <Button variant="main" className="text-white fs-5">
                              Dashboard
                           </Button>
                        </Link>
                     </Navbar.Text>
                     <Navbar.Text className="text-purple">
                        Hi Resi <Image src={"https://pbs.twimg.com/profile_images/1392292811790331904/RLBAgHDt_400x400.jpg"} height={40} width={40} className=" bg-primary" roundedCircle={true} />
                     </Navbar.Text>
                     <Navbar.Text>
                        <Button variant="pink" className="text-white fs-5" onClick={handleLogout}>
                           Logout
                        </Button>
                     </Navbar.Text>
                  </Stack>
                  {/* Not Logged in */}
                  <Navbar.Text className={` ${user ? "d-none text-purple" : ""}`}>
                     <Link to={"/login"}>
                        <Button variant="yellow" style={{ width: "130px" }}>
                           Masuk
                        </Button>{" "}
                     </Link>
                  </Navbar.Text>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </div>
   );
}
