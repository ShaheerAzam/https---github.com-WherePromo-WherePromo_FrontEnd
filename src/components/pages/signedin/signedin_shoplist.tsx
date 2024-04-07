import axios from "axios";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
// import { FaHeart } from "react-icons/fa"; // Import the heart icon

function Signedin_ShopList() {
  const [, setSelectedShop] = useState<string | null>(null);
  const [popupVisible, setPopupVisible] = useState(false);
  // const [favoriteShops, setFavoriteShops] = useState<string[]>([]); // State to manage favorite shops

  const [shops, setShops] = useState<any>([]);
  const [articlesList, setArticlesList] = useState<any>([]);
  

  useEffect(() => {
    async function fetchShops() {
      const token = window.localStorage.getItem("token");
      if (!token) {
        throw new Error("no token supplied");
      }
      const response = await axios.get(
        "http://localhost:3000/api/v1/shops",
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (response.status == 200) {
        console.log(response.data.data);
        setShops(response.data.data);
      } else {
        alert("Hello");
      }
    }
    fetchShops();
  }, []);

  const handleShopClick = async (shopName: string) => {
    setSelectedShop(shopName);
    const token = window.localStorage.getItem("token");
    if (!token) {
      throw new Error("no token supplied");
    }
    const response = await axios.get(
      `http://localhost:3000/api/v1/shops/${shopName}/articles`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    if (response.status == 200) {
      console.log(response.data.data.articles);
      setArticlesList(response.data.data.articles);
    } else {
      alert("Hello");
    }
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  // Dummy data for active promotions (replace with actual data as needed)
  // const activePromotions = [
  //   { articleName: "Article 1", articleDate: "xyz", articleLink: "#" },
  //   { articleName: "Article 2", articleDate: "xyz", articleLink: "#" },
  //   { articleName: "Article 3", articleDate: "xyz", articleLink: "#" },
  // ];

  // Toggle favorite status of a shop
  // const toggleFavoriteShop = (shopName: string) => {
  //   if (favoriteShops.includes(shopName)) {
  //     // Remove shop from favorites
  //     setFavoriteShops(favoriteShops.filter((shop) => shop !== shopName));
  //   } else {
  //     // Add shop to favorites
  //     setFavoriteShops([...favoriteShops, shopName]);
  //   }
  // };

  return (
    <div className="mt-14 text-2xl text-center text-zinc-400 max-md:mt-10">
      Relevant Shops
      <div className="flex gap-5 justify-between px-5 mt-14 w-full max-w-[1400px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
        {shops.map(
          (e: {
            _id: string;
            name: string | number | boolean;
            city: string | number | boolean | null | undefined;
          }) => {
            return (
              <div
                className="flex flex-col items-center"
                onClick={() => handleShopClick(e._id)}
              >
                <img
                  loading="lazy"
                  srcSet="src\assets\store.png"
                  className="flex-1 w-full aspect-[0.87]"
                  alt="Shop 1"
                />
                <div className="mt-2 text-base">{e.name}</div>
                <div className="mt-2 text-base">{e.city}</div>
                {/* <FaHeart
            className={`absolute top-2 right-2 cursor-pointer ${
              favoriteShops.includes({e._id}) ? 'text-red-500' : 'text-gray-500'
            }`}
            onClick={() => toggleFavoriteShop({e._id})}
          /> */}
              </div>
            );
          }
        )}

        {/* <div className="flex flex-col items-center relative">
          <img
            loading="lazy"
            src="src/assets/store.png" 
            className="w-full aspect-[0.87]" 
            alt="Shop 1"
            onClick={() => handleShopClick("Shop 1")}
          />
          <div className="mt-2 text-base">Store Name 1</div>

          <FaHeart
            className={`absolute top-2 right-2 cursor-pointer ${
              favoriteShops.includes("Shop 1") ? 'text-red-500' : 'text-gray-500'
            }`}
            onClick={() => toggleFavoriteShop("Shop 1")}
          />
        </div>
        <div className="flex flex-col items-center relative">
          <img
            loading="lazy"
            src="src/assets/store.png" 
            className="w-full aspect-[0.87]" 
            alt="Shop 2"
            onClick={() => handleShopClick("Shop 2")}
          />
          <div className="mt-2 text-base">Store Name 2</div>
          {/* Heart icon for favorite shop */}
        {/*<FaHeart
            className={`absolute top-2 right-2 cursor-pointer ${
              favoriteShops.includes("Shop 2") ? 'text-red-500' : 'text-gray-500'
            }`}
            onClick={() => toggleFavoriteShop("Shop 2")}
          />
          </div>*/}
      </div>
      {popupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="rounded-lg bg-white p-4 max-w-xl relative">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={handleClosePopup}
            >
              x
            </button>
            <h2 className="text-xl font-semibold mb-4">Active Promotions</h2>

            <div>
              {articlesList.map(
                (
                  promotion: {
                    title:
                      | string
                      | number
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | ReactPortal
                      | null
                      | undefined;
                    createdAt:
                      | string
                      | number
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | ReactPortal
                      | null
                      | undefined;
                    _id: any;
                  },
                  index: Key | null | undefined
                ) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-gray-100 p-2 mb-2"
                  >
                    <div>
                      {promotion.title} {promotion.createdAt}
                    </div>
                    <a
                      href={`signedin_articles/${promotion._id}`}
                      className="text-blue-500"
                    >
                      {">"}
                    </a>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
      <div className="mt-16 text-xl text-center text-zinc-400 max-md:mt-10">
        Select a shop to view promotions
      </div>
      <div className="mt-36 text-xl text-center text-stone-900 w-[847px] mx-auto max-md:mt-10 max-md:max-w-full">
        Explore curated articles and uncover hidden gems worldwide. Our AI
        recommends shops with exclusive promotions, enhancing your shopping
        experience. Navigate with ease using our interactive map, saving time
        and discovering top-rated spots effortlessly.
      </div>
    </div>
  );
}

export default Signedin_ShopList;
