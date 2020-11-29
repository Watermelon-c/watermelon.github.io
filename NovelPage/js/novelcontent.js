$(function () {
    $(".top .tab li").click(function () {
        console.log($(this))
        $(this).addClass("active").siblings("li").removeClass("active")
    })
    console.log($(".classify ul li"))
    $(".classify ul li").each(function(){
        var color = "rgba("+parseInt(Math.random()*256)+","+parseInt(Math.random()*256)+","+parseInt(Math.random()*256)+",0.1)"
        $(this).css({"background-color":color})
    });
    $(".manranking_content .row").each(function(){
        var red = parseInt(Math.random()*256);
        var green = parseInt(Math.random()*256);
        var blue = parseInt(Math.random()*256);
        
        $(this).css({"background-color":"rgba("+red+","+green+","+blue+",0.1)"})
        $(this).find("span").css({"border-color":"rgba("+red+","+green+","+blue+",1)","color":"rgba("+red+","+green+","+blue+",1)"})
    });
   
    
    
})
