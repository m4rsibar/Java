    let imgs=document.querySelectorAll('.slide'),
     current=0, 
     rightArrow=document.querySelector('.right'),
     leftArrow=document.querySelector('.left'),
     slide=document.querySelectorAll('.slide'),
     imgContainer= document.querySelector('.slides'),
     navbar= document.querySelector('.navbar'),
     body= document.querySelector('body');

//splash page

    let tl = new TimelineMax();

    tl.staggerTo(
      ".landPageLetters",
      1.4,
      {
        opacity: 1,
        ease: Expo.easeInOut
      },
      0.3, "init"
    );
  
    tl.to(".overlay", 0.8, {
      visibility: "visible",
      y: 0,
      ease: Bounce.easeOut
    },"init+=2.2");
  
    tl.to("button", 0.8, {
      visibility:"visible",
      opacity: "1"
    },"init+=2.5");
  
    let button = document.querySelector(".enterButton");
    button.addEventListener("click", _ => {

        tl.to('.enterButton', 0.1, {scaleX:1.5, scaleY:1.5,  ease: Power4.easeInOut} )
            tl.to('.enterButton', 0.1, {scaleX:0.2, scaleY:0.2, opacity: 0, delay:0.3,  ease: Power4.easeInOut})

        tl.to("button", .7, {
        y:"-120%",
        opacity: "0"
      },"disappear")
      
      tl.to(".overlay", 1.2, {
        y: "-120%",
       ease:Power1.easeOut,
       onComplete: showContent


      },"disappear+.7")
      
      tl.to(".overlayContainer", 1, {
        y: "-120%",
       ease:Power1.easeOut,
      })
      tl.staggerTo(
        ".landPageLetters",
        2,
        {
          y: "-120%",
          opacity: 0.2,
          ease: Expo.easeInOut,

        },
        0.1, "disappear+=.8"
      )
      
      tl.staggerFromTo(".navbar ul li", 1, {
        opacity:0,
        y:8
    },{
        ease:Expo.easeInOut,
        opacity: 1,
        y:0
    },0.3, "disappear+=1.5")

    content=document.querySelector('.content');

      function showContent(){
                content.style.visibility="visible";
                body.style.overflow="auto";
                }
    });



//image slider
    function reset(){
        imgs.forEach(img=>{
            img.classList.add('hideImg');
        })
    }

    function startSlide(){
        reset();
        imgs[0].classList.remove('hideImg');
        imgs[0].classList.add('showImg');
    }

    function next(){
        reset();
        imgs[current + 1 ].classList.remove('hideImg');
        imgs[current + 1 ].classList.add('showImg');
        current ++;
    }

    function last(){
        reset();
        imgs[current-1].classList.remove('hideImg');
        imgs[current-1].classList.add('showImg');
        current--;
    }

    function leftOrRight(e){
        if(e.offsetX>imgContainer.getBoundingClientRect().width/2&&e.offsetY<imgContainer.getBoundingClientRect().height||e.keyCode==39){
            if(current===imgs.length -1){
            current=-1;
            }
            next();
        }
        if(e.offsetX<window.innerWidth/2&&e.offsetY<imgContainer.getBoundingClientRect().height||e.keyCode==37){
            if(current===0){
            current=imgs.length;
        }
            last();
        }
    }

    function removeClass(element,classToRemove){
        (element).classList.remove(classToRemove);
    }
    function addClass(element,classToAdd){
        (element).classList.remove(classToAdd);
    }

    imgContainer.addEventListener('keyup',leftOrRight)
    imgContainer.addEventListener('click',leftOrRight);

        startSlide();

    let looper=setInterval(() => {
            if(current===imgs.length -1){
            current=-1;
            }
            next();
        }, 4500);

        imgContainer.addEventListener('mouseenter', e=>{
            clearInterval(looper);
            slide.forEach(slide=>{
                slide.style.backgroundColor="transparent";
            });
        });

    slide.forEach(slide=>{
        slide.addEventListener('mousemove', (e)=>{
        let x=e.offsetX;
        let y=e.offsetY;

        if(x>imgContainer.getBoundingClientRect().width/2){
            rightArrow.classList.add('showArrow');
        }else{
            rightArrow.classList.remove('showArrow');
        }
        if(x<imgContainer.getBoundingClientRect().width/2){
            rightArrow.classList.remove('showArrow');
            leftArrow.classList.add('showArrow');
        }else{
            leftArrow.classList.remove('showArrow');
        }
    });
    });

    imgContainer.addEventListener('mouseleave', function(e){
        looper= setInterval(() => {
            if(current===imgs.length -1){
            current=-1;
            }
            next();
        }, 4500);

        imgs.forEach(img=>{
            removeClass(rightArrow, 'showArrow');
            removeClass(leftArrow, 'showArrow');
        });
        slide.forEach(slide=>{
                slide.style.backgroundColor="rgba(0,0,0,0.4)";
            });
    });
