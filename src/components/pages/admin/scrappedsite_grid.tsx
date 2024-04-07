import { useEffect, useState } from "react";
import Admin_Navbar from "./admin_navbar";
import ScrappedSite from "./scrappedsite_card";
import axios from "axios";

function ScrappedSiteGrid() {
  let [scrappedSite, setScrappedSites] = useState<any>([]);
  useEffect(() => {
    async function fetchScrappedSites() {
      const token = window.localStorage.getItem("token");
      if (!token) {
        throw new Error("no token supplied");
      }
      const response = await axios.get(
        "http://localhost:3000/api/v1/siteScrapping/scrappedData",
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (response.status == 200) {
        console.log(response.data.data);
        setScrappedSites(response.data.data);
      } else {
        alert("Hello");
      }
    }
    fetchScrappedSites();
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
            width: " 200px",
            height: "18px;",
            flexDirection: "column",
          }}
        >
          Scrapped Sites
        </div>
      </div>

      {scrappedSite.map((e: { _id: any; website_url: string }) => {
        return (
          <ScrappedSite
            id={e._id}
            title={e.website_url}
            date={""}
            description={""}
            buttonText={"Approve"}
          />
        );
      })}
    </>
  );
}
export default ScrappedSiteGrid;
