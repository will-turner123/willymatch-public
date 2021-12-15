function doNav(){
    // handle collapse
    var toggler = document.querySelectorAll('.navbar-toggler');
    var collapsed = false;
    for(let i=0;i < toggler.length; i++){
    toggler[i].addEventListener("click", function(){
        var collapse = document.querySelector('#navigation')
        if(!collapsed){
            collapse.classList.remove('collapse');
            collapsed = true
        }
        else{
            collapse.classList.add('collapse');
            collapsed = false;
        }
    })
    }
    var navBar = document.querySelector('.navbar');
    window.onscroll = function(){
        if(window.pageYOffset >= 10){
            navBar.classList.remove('navbar-transparent')
        }
        else{
            navBar.classList.add('navbar-transparent')
        }
    }
}

export default doNav;