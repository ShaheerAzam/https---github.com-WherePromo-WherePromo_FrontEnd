import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const MyMapComponent = () => {
  const [entityLocations, setEntityLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [shops, setShops] = useState([]);
  const [shopCities, setShopCities] = useState([]);

  const geocodeLocation = async (query) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=50&q=${query}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      setEntityLocations((currentLocations) => [
        ...currentLocations,
        {
          locations: data.map((result) => ({
            name: result.display_name,
            position: [parseFloat(result.lat), parseFloat(result.lon)],
          })),
        },
      ]);
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  };

  const handleSearch = () => {
    geocodeLocation(searchQuery);
  };

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/shops');
        setShops(response.data.data);

        const uniqueCities = [
          ...new Set(response.data.data.map((shop) => shop.city)),
        ];
        setShopCities(uniqueCities);
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    };

    fetchShops();
  }, []);

  useEffect(() => {
    shopCities.forEach((city) => {
      geocodeLocation(city);
    });
  }, [shopCities]);

  return (
    <div>
      <input
        type="text"
        className="relative left-3/4 'flex gap-5 items-start px-6 py-3.5 text-base leading-10 border border-solid border-stone-500 rounded-[32px] text-zinc-400 max-md:flex-wrap max-md:px-5 max-md:max-w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        className="relative left-3/4 m-10 justify-center self-start  text-xl p-5 text-white whitespace-nowrap rounded-3xl max-md:px-5 bg-sky-600 "
        onClick={handleSearch}
      >
        Search
      </button>

      <MapContainer
        center={[31.5204, 74.3587]}
        zoom={8}
        style={{ display: 'flex', margin: 'auto', marginTop: '20px', width: '80vw', height: '50vh' }}
      >
        <TileLayer
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}@2x.png?key=3WEwwi7Mdet50CNaLEFM"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {entityLocations.map((entity, index) => (
          <React.Fragment key={index}>
            {entity.locations.map((location, locationIndex) => (
              <Marker key={locationIndex} position={location.position}>
                <Popup>{location.name}</Popup>
              </Marker>
            ))}
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
};

export default MyMapComponent;
