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
        return {...state,uData:{...state.uData,pagination:action.data}}
      default:
        return state;
    }
}
const defvalforpagi = {
  limit:5,
  end:5,
  total_records:null
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