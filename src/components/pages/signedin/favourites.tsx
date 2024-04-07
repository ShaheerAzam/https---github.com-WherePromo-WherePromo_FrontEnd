import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa"; // Import the heart icon

import Signedin_Navbar from "./signedin_navbar";
import axios, { AxiosError } from "axios";

function Favorites() {
  interface Article {
    createdAt: any;
    _id: string;
    title: string;
    author: string;
    // Add other properties as needed
  }
  interface Shop {
    _id: string;
    city: string;
    author: string;
    // Add other properties as needed
  }

  // State variables to manage selected option and favorite items for articles and shops
  const [selectedOption, setSelectedOption] = useState("articles");
  const [favoriteArticles, setFavoriteArticles] = useState<Article[]>([]);
  const [favoriteShops, setFavoriteShops] = useState<Shop[]>([]);

  useEffect(() => {
    fetchArticlesData();
  }, []);

  const fetchArticlesData = async () => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        const response = await axios.get<{
          data: Article[];
        }>(
          "http://localhost:3000/api/v1/articles/favourites/all",
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );
        if (response.status === 200) {
          setFavoriteArticles(response.data.data);
        } else {
          alert("Something went wrong");
        }
      } else {
        alert("Invalid Token");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 404) {
          alert("No Favourite Articles Found");
        } else {
          console.error("Error during fetching Articles:", axiosError);
          alert("Something went wrong");
        }
      } else {
        console.error("Non-Axios error during signin:", error);
        alert("Something went wrong");
      }
    }
  };

  // Function to handle switching between articles and shops
  const handleOptionChange = async (option: React.SetStateAction<string>) => {
    setSelectedOption(option);
    if (option === "articles") {
      await fetchArticlesData();
    } else {
      try {
        const token = window.localStorage.getItem("token");
        if (token) {
          const response = await axios.get<{
            data: Shop[];
          }>(
            "http://localhost:3000/api/v1/shops/favourites/all",
            {
              headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
              },
            }
          );
          if (response.status === 200) {
            setFavoriteShops(response.data.data);
          } else {
            alert("Something went wrong");
          }
        } else {
          alert("Invalid Token");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response && axiosError.response.status === 404) {
            alert("No Favourite Shops Found");
          } else {
            console.error("Error during fetching Articles:", axiosError);
            alert("Something went wrong");
          }
        } else {
          console.error("Non-Axios error during fetching Articles:", error);
          alert("Something went wrong");
        }
      }
    }
  };

  return (
    <>
      <Signedin_Navbar />
      <div className="container flex flex-col items-center justify-center max-w-full mt-10 mb-10">
        {/* Heading */}
        <h1 className="text-3xl text-center mb-4">Favorites</h1>

        {/* Toggle menu */}
        <div className="toggle-menu flex justify-center mb-4">
          <button
            className={`toggle-button ${
              selectedOption === "articles"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            } hover:bg-blue-600 hover:text-white px-4 py-2 rounded-l-md`}
            onClick={() => handleOptionChange("articles")}
          >
            Articles
          </button>
          <button
            className={`toggle-button ${
              selectedOption === "shops"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            } hover:bg-blue-600 hover:text-white px-4 py-2 rounded-r-md`}
            onClick={() => handleOptionChange("shops")}
          >
            Shops
          </button>
        </div>

        {/* Display favorite items based on selected option */}
        {selectedOption === "articles" && (
          <div className="favorite-articles">
            {favoriteArticles.map((article) => (
              <div
                key={article._id}
                className="flex flex-col grow px-6 py-7 mx-auto w-full font-medium bg-white rounded-3xl shadow leading-[124.5%] max-md:px-5 max-md:mt-10 relative"
              >
                <img
                  loading="lazy"
                  srcSet="src\assets\article.png"
                  className="w-full aspect-[1.56]"
                />
                <div className="mt-6 flex items-center">
                  <div className="text-lg tracking-wide text-zinc-950">
                    {article.title}
                  </div>
                  <FaHeart className="ml-2 cursor-pointer text-gray-500" />
                </div>
                <div className="flex gap-5 justify-between mt-6 text-base tracking-normal text-slate-500">
                  <div>{article.createdAt}</div>
                  <div className="flex-auto">by {article.author}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedOption === "shops" && (
          <div className="favorite-shops flex justify-center flex-wrap">
            {favoriteShops.map((shop) => (
              <div
                key={shop._id}
                className="flex flex-col items-center relative"
              >
                <img
                  loading="lazy"
                  src="src/assets/store.png"
                  className="w-full aspect-[0.87]"
                />
                <div className="mt-2 text-base">
                  {shop.author}, {shop.city}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Favorites;
