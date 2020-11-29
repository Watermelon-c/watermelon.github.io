var record = document.querySelectorAll(".record");
var myA = document.querySelectorAll(".cut ul li a");
// var key = localStorage.getItem("index")
var key = sessionStorage.getItem("index");
// localStorage.removeItem("index");
// console.log(key);
for (let i = 0; i < myA.length; i++) {
    if(key != null){
        document.querySelector(".action").className = "";
        record[i].style.display = "none";
        myA[key].className = "action";
        record[key].style.display = "block";
    }
    myA[i].setAttribute("data-index", i)
    myA[i].onclick = function () {
        for (var j = 0; j < myA.length; j++) {
            myA[j].className = "";
            record[j].style.display = "none";
        }
        this.className = "action";
        var index = this.getAttribute("data-index");
        record[index].style.display = "block";
        // localStorage.setItem("index",i)
        sessionStorage.setItem("index",i)

    }

}