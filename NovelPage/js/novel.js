$(function () {
    console.log("111")
    $.ajax({
        url: "./data/data.txt",
        success: function (res) {
            var res = JSON.parse(res);

            let index = 0;
            console.log(res[index].data)

            drawing(index, res[index].data);
            $(".ranking_tab_nav li").click(event => {
                $(event.target).addClass("active").siblings("li").removeClass("active")
                let liindex = $(event.target).attr("data-index")
                drawing(liindex, res[liindex].data);
                // console.log(data)
            })
        },
        error: function (err) {
            console.log(err, "请求失败！！！")
        }
    })
    let drawing = (index, data) => {
        let html = "";
        for (let i = 0; i < data.length; i++) {
            html += `<li>
            <img src="${data[i].url}" alt="">
            <span>${i + 1}</span>
            <div class="right">
                <h4>${data[i].name}</h4>
                <p>${data[i].hot}</p>
            </div>
        </li>`
        }
        $(".ranking_tab .ranking_tab_content").html(html)
    }
    $.ajax({
        url: "./data/recommend.txt",
        success: function (res) {
            var res2 = JSON.parse(res);
            console.log(res2)
            let html = "";

            for (let j = 0; j < res2.length; j++) {
                html += `<li>
                    <a href="#">
                        <div class="recommend_content_img">
                            <img src="${res2[j].url}" alt="">
                        </div>
                        <div class="right">
                            <h4>${res2[j].name}</h4>
                            <p>${res2[j].introduce}</p>
                            <p>${res2[j].type} · ${res2[j].condition} · ${res2[j].reading}</p>
                        </div>
                       
                    </a>
                </li>`
            }
            $(".novel_recommend_content").html(html)
        },
        error: function (err) {
            console.log(err, "请求失败！！！")
        }
    })
})
var footLis = document.querySelectorAll(".footer ul li");
footLis[0].onclick = function () {
    window.location.href = "../../index.html"
}
footLis[1].onclick = function () {
    window.location.href = "../../NewsPage/index.html"
}
footLis[2].onclick = function () {
    window.location.href = "../../VideoPage/html/tt-video.html"
}
footLis[3].onclick = function () {
    window.location.href = "../../LoginPage/log-index.html"
}