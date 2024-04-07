import { useParams } from "react-router-dom";
import coverImage from "../basic/articlecover.png";
import Navbar from "./navbar";
import { useEffect, useState } from "react";
import axios from "axios";

function DetailedArticle() {
  const { id } = useParams();
  let [articleData, setData] = useState<any>({});

  useEffect(() => {
    async function fetchArticle() {
      // const token = window.localStorage.getItem("token");
      // if (!token ) {
      //   throw new Error("no token supplied");
      // }
      const response = await axios.get(
        `http://localhost:3000/api/v1/articles/${id}`,
        {
          headers: {
            // Authorization: `Bearer ${JSON.parse(token)}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (response.status == 200) {
        console.log(response.data.data);
        setData(response.data.data);
      } else {
        alert("Hello");
      }
    }
    fetchArticle();
  }, []);

  // Fetch the article data based on the ID and display it

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-full">
        <img
          src={coverImage} // Use the imported image
          alt="Article Cover"
          className="w-full aspect-[3.33] max-md:max-w-full"
        />
        <div className="flex flex-col self-center px-5 mt-24 w-full max-w-screen-lg max-md:mt-10 max-md:max-w-full">
          <div className="self-center text-5xl tracking-widest leading-[69.12px] text-zinc-800 max-md:text-4xl">
            Article {articleData.title}
          </div>
          <div className="mt-14 text-base font-bold tracking-normal leading-5 underline text-neutral-600 max-md:mt-10 max-md:max-w-full">
            By {articleData.author}
          </div>
          <div className="mt-5 text-base font-medium tracking-normal leading-5 text-neutral-600 max-md:max-w-full">
            {articleData.createdAt}
          </div>
          <div className="mt-14 text-xl leading-10 text-zinc-400 max-md:mt-10 max-md:max-w-full">
            {articleData.content}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailedArticle;
