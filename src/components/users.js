import {useState,useEffect,useContext} from "react";
import MainTable from "./main_table";
import {MyContext} from "../App";
function Users(){
    console.log(`I Am Users Component.`);
    let [udata,updateUdata] = useState({message:false});
    let [isLoading,updateLoading] = useState(false);
    let [search,updateSearch] = useState("");
    let {isOnlineNow} = useContext(MyContext);
    let [onlineStatus] = isOnlineNow;
    let [pagination,updatePagination] = useState({start:0,end:24,limit:24});
    let loadWithPagination = () => {
        let {start,end,limit} = pagination;
        let x = localStorage.getItem("github_users");
        if(x){
            x = JSON.parse(x);
            // updatePagination(old => {
            //     return {...old,end:old.end+old.limit}
            // });
            updatePagination({start,end:end+limit,limit});
            x = x.slice(start,end);
            updateUdata(x);
        }else{
            updateUdata({message:"No Data Available In Your Storage!"});
        }
    }
    let getData = () => {
        if(onlineStatus){
            updateLoading(true);
            console.log("Requesting For Api Data...");
            fetch(`https://api.github.com/users?per_page=100`).then(data => data.json()).then(data => {
                updateLoading(false);
                if(Array.isArray(data)){
                    let my_need = [];
                    data.forEach((val) => {
                        let {id,login,avatar_url,html_url} = val;
                        my_need.push({id,login,avatar_url,html_url});
                    })
                    localStorage.setItem("github_users",JSON.stringify(my_need));
                    loadWithPagination();
                }else{
                    updateUdata({message:"Something Is Wrong!"});
                }
            }).catch(err => {
                updateLoading(false);
                updateUdata({message:"Fetch Error Found!"});
            });
        }else{
            let x = localStorage.getItem("github_users");
            if(x){
                loadWithPagination();
            }else{
                updateUdata({message:"You Are Now Offline & No Offline Data Available!"});
            }
        }
    }
    useEffect(() => {
        getData();
    },[onlineStatus]);
    return <MainTable obj={{target:"users",udata,isLoading,search,updateSearch,loadWithPagination}} />
}
export default Users;