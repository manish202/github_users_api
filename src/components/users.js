import {useEffect,useContext} from "react";
import MainTable from "./main_table";
import {MyContext} from "../App";
import {defvalforpagi} from "./reducer";
const loadWithPagination = (pagination,updateUdata,updatePagination) => {
    let x = localStorage.getItem("github_users");
    if(x){
        x = JSON.parse(x);
        let {end,limit,total_records} = pagination;
        updatePagination({end,limit,total_records:x.length});
        x = x.slice(0,end);
        updateUdata(x,"uData");
    }
}
const getData = ({updateLoading,updateUdata,isOnline,pagination,info,updatePagination}) => {
    updateLoading(true,"uData");
    updateUdata({message:false},"uData");
    updatePagination(defvalforpagi);
    if(isOnline){
        console.log("REQUESTING FOR FETCH DATA...");
        fetch(`https://api.github.com/users?per_page=100`).then(data => data.json()).then((data) => {
            updateLoading(false,"uData");
            if(Array.isArray(data)){
                let my_need = [];
                data.forEach((val) => {
                    let {id,login,avatar_url,html_url} = val;
                    my_need.push({id,login,avatar_url,html_url});
                })
                localStorage.setItem("github_users",JSON.stringify(my_need));
                loadWithPagination(pagination,updateUdata,updatePagination);
            }else{
                updateUdata({message:"No Records Found"},"uData");
            }
        }).catch(err => {
            updateLoading(false,"uData");
            updateUdata({message:"Fetch Error Found."},"uData");
        })
    }else{
        updateLoading(false,"uData");
        let x = localStorage.getItem("github_users");
        if(x){
            loadWithPagination(pagination,updateUdata,updatePagination);
        }else{
            updateUdata({message:"You Are Now Offline & No Offline Data Available"},"uData");
        }
    }
}
function Users(){
    console.log(`I Am Users Component.`);
    let {uData,updateLoading,updateUdata,isOnlineNow,updatePagination} = useContext(MyContext);
    let {isLoading,info,target,pagination} = uData;
    useEffect(() => {
        getData({updateLoading,updateUdata,isOnline:isOnlineNow[0],pagination,info,updatePagination});
    },[isOnlineNow[0]]);
    useEffect(() => {
        loadWithPagination(pagination,updateUdata,updatePagination);
    },[pagination.end]);
    return <MainTable target={target} isLoading={isLoading} info={info} />
}
export default Users;