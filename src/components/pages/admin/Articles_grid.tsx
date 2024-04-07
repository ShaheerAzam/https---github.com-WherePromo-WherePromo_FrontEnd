import axios from "axios";
import { useState, useEffect } from "react";
import Admin_Navbar from "./admin_navbar";

import ArticleCard from "./Article_Approve_Card";

function ArticleApprove() {
  let [approveArticles, setapproveArticles] = useState<any>([]);
  useEffect(() => {
    async function fetchArticles() {
      const token = window.localStorage.getItem("token");
      if (!token) {
        throw new Error("no token supplied");
      }
      const response = await axios.get(
        "http://localhost:3000/api/v1/articles/?sort_by=createdAt&page=1&per_page=10&order_by=desc",
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (response.status == 200) {
        console.log(response.data.data);
        setapproveArticles(response.data.data);
      } else {
        alert("Hello");
      }
    }
    fetchArticles();
  },[]);
  <Admin_Navbar />;
  return (
    <>
      <div>
        <Admin_Navbar />

        <div
          style={{
            color: "#676464",
            fontSize: "24px",
            position: "relative",
            left: "50px",
            top: "60px",
            fontWeight: "bold",
            fontFamily:
              "Istok Web, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans','Liberation Sans', sans-serif",
            width: " 164px",
            height: "18px;",
            flexDirection: "column",
          }}
        >
          Articles
        </div>
      </div>

      {approveArticles.map((e: { _id: any; title: string; author: string }) => {
        return (
          <ArticleCard
            id={e._id}
            title={e.title}
            description={e.author}
            buttonText={"Approve"}
          />
        );
      })}
    </>
  );
}
export default ArticleApprove;
