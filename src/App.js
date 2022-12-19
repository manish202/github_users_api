import Header from "./components/header";
import Home from "./components/home";
import Users from "./components/users";
import Bookmarks from "./components/bookmarks";
import IsOnline from "./components/isonline";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import {useReducer,createContext} from "react";
import {reducer,initialData} from "./components/reducer";
import "./swRegister";
export let MyContext = createContext();
function App(){
  console.log("I Am App Component");
  let [state,dispatch] = useReducer(reducer,initialData);
  let updateIsOnlineOrNot = (data) => dispatch({type:"IS_ONLINE",data});
  return <MyContext.Provider value={{...state,updateIsOnlineOrNot}}>
          <BrowserRouter>
            <Header/>
            <IsOnline />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
            </Routes>
          </BrowserRouter>
        </MyContext.Provider>
}
export default App;