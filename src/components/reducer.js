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
      default:
        return state;
    }
}
let initialData = {
    uData:{
      isLoading:true,
      info:{message:false},
      target:"users"
    },
    bkmrksData:{
        isLoading:false,
        info:{message:false},
        target:"bookmarks",
        reloadMaintable:false
    },
    bkmrks:[]
  }
export {reducer,initialData};