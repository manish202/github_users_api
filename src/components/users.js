import {useEffect,useContext} from "react";
import MainTable from "./main_table";
import {MyContext} from "../App";
import {defvalforpagi} from "./reducer";
const loadWithPagination = (updateUdata,pagination,info) => {
    let {start,end,limit} = pagination;
    let x = localStorage.getItem("github_users");
    if(x){
        x = JSON.parse(x);
        x = x.slice(start,end);
        x = Array.isArray(info)? [...info,...x]:x;
        updateUdata(x,"uData");
    }
}
const getData = (updateLoading,updateUdata,isOnline,info,updateTotalRecInPagi,updatePagination) => {
    console.log(defvalforpagi);
    // updatePagination({start:defvalforpagi.end,end:defvalforpagi.end+defvalforpagi.limit});
    if(isOnline){
        updateLoading(true,"uData");
        fetch(`https://api.github.com/users?per_page=100`).then(data => data.json()).then(data => {
            updateLoading(false,"uData");
            if(Array.isArray(data)){
                let my_need = [];
                data.forEach((val) => {
                    let {id,login,avatar_url,html_url} = val;
                    my_need.push({id,login,avatar_url,html_url});
                })
                localStorage.setItem("github_users",JSON.stringify(my_need));
                updateTotalRecInPagi(my_need.length);
            }else{
                updateUdata({message:"No Records Found"},"uData");
            }
        }).catch(err => {
            updateLoading(false,"uData");
            updateUdata({message:"Fetch Error Found."},"uData");
        })
    }else{
        updateLoading(false,"uData");
        if(!Array.isArray(info)){
            let x = localStorage.getItem("github_users");
            if(x){
                x = JSON.parse(x);
                updateTotalRecInPagi(x.length);
                updateUdata(x,"uData");
            }else{
                updateUdata({message:"You Are Now Offline & No Offline Data Available"},"uData");
            }
        }
    }
}
function Users(){
    console.log(`I Am Users Component.`);
    let {updateLoading,updateUdata,uData,isOnlineNow,updateTotalRecInPagi,updatePagination} = useContext(MyContext);
    let {isLoading,info,target,pagination} = uData;
    useEffect(() => {
        getData(updateLoading,updateUdata,isOnlineNow[0],info,updateTotalRecInPagi,updatePagination);
    },[isOnlineNow[0]]);
    useEffect(() => {
        loadWithPagination(updateUdata,pagination,info);
    },[pagination.start]);
    return <MainTable target={target} isLoading={isLoading} info={info} />
}
export default Users;