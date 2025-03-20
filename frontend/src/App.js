import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [symbol, setSymbol] = useState("NVDA");  // ✅ ค่าเริ่มต้นเป็น "NVDA"
  const [news, setNews] = useState([]);

  const fetchNews = () => {
    axios.get(`http://127.0.0.1:5000/api/news/${symbol}`)
      .then(response => {
        console.log("Data received:", response.data);
        setNews(response.data);
      })
      .catch(error => console.error("Error fetching news:", error));
  };

  useEffect(() => {
    fetchNews(); 
  }, []);

  return (
    <div>
      <h1>Stock News</h1>
      <input 
        type="text" 
        value={symbol} 
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
      />
      <button onClick={fetchNews}>Get News</button>
      
      <ul>
        {news.length > 0 ? (
          news.map((item, index) => (
            <li key={index}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a> <i>({item.date})</i>
            </li>
          ))
        ) : (
          <p>Loading news...</p>
        )}
      </ul>
    </div>
  );
}

export default App;
