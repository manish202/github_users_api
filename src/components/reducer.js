function reducer(state,action){
    switch(action.type){
      case "LOADING":
        return {...state,[action.which]:{...state[action.which],isLoading:action.data}};
      case "UPDATE_UDATA":
        return {...state,[action.which]:{...state[action.which],info:action.data}};
      case "UPDATE_BKMR_ARR":
        return {...state,bkmrks:action.data};
      case "UPDATE_MTB":
        return {...state,bkmrksData:{...state.bkmrksData,reloadMaintable:!state.bkmrksData.reloadMaintable}}
      case "IS_ONLINE":
        return {...state,isOnlineNow:action.data}
      case "PAGINATION":
        let {start,end} = action.data;
        return {...state,uData:{...state.uData,pagination:{...state.uData.pagination,start,end}}}
      case "UPDATE_TOTAL_REC":
        return {...state,uData:{...state.uData,pagination:{...state.uData.pagination,total_records:action.data}}}
      default:
        return state;
    }
}
const defvalforpagi = {
  limit:5,
  start:0,
  end:5,
  total_records:25
}
let initialData = {
    uData:{
      isLoading:true,
      info:{message:false},
      target:"users",
      pagination:{...defvalforpagi}
    },
    bkmrksData:{
        isLoading:false,
        info:{message:false},
        target:"bookmarks",
        reloadMaintable:false
    },
    bkmrks:[],
    isOnlineNow:[true,false]
  }
export {reducer,initialData,defvalforpagi};