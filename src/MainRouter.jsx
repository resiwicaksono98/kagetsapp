/** @format */

import { createBrowserRouter } from "react-router-dom";
import NextFormComplaint from "./components/Complaint/NextFormComplaint";
import SucessComplaint from "./components/Complaint/SucessComplaint";
import Dashboard from "./components/Dashboard/Dashboard";
import NewsDetail from "./components/News/NewsDetail";
import Complaint from "./pages/Complaint";
import Home from "./pages/Home";
import Login from "./pages/Login";
import News from "./pages/News";
import Register from "./pages/Register";

const router = createBrowserRouter([
   {
      path: "/",
      element: <Home />,
   },
   //  Auth
   {
      path: "/login",
      element: <Login />,
   },
   {
      path: "/register",
      element: <Register />,
   },
   //  News
   {
      path: "/news",
      element: <News />,
   },
   {
      path: "/news/:id",
      element: <NewsDetail />,
   },
   // Complaint
   {
      path: "/complaint",
      element: <Complaint />,
   },
   {
      path: "/complaint/next",
      element: <NextFormComplaint />,
   },
   {
      path: "/complaint/success/:id",
      element: <SucessComplaint />,
   },
   //  Dashboard
   {
      path: "/dashboard/:userId",
      element: <Dashboard />,
   },
]);

export default router;
