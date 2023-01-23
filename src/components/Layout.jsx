/** @format */

import React, { useState } from "react";
import Topbar from "./Topbar";

export default function Layout({ children, topbar = true }) {
   const [navbar, setNavbar] = useState(topbar);
   if (navbar) {
      return (
         <>
            <Topbar />
            {children}
         </>
      );
   } else {
      return <>{children}</>;
   }
}
