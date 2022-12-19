function reducer(state,action){
  switch(action.type){
    case "IS_ONLINE":
      return {...state,isOnlineNow:action.data}
    default:
      return state;
  }
}
let initialData = {
  isOnlineNow:[true,false]
}
export {reducer,initialData};