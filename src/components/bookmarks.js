import {useState,useEffect} from "react";
import MainTable from "./main_table";
function Bookmarks(){
    console.log(`I Am Bookmarks Component`);
    let [udata,updateUdata] = useState({message:false});
    let [isLoading,updateLoading] = useState(false);
    let [search,updateSearch] = useState("");
    let [reloadMtb,updateMtb] = useState(false);
    let getData = () => {
        let user_data = localStorage.getItem("github_users");
        let book_marks = localStorage.getItem("github_bkmrk_users");
        if(user_data && book_marks){
            let udata_arr_obj = JSON.parse(user_data);
            let bkmrks_arr = JSON.parse(book_marks);
            if(bkmrks_arr.length > 0 && udata_arr_obj.length > 0){
                let tmp = [];
                if(search){
                    tmp = udata_arr_obj.filter((obj) => bkmrks_arr.includes(obj.id) && obj.login.match(new RegExp(search,"gi")));
                    tmp.length === 0 ? updateUdata({message:"No Match Found"}):updateUdata(tmp);
                }else{
                    tmp = udata_arr_obj.filter((obj) => bkmrks_arr.includes(obj.id));
                    updateUdata(tmp);
                }
            }else{
                updateUdata({message:"No Bookmarks Found"});
            }
        }else{
            updateUdata({message:"No Bookmarks Found"});
        }
    }
    useEffect(() => {
        updateLoading(true);
        let x = setTimeout(() => {
            updateLoading(false);
            getData();
        },300)
        return () => clearTimeout(x);
    },[reloadMtb,search]);
    return <MainTable obj={{target:"bookmarks",udata,isLoading,search,updateSearch,updateMtb}} />
}
export default Bookmarks;