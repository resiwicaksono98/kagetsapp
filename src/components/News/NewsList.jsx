/** @format */

import React, { useEffect, useState } from "react";
import { Container, Image, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import NewsImage from "../../assets/images/news-image.png";
import { HttpRequest } from "../../utils/axiosInstance";

export default function NewsList() {
   const [newst, setNewst] = useState([]);

   useEffect(() => {
      const getNews = async () => {
         const response = await HttpRequest.get("/news");
         setNewst(response.data.data);
      };
      getNews();
   }, []);
   return (
      <div>
         <Container className="mt-4 mx-4">
            {/* Head */}
            <Stack gap={2} className="">
               <div className="fs-3 fw-bold">Ada apa di Gojek Tangerang</div>
               <div className="fs-6 fw-light">Cerita kami, pembaruan terbaru, dan promo eksklusif. Temukan apa pun yang ingin Anda ketahui tentang kami.</div>
            </Stack>
            {/* category */}
            <Stack direction="horizontal" className="mt-5" gap={3}>
               <div className="fs-4 fw-normal">Category : </div>
               <div className="bg-yellow p-2 rounded-pill fw-bold lh-lg" role={"button"}>
                  Go-Ride
               </div>
               <div className="bg-yellow p-2 rounded-pill fw-bold lh-lg" role={"button"}>
                  Go-Car
               </div>
               <div className="bg-yellow p-2 rounded-pill fw-bold lh-lg" role={"button"}>
                  Go-Food
               </div>
            </Stack>
            {/* List News */}
            {newst.map((news, i) => (
               <Link to={`/news/${news.id}`} className="text-decoration-none bg-news">
                  <Stack className="mt-5" key={i}>
                     <Stack direction="horizontal" gap={3}>
                        <Image src={`http://localhost:5000/images/news/${news.image}`} height={200} width={300} />
                        <Stack className=" my-auto" gap={3}>
                           <div className="fs-4 fw-bold">{news.title}</div>
                           <div className="fs-5 fw-light">{news.description.length >= 50 ? news.description.slice(0, 300) + "...." + " Baca lebih lanjut" : ""}</div>
                           <div className="fs-6 fw-lighter">16 April 2022 / GoCar </div>
                        </Stack>
                     </Stack>
                  </Stack>
               </Link>
            ))}
         </Container>
      </div>
   );
}
