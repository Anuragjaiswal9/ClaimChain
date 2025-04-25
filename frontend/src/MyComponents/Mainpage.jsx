import React, { useEffect, useState } from 'react';
import MyNavbar from './MyNavbar';
import HomeCard from './HomeCard';
import axios from 'axios';

function Mainpage() {
  const [data, setData] = useState([]); // Initialize as an array

  // Fetch and store data in local storage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/items'); // Replace with your API endpoint
        setData(response.data.data.items); // Store the entire array of items
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(data)

  return (
    <div>
      <MyNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((item, index) => (
            <HomeCard
              key={index} // Provide a unique key for each item
              productName={item.productName}
              description={item.description}
              images={item.images}
              location={item.location}
              date={item.date}
              time={item.time}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
