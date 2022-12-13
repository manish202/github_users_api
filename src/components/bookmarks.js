import {useEffect,useContext} from "react";
import MainTable from "./main_table";
import {MyContext} from "../App";
function Bookmarks(){
    console.log(`I Am Bookmarks Component`);
    let {updateUdata,...obj} = useContext(MyContext);
    let {bkmrksData} = obj;
    let {info,target,isLoading,reloadMaintable} = bkmrksData;
    useEffect(() => {
        let user_data = localStorage.getItem("github_users");
        let book_marks = localStorage.getItem("github_bkmrk_users");
        if(user_data && book_marks){
            let udata_arr_obj = JSON.parse(user_data);
            let bkmrks_arr = JSON.parse(book_marks);
            if(bkmrks_arr.length > 0 && udata_arr_obj.length > 0){
                updateUdata(udata_arr_obj.filter((obj) => bkmrks_arr.includes(obj.id)),"bkmrksData");
            }else{
                updateUdata({message:"No Bookmarks Found"},"bkmrksData");
            }
        }else{
            updateUdata({message:"No Bookmarks Found"},"bkmrksData");
        }
    },[reloadMaintable]);
    return <MainTable target={target} isLoading={isLoading} info={info} />
}
export default Bookmarks;