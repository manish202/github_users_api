import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LaunchIcon from '@mui/icons-material/Launch';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import {Link} from "react-router-dom";
import {useState,useEffect,useContext} from "react";
import {MyContext} from "../App";
function toggleBookmark(id,bkmrks,updateBookedArr){
    let x = [];
    if(bkmrks.length > 0){
        if(bkmrks.includes(id)){
            x = bkmrks.filter((val) => val !== id);
        }else{
            x = [...bkmrks,id];
        }
    }else{
        x = [id];
    }
    localStorage.setItem("github_bkmrk_users",JSON.stringify(x));
    updateBookedArr(x);
}
function SingleRow({val,srno,bkmrks,target,updateBookedArr,updateMtb}){
    console.log("I Am SingleRow Component");
    let {id,login,avatar_url,html_url} = val;
    let [isBooked,updateBooked] = useState(false);
    useEffect(() => {
        bkmrks.includes(id) ? updateBooked(true):updateBooked(false);
    },[]);
    function toggle(id){
        updateBooked((old) => !old);
        toggleBookmark(id,bkmrks,updateBookedArr);
        if(target === "bookmarks"){updateMtb()}
    }
    return <tr>
        <td>{srno + 1}</td>
        <td>{id}</td>
        <td><img alt={login} src={avatar_url} title={login} className="avtar" /> {login}</td>
        <td><Link className="btn btn-success" to={`/users/${login}`}><RemoveRedEyeIcon /></Link></td>
        <td><a rel="noreferrer" target="_blank" className="btn btn-light" href={html_url}><LaunchIcon /></a></td>
        <td><button title={isBooked ? "remove":"add"} onClick={() => toggle(id)} className={`btn ${isBooked ? "btn-warning":"btn-primary"}`} type="button"><BookmarkBorderIcon /></button></td>
    </tr>
}
function Loader(){
    console.log("I Am Loader Component");
    return <tr>
    <td colSpan="6">
        <div className="text-center">
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        </div>
    </td>
</tr>
}
function MainTable({target,isLoading,info}){
    console.log("I Am MainTable Component");
    let {bkmrks,updateBookedArr,updateMtb,updatePagination,uData} = useContext(MyContext);
    let {pagination} = uData;
    let {end,limit,total_records} = pagination;
    useEffect(() => {
        let bkdata = localStorage.getItem("github_bkmrk_users");
        if(bkdata){
            updateBookedArr(JSON.parse(bkdata));
        }
    },[]);
    return(
        <div id="respo_table" className="container mt-3">
            <div className="form-group mb-3">
                <label className="form-label">Live Search</label>
                <input className="form-control me-2" type="search" placeholder="Live Search" aria-label="Search" />
            </div>
            <table className="text-center text-capitalize table table-dark table-striped">
                <thead>
                    <tr>
                        <th>SR. No</th>
                        <th>Id</th>
                        <th>Avtar & Login Name</th>
                        <th>More Info</th>
                        <th>Github Profile</th>
                        <th>Bookmark</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && <Loader/>}
                    {!isLoading && info.message && <tr><td colSpan="6">{info.message}</td></tr>}
                    {!isLoading && Array.isArray(info) && info.length > 0 && info.map((val,ind) => <SingleRow key={val.id} updateMtb={updateMtb} updateBookedArr={updateBookedArr} target={target} bkmrks={bkmrks} srno={ind} val={val} />) }
                </tbody>
                <tfoot>
                    {target === "users" && end < total_records && !info.message && <tr><td colSpan="6"><button onClick={() => updatePagination({end:end+limit,limit,total_records})} type="button" className="btn btn-light">Load More</button></td></tr>}
                    {target === "users" && end >= total_records && !info.message && <tr><td colSpan="6"><button type="button" className="btn btn-secondary" disabled>No More Data</button></td></tr>}
                </tfoot>
            </table>
        </div>
    )
}
export default MainTable;