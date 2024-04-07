import axios from "axios";
import { useState, useEffect } from "react";
import ContributionCard from "./Contribution_Approve_Card";
import Admin_Navbar from "./admin_navbar";

function Contributions() {
  let [contributions, setContributions] = useState<any>([]);

  useEffect(() => {
    async function fetchContributions() {
      const token = window.localStorage.getItem("token");
      if (!token) {
        throw new Error("no token supplied");
      }
      const response = await axios.get(
        `http://localhost:3000/api/v1/flyers/contributed/`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (response.status == 200) {
        console.log(response.data.data);
        setContributions(response.data.data);
      } else {
        alert("Hello");
      }
    }
    fetchContributions();
  }, []);

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
          Contributions
        </div>
      </div>
      {contributions.map((e: { _id: any; name: string; details: string }) => {
        return (
          <ContributionCard
            id={e._id}
            title={e.name}
            date={""}
            description={e.details}
            buttonText={"Approve"}
          />
        );
      })}
    </>
  );
}
export default Contributions;