//Navbar Functionality

function debounce(func, wait=15, immediate=true) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

let navTop= navbar.offsetTop;

    function stickNav(){

        if (window.scrollY >= navTop){
            body.style.paddingTop = navbar.offsetHeight + 'px';
            body.classList.add('fixed-nav');
        }else{
            body.style.paddingTop=0;
            body.classList.remove('fixed-nav');
        }
    }

    window.addEventListener('scroll', debounce(stickNav));
        
    let coldMenu=document.querySelector('.coldMenu');
    let hotMenu=document.querySelector('.hotMenu');

    
let drinks=[];

let coldButton=document.querySelector('.cold');

let menuChoice=document.querySelector('.menuChoice');
let hotButton=document.querySelector('.hot');

let showColdMenu = new TimelineMax({paused:true, reversed: true});

    
    showColdMenu.to(
      ".coldMenu",
      1,
      { 
        display: "flex",
        opacity: 1, 
        y:-8,
      }, "showmenu" )
    

// timeline for showing hot menu
      let showHotMenu=new TimelineMax({paused:true, reversed:true});

    showHotMenu.to(
      ".hotMenu",1,{ 
       opacity: 1, 
       y:-5,
       display: "flex" 
      },"showmenu")

let coldFetched=false;
coldButton.addEventListener('click',e=>{
    e.preventDefault();
   showHotMenu.pause(0)
    showColdMenu.restart()
 


    if(!coldFetched){
      fetch('./menu.JSON', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
        .then(response=>response.json())
        .then(data => {
        drinks = [...data.coldDrinks];


        for (var i = 0; i < drinks.length; i++) {
            coldMenu.innerHTML += `<div class="menuImgContainer"><img src="${drinks[i].img}" alt="${drinks[i].drink}" class="menuImg"><span class="name">${drinks[i].drink}</span></div>`
        }
        coldMenu.scrollIntoView(); 
        
        let menuImgs=document.querySelectorAll('.menuImgContainer');
        console.log(menuImgs)
        
        function boxEnter(e) {
            this.classList.add('active');
            this.parentNode.classList.add('active');
        }
        
        function boxLeave(e) {
            this.classList.remove('active');
            this.parentNode.classList.remove('active');
        }
        
        menuImgs.forEach(function(i){
          i.addEventListener('mouseenter', boxEnter);
          i.addEventListener('mouseleave', boxLeave);
        })
    })
}
coldFetched=true;
})


let hotFetched=false;
    hotButton.addEventListener('click',e=>{
        e.preventDefault();
        showColdMenu.pause(0)
          showHotMenu.restart()

    
    if(!hotFetched){
      fetch('./menu.JSON', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
        .then(response=>response.json())
        .then(data => {
        drinks = [...data.hotDrinks];

        for (var i = 0; i < drinks.length; i++) {
            hotMenu.innerHTML += `<div class="menuImgContainer"><img src="${drinks[i].img}" alt="${drinks[i].drink}" class="menuImg"><span class="name">${drinks[i].drink}
            </span></div>`
        }
        hotMenu.scrollIntoView(); 

        let menuImgs=document.querySelectorAll('.menuImgContainer');
        console.log(menuImgs)
        
        function boxEnter(e) {
            this.classList.add('active');
            this.parentNode.classList.add('active');
        }
        
        function boxLeave(e) {
            this.classList.remove('active');
            this.parentNode.classList.remove('active');
        }
        
        menuImgs.forEach(function(i){
          i.addEventListener('mouseenter', boxEnter);
          i.addEventListener('mouseleave', boxLeave);
        })
    })
}
hotFetched=true;
});


if(window.width>800){

    let movementStrength=100;
    let height= movementStrength/window.innerHeight;
    let width= movementStrength/window.innerWidth;

    overlay.addEventListener('mousemove', e=>{
        let pageX=e.pageX;
        let pageY=e.pageY;
        let newValueX=width*pageX*-1/-25;
        let newValueY=height*pageY*-1/-50;
        overlay.style.backgroundPosition=`${newValueX}px ${newValueY}px`
    });
}






