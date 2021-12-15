function doSquares(){
    var squares1 = document.getElementById("square1");
    var squares2 = document.getElementById("square2");
    var squares3 = document.getElementById("square3");
    var squares4 = document.getElementById("square4");
    var squares5 = document.getElementById("square5");
    var squares6 = document.getElementById("square6");
    var squares9 = document.getElementById("square7");
    var squares10 = document.getElementById("square8");
    console.log('javascript loaded')
    console.log(squares1)
    if ($('.square').length != 0) {
    
      $(document).mousemove(function(e) {
        posX = event.clientX - window.innerWidth / 2;
        posY = event.clientY - window.innerWidth / 6;
    
        squares1.style.transform = "perspective(500px) rotateY(" + posX * 0.05 + "deg) rotateX(" + posY * (-0.05) + "deg)";
        squares2.style.transform = "perspective(500px) rotateY(" + posX * 0.05 + "deg) rotateX(" + posY * (-0.05) + "deg)";
        squares3.style.transform = "perspective(500px) rotateY(" + posX * 0.05 + "deg) rotateX(" + posY * (-0.05) + "deg)";
        squares4.style.transform = "perspective(500px) rotateY(" + posX * 0.05 + "deg) rotateX(" + posY * (-0.05) + "deg)";
        squares5.style.transform = "perspective(500px) rotateY(" + posX * 0.05 + "deg) rotateX(" + posY * (-0.05) + "deg)";
        squares6.style.transform = "perspective(500px) rotateY(" + posX * 0.05 + "deg) rotateX(" + posY * (-0.05) + "deg)";
        squares9.style.transform = "perspective(500px) rotateY(" + posX * 0.02 + "deg) rotateX(" + posY * (-0.02) + "deg)";
        squares10.style.transform = "perspective(500px) rotateY(" + posX * 0.02 + "deg) rotateX(" + posY * (-0.02) + "deg)";
    
      });
    }
}


doSquares();