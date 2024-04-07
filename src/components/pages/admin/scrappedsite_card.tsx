import axios from "axios";
import "./scrappedsite_card.css";
interface ScrappedSite {
  id: any;
  title: string;
  date: string;
  description: string;
  buttonText: string;
}

interface ScrappedSiteCardProps extends ScrappedSite {} // Extend the Article interface
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
    alert("Sucess");
  }
};

const ScrappedSite = (props: ScrappedSiteCardProps) => (
  <div className="card">
    <p id="review">Scrapped Site</p>
    <h1>{props.title}</h1>
    <p id="date">{props.date}</p>
    <p>{props.description}</p>
    <button onClick={() => approve(props.id)}>{props.buttonText}</button>
  </div>
);

export default ScrappedSite;
