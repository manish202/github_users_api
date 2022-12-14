if("serviceWorker" in navigator){
    navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/sw.js`)
    .then((res) => console.log("serviceWorker Registered Successfully."))
    .catch(err => console.log(`serviceWorker Registration Error = ${err}`));
}else{
    alert("Worker Not Supported In Your Browser!");
}