var myLis = document.querySelectorAll(".wtoutiao-collect ul li");
// console.log(myLis);
for(let  i = 0 ; i < myLis.length ; i++){
    // myLis[i].setAttribute("data-lis" , i);
    // localStorage.setltem(myLis[i],i)
    myLis[i].onclick = function(){
        // console.log(i);
        // localStorage.setItem("index",i)
        sessionStorage.setItem("index",i)
    }
}
