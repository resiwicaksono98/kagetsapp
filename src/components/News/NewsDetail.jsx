/** @format */

import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import Layout from "../Layout";
import NewsImage from "../../assets/images/news-image.png";
import { useParams } from "react-router-dom";
import { HttpRequest } from "../../utils/axiosInstance";

export default function NewsDetail() {
   const { id } = useParams();
   const [newst, setNewst] = useState([]);

   useEffect(() => {
      const getNews = async () => {
         const { data } = await HttpRequest.get(`/news/${id}`);
         setNewst(data.data);
      };
      getNews();
   }, [id]);
   return (
      <Layout>
         <div className="mt-5">
            {newst.map((news, i) => (
               <Container key={i}>
                  <div className="fs-3 fw-bold">{news.title}</div>
                  <div className="my-4 fs-5 fw-light">GoCar / 16 April 2022</div>
                  <div className="d-flex justify-content-center mb-4">
                     <Image src={`http://localhost:5000/images/news/${news.image}`} height={500} width={800} />
                  </div>
                  <div className="my-4">{news.description}</div>
               </Container>
            ))}
         </div>
      </Layout>
   );
}
