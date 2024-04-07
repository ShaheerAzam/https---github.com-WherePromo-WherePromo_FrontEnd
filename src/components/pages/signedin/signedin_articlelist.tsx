import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";

interface Article {
  _id: string;
  title: string;
  createdAt: string;
  author: string;
  isFavorite: boolean; // Added isFavorite property
}

function Signedin_ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 5;

  useEffect(() => {
    const fetchArticles = async (page: number) => {
      try {
        const token = window.localStorage.getItem("token");
        if (!token) {
          throw new Error("no token supplied");
        }
        const response = await axios.get(
          `http://localhost:3000/api/v1/articles/?sort_by=createdAt&page=${page}&per_page=${perPage}&order_by=desc`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        if (response.status === 200) {
          setArticles(response.data.data);
          const totalCount = response.data.meta_data.total_count || 0;
          const calculatedTotalPages = totalCount > 0 ? Math.ceil(totalCount / perPage) : 1;
          setTotalPages(calculatedTotalPages);
        } else {
          alert("Error fetching articles");
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles(currentPage);
  }, [currentPage]);

  const toggleFavorite = async (articleId: string) => {
    try {
      const token = window.localStorage.getItem("token");
      if (!token) {
        throw new Error("no token supplied");
      }
      const articleIndex = articles.findIndex((article) => article._id === articleId);
      const updatedArticles = [...articles];
      updatedArticles[articleIndex].isFavorite = !updatedArticles[articleIndex].isFavorite;
      setArticles(updatedArticles);

      // Call API to toggle favorite status
      const response = await axios.post(
        `http://localhost:3000/api/v1/articles/${articleId}/toggle-favorite`,
        null, // If required, pass any payload here
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (response.status === 200) {
        alert("Success");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col items-center self-stretch pl-12 mt-9 w-full max-md:pl-5 max-md:max-w-full">
      <div className="self-stretch max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          {articles.map((article) => (
            <Link to={`/article/${article._id}`} key={article._id}>
              <div className="flex flex-col w-[100%] max-md:ml-0 max-md:w-full" key={article._id}>
                <div className="flex flex-col grow px-6 py-7 mx-auto w-full font-medium bg-white rounded-3xl shadow leading-[124.5%] max-md:px-5 max-md:mt-10 relative">
                  <img
                    loading="lazy"
                    srcSet="src\assets\article.png"
                    className="w-full aspect-[1.56]"
                  />
                  <div className="mt-6 text-lg tracking-wide text-zinc-950">
                    {article.title}
                  </div>
                  <br />
                  <div className="block gap-5 justify-between mt-6 text-base tracking-normal text-slate-500">
                    <div>{article.createdAt}</div>
                    <div className="flex-auto"> by {article.author}</div>
                  </div>
                  <FaHeart
                    className={`absolute top-3 right-3 cursor-pointer ${
                      article.isFavorite ? "text-red-500" : "text-gray-500"
                    }`}
                    onClick={() => toggleFavorite(article._id)}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 flex items-center">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span className="mx-3">Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
      <div className="mt-36 ml-6 text-3xl tracking-widest leading-10 text-center text-zinc-800 max-md:mt-10 max-md:max-w-full">
        Navigate Your Retail Adventure
      </div>
      <div className="mt-11 ml-6 text-xl text-center text-zinc-400 max-md:mt-10 max-md:max-w-full">
        Find your required market place with great ease, through the map.
      </div>
    </div>
  );
}

export default Signedin_ArticleList;


// import axios from "axios";
// import { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
// import { FaHeart } from "react-icons/fa";

// interface Article {
//   _id: string;
//   title: string;
//   createdAt: string;
//   author: string;
// }

// function Signedin_ArticleList() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const perPage = 5;
//   const [articles, setArticles] = useState<Article[]>([]); // Initialize as empty array

//   useEffect(() => {
//     async function fetchArticles(page: number) {
//       const token = window.localStorage.getItem("token");
//       if (!token) {
//         throw new Error("no token supplied");
//       }
//       const response = await axios.get(
//         `http://localhost:3000/api/v1/articles/?sort_by=createdAt&page=${page}&per_page=${perPage}&order_by=desc`,
//         {
//           headers: {
//             Authorization: `Bearer ${JSON.parse(token)}`,
//             "Access-Control-Allow-Origin": "*",
//           },
//         }
//       );
//       if (response.status === 200) {
//         setArticles(response.data.data);
//         const totalCount = response.data.meta_data.total_count || 0;
//         const calculatedTotalPages = totalCount > 0 ? Math.ceil(totalCount / perPage) : 1;
//         setTotalPages(calculatedTotalPages);
//       } else {
//         alert("Error fetching articles");
//       }
//     }
//     fetchArticles(currentPage);
//   }, [currentPage]);

//   // Function to toggle favorite status
//   const toggleFavorite = async (articleId: string) => {
//     const token = window.localStorage.getItem("token");
//     if (!token) {
//       throw new Error("no token supplied");
//     }
//     try {
//       const response = await axios.post(
//         `http://localhost:3000/api/v1/favourites/like`,
//         { itemId: articleId, itemType: "article" },
//         {
//           headers: {
//             Authorization: `Bearer ${JSON.parse(token)}`,
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             "Access-Control-Allow-Origin": "*",
//           },
//         }
//       );
//       if (response.status === 200) {
//         // Handle success
//       }
//     } catch (error) {
//       // Handle error
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center self-stretch pl-12 mt-9 w-full max-md:pl-5 max-md:max-w-full">
//       <div className="self-stretch max-md:max-w-full">
//         <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//           {articles.map((article) => (
//             <Link to={`/article/signedin_home/${article._id}`} key={article._id}>
//               <div className="flex flex-col w-[100%] max-md:ml-0 max-md:w-full" key={article.title}>
//                 <div className="flex flex-col grow px-6 py-7 mx-auto w-full font-medium bg-white rounded-3xl shadow leading-[124.5%] max-md:px-5 max-md:mt-10">
//                   <img
//                     loading="lazy"
//                     srcSet="src\assets\article.png"
//                     className="w-full aspect-[1.56]"
//                   />
//                   <div className="mt-6 text-lg tracking-wide text-zinc-950">
//                     {article.title}
//                   </div>
//                   <br />
//                   <div className="block gap-5 justify-between mt-6 text-base tracking-normal text-slate-500">
//                     <div>{article.createdAt}</div>
//                     <div className="flex items-center">
//                       <div>by {article.author}</div>
//                       <button onClick={() => toggleFavorite(article._id)} className="ml-2">
//                         <FaHeart size={24} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//         <div className="mt-6 flex items-center">
//           <button onClick={handlePreviousPage} disabled={currentPage === 1}>
//             Previous
//           </button>
//           <span className="mx-3">Page {currentPage} of {totalPages}</span>
//           <button onClick={handleNextPage} disabled={currentPage === totalPages}>
//             Next
//           </button>
//         </div>
//       </div>
//       <div className="mt-36 ml-6 text-3xl tracking-widest leading-10 text-center text-zinc-800 max-md:mt-10 max-md:max-w-full">
//         Navigate Your Retail Adventure
//       </div>
//       <div className="mt-11 ml-6 text-xl text-center text-zinc-400 max-md:mt-10 max-md:max-w-full">
//         Find your required market place with great ease, through the map.
//       </div>
//     </div>
//   );
// }

// export default Signedin_ArticleList;
