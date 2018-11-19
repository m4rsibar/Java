const navigation= document.querySelector('.menu');
const skateboard= document.querySelector('.skate');
const x= document.querySelector('.x');
const icons= document.querySelector('.icons');


icons.addEventListener('click', (e)=> {
    const isSkate = e.target.className === "skate";   
    navigation.classList.toggle('slideIn', !isSkate);
    navigation.classList.toggle('slideOut', isSkate);
    skateboard.classList.toggle('skateOff', isSkate);
    x.classList.toggle('xslide', isSkate);
    x.classList.toggle('xPoof', !isSkate)
  });
  
  const featured=document.querySelector('.featured');


  window.addEventListener('scroll', ()=>{
    let scrollPos= this.pageYOffset;
    let featPosTop= featured.getBoundingClientRect().top;
    let windowHeight=window.innerHeight;
    let boardOne=document.querySelector('.board1');
    let boardTwo=document.querySelector('.board2');
    let boardThree=document.querySelector('.board3');
    let title= document.querySelector('.title');
    let vid= document.querySelector('.video');
    let bottomBubble=document.querySelector('.bottomBubble');

    if(scrollPos>featPosTop-windowHeight){
      let offset=Math.min(0, scrollPos-featPosTop+windowHeight-950);
      boardOne.style.transform='translate(' + offset +'px,'+ Math.abs(offset*0.2)+'px)';
      boardThree.style.transform='translate(' + Math.abs(offset) + 'px, ' +Math.abs(offset*0.2)+ 'px)';
      title.style.display="block";
      bottomBubble.style.backgroundColor="white";
    }else if(scrollPos<featPosTop-windowHeight){
      title.style.display="none";
      bottomBubble.style.backgroundColor="initial";
    }

  })


