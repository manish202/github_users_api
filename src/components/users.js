import {useEffect,useContext} from "react";
import MainTable from "./main_table";
import {MyContext} from "../App";
const getData = async () => (await fetch(`https://api.github.com/users?per_page=100`)).json();
function Users(){
    console.log(`I Am Users Component.`);
    let {updateLoading,updateUdata,...obj} = useContext(MyContext);
    let {uData} = obj;
    let {isLoading,info,target} = uData;
    useEffect(() => {
        updateLoading(true,"uData");
        getData().then(data => {
            if(Array.isArray(data)){
                let my_need = [];
                data.forEach((val) => {
                    let {id,login,avatar_url,html_url} = val;
                    my_need.push({id,login,avatar_url,html_url});
                })
                localStorage.setItem("github_users",JSON.stringify(my_need));
                updateLoading(false,"uData");
                updateUdata(my_need,"uData");
            }else{
                updateUdata({message:"No Records Found"},"uData");
            }
        }).catch(err => {
            updateUdata({message:"Fetch Error Found."},"uData");
        })
    },[]);
    return <MainTable target={target} isLoading={isLoading} info={info} />
}
export default Users;