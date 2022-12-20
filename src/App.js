import Header from "./components/header";
import Home from "./components/home";
import Users from "./components/users";
import Bookmarks from "./components/bookmarks";
import IsOnline from "./components/isonline";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import {useState} from "react";
import "./swRegister";
function App(){
  console.log("I Am App Component");
  let [isOnlineNow,updateIsOnlineOrNot] = useState([true,false]);
  return <BrowserRouter>
          <Header/>
          <IsOnline obj={{isOnlineNow,updateIsOnlineOrNot}} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users isOnlineNow={isOnlineNow} />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
          </Routes>
        </BrowserRouter>
}
export default App;