import {useState,useEffect} from "react";
import MainTable from "./main_table";
const getLocalData = (name) => {
    try{
        let x = localStorage.getItem(name);
        if(x && Array.isArray(JSON.parse(x))){
            return JSON.parse(x);
        }else{
            return []
        }
    }catch(err){
        return []
    }
}
function Users({isOnlineNow}){
    console.log(`I Am Users Component.`);
    let [udata,updateUdata] = useState({message:false});
    let [isLoading,updateLoading] = useState(false);
    let [pagination,updatePagination] = useState({page:1,limit:5,showLoadMore:true});
    let [search,updateSearchTerm] = useState("");
    let [onlineStatus] = isOnlineNow;
    let loadByData = (x) => {
        let {page,limit} = pagination;
        let offset = (page - 1)*limit;
        x = x.slice(0,offset+limit);
        updateUdata(x);
    }
    let loadWithPagination = () => {
        let x = getLocalData("github_users");
        if(x.length > 0){
            if(search !== ""){
                x = x.filter((obj) => obj.login.match(new RegExp(search,"gi")));
                x.length === 0 ? updateUdata({message:"No Search Data Found!"}):loadByData(x);
            }else{
                loadByData(x);
            }
        }else{
            updateUdata({message:"No Data Available In Your Storage!"});
        }
    }
    let paginate = () => {
        updatePagination(old => {
            return {...old,page:old.page+1}
        })
    }
    let updateSearch = (data) => {
        updateSearchTerm(data);
        updatePagination(old => {
            return {...old,page:1}
        })
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
            loadWithPagination();
        }
    }
    useEffect(() => {
        getData();
    },[onlineStatus]);
    useEffect(() => {
        updateLoading(true);
        let x = setTimeout(() => {
            updateLoading(false);
            loadWithPagination();
        }, 300);
    },[pagination.page,search]);
    return <MainTable obj={{target:"users",udata,isLoading,search,updateSearch,paginate,pagination}} />
}
export default Users;
export {getLocalData};