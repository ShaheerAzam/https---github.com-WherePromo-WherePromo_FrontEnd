
import axios from "axios";
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

interface Article {
  _id: string;
  title: string;
  createdAt: string;
  author: string;
}

function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]); // Initialize as empty array
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); 
  const perPage = 5; 

  useEffect(() => {
    const fetchArticles = async (page: number) => {
      try { 
        const response = await axios.get(
          `http://localhost:3000/api/v1/articles/?sort_by=createdAt&page=${page}&per_page=${perPage}&order_by=desc`,
          { headers: { "Access-Control-Allow-Origin": "*" } }
        );
        console.log("API Response:", response);


        if (response.status === 200) {
          setArticles(response.data.data);

const totalCount = response.data.meta_data.total_count || 0;
          const calculatedTotalPages = totalCount > 0 ? Math.ceil(totalCount / perPage) : 1;
          setTotalPages(calculatedTotalPages);
          console.log("calculatedTotalPages:", calculatedTotalPages); 
        } else {
          alert("Error fetching articles"); 
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles(currentPage);
  }, [currentPage]);

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

          <div className="flex flex-col w-[100%] max-md:ml-0 max-md:w-full" key={article.title}> 
              <div className="flex flex-col grow px-6 py-7 mx-auto w-full font-medium bg-white rounded-3xl shadow leading-[124.5%] max-md:px-5 max-md:mt-10">
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

export default ArticleList;
