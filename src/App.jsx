/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./MainRouter";
import Navbar from "./components/Topbar";
import { getMe, refreshAccessToken } from "./features/AuthSlice";

function App() {
   const dispatch = useDispatch();
   const { accessToken, refreshToken } = useSelector((state) => state.auth);

   useEffect(() => {
      const checkAuth = async () => {
         dispatch(refreshAccessToken());
         if (accessToken) {
            try {
               // Cek apakah access token masih valid
               await dispatch(getMe(accessToken));
            } catch (error) {
               // Jika access token tidak valid, gunakan refresh token untuk memperbaharui access token
               await dispatch(refreshAccessToken(refreshToken));
               //     // Cek kembali apakah access token yang baru saja diperbaharui masih valid
               await dispatch(getMe(accessToken));
            }
         }
      };
      checkAuth();
   }, [accessToken]);
   return (
      <div className="App">
         <RouterProvider router={router} />
      </div>
   );
}

export default App;
