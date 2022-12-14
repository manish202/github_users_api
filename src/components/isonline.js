import {useContext,useEffect} from "react";
import {MyContext} from "../App";
function IsOnline(){
    let {updateIsOnlineOrNot,isOnlineNow} = useContext(MyContext);
    useEffect(() => {
        window.addEventListener("online",(e) => {
            updateIsOnlineOrNot([true,true]);
            setTimeout(() => updateIsOnlineOrNot([true,false]),5000);
        });
        window.addEventListener("offline",(e) => {
            updateIsOnlineOrNot([false,true]);
        })
    },[]);
    return(
        <>
            {isOnlineNow[0] && isOnlineNow[1] && <div className="alert alert-success">Internet Is Connected.</div>}
            {!isOnlineNow[0] && isOnlineNow[1] && <div className="alert alert-warning">You Are Now Offline! Please Check Internet Connection.</div>}
        </>
    )
}
export default IsOnline;