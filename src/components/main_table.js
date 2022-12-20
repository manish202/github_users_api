import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LaunchIcon from '@mui/icons-material/Launch';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import {Link} from "react-router-dom";
import {useState} from "react";
import {getLocalData} from "./users";
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
function toggleBookmark(id){
    let data = getLocalData("github_bkmrk_users");
    let my_need = [];
    if(data.includes(id)){
        my_need = data.filter((val) => val !== id);
    }else{
        my_need = [...data,id];
    }
    localStorage.setItem("github_bkmrk_users",JSON.stringify(my_need));
}
function SingleRow({obj}){
    console.log("I Am SingleRow Component");
    let {updateMtb,bkmrks,ind,val,target} = obj;
    let {id,login,avatar_url,html_url} = val;
    let [isBooked,updateBooked] = useState(bkmrks.includes(id));
    function toggle(id){
        updateBooked(old => !old);
        toggleBookmark(id);
        if (target === "bookmarks") updateMtb(old => !old);
    }
    if(target === "bookmarks" && !isBooked){
        return false
    }
    return <tr>
        <td>{ind + 1}</td>
        <td>{id}</td>
        <td><img alt={login} src={avatar_url} title={login} className="avtar" /> {login}</td>
        <td><Link className="btn btn-success" to={`/users/${login}`}><RemoveRedEyeIcon /></Link></td>
        <td><a rel="noreferrer" target="_blank" className="btn btn-light" href={html_url}><LaunchIcon /></a></td>
        <td><button onClick={() => toggle(id)} title={isBooked ? "remove":"add"} className={`btn ${isBooked ? "btn-warning":"btn-primary"}`} type="button"><BookmarkBorderIcon /></button></td>
    </tr>
}
function MainTable({obj}){
    console.log("I Am MainTable Component");
    let {target,udata,isLoading,search,updateSearch,updateMtb,paginate,pagination} = obj;
    let bkmrks = getLocalData("github_bkmrk_users");
    return(
            <div id="respo_table" className="container mt-3">
                <div className="form-group mb-3">
                <label className="form-label">Live Search</label>
                <input onChange={(e) => updateSearch(e.target.value.trim())} value={search} className="form-control me-2" type="search" placeholder="Live Search" aria-label="Search" />
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
                    {udata.message && <tr><td colSpan="6">{udata.message}</td></tr>}
                    {Array.isArray(udata) && udata.length > 0 && udata.map((val,ind) => <SingleRow key={val.id} obj={{updateMtb,bkmrks,ind,val,target}} />) }
                </tbody>
                <tfoot>
                    {target === "users" && pagination.showLoadMore && <tr><td colSpan="6"><button onClick={paginate} type="button" className="btn btn-light">Load More</button></td></tr>}
                    {target === "users" && !pagination.showLoadMore && <tr><td colSpan="6"><button type="button" className="btn btn-secondary" disabled>No More Data</button></td></tr>}
                </tfoot>
            </table>
        </div>
    )
}
export default MainTable;