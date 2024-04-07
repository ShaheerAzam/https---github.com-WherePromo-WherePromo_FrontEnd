import axios from "axios";
import "./Article_Approve_Card.css";

interface Article {
  title: string;
  description: string;
  buttonText: string;
}

interface ArticleCardProps extends Article {
  id: any;
} // Extend the Article interface

const approve = async (id: any) => {
  const token = window.localStorage.getItem("token");
  if (!token) {
    throw new Error("no token supplied");
  }
  const response = await axios.patch(
    `http://localhost:3000/api/v1/articles/${id}/approve`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  if (response.status == 200) {
    alert("Success");
  }
};

const ArticleCard = (props: ArticleCardProps) => (
  <div className="card">
    <h1>{props.title}</h1>
    <p>{props.description}</p>
    <button onClick={() => approve(props.id)}>{props.buttonText}</button>
  </div>
);

export default ArticleCard;
