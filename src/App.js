import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import { useCommonContext } from './context/CommonContext';
import { MainPage, WelcomePage } from './pages';
import axios from 'axios';

function App() {
  const {name, setName} = useCommonContext();
  const [imageUrl, setImageUrl] = useState();

  const fetchUnsplashApi = async() => {
    try {
      const {data} = await axios.get(
        "https://api.unsplash.com/photos/random/?client_id=zJ9f9avxrS-Tt2UYC4hK1eh7vRmny7QUiLxMQN9l4S8&&orientation=landscape&&query=travel%20dark"
      );
      console.log(data?.urls?.regular);
      setImageUrl(data?.urls?.regular);
    } catch(e) {
        console.log(e);
    }
  } 

  useEffect(() => {
    fetchUnsplashApi();
  }, []);

  useEffect(() => {
    setName(localStorage.getItem("username"));
  }) 

  return (
    <div 
      className="h-100"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover"
      }}
    >
      {
        name ? <MainPage /> : <WelcomePage />
      }
    </div>
  );
}

export default App;
