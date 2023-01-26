const createBomb=function()
{
    let newBomb=document.createElement("img");
    let bodyElm=document.querySelectorAll("body")[0];
    newBomb.src="Assets/cherrybomb-remix.svg"
    newBomb.classList.add("bombSize");
    newBomb.style.top="0px"


    bodyElm.append(newBomb)
    newBomb.style.left=Math.floor((Math.random()*(window.innerWidth-newBomb.width)))+'px';       

    return newBomb;
} 

//====================================================================================================================================================================

const moveBomb=function(newBomb)
{
    let topPos=0;
    let intervId=setInterval(function()
    {   
        if (topPos<=window.innerHeight-newBomb.height-30)
        {
            topPos+=6;
            newBomb.style.top=topPos+"px"
        }
        else
        {
            clearInterval(intervId)
            newBomb.remove()
        }
    },50)
    return intervId;
}

//===========================================================================================================================================

const bombClick=function()
{   
    let bodyElm=document.querySelectorAll("body")[0];

    onExplosion(this)
    let expGif=document.createElement('img');
    expGif.src="Assets/explosion.gif"
    expGif.classList.add("expGif")
    expGif.style.top=(positionParse(this.style.top) - (expGif.height / 2)) + "px";
    expGif.style.left=(positionParse(this.style.left)- (expGif.width / 2)) + "px";

    setTimeout(()=>{
        expGif.remove();
    },400)
    
    bodyElm.append(expGif);
    this.remove();
}

//====================================================================================================================================================================

const onExplosion=function(clickedBomb)
{
    let nodeList=document.querySelectorAll("img[class='birdSize']");
    let birdsArr=[...nodeList]
    clickedBomb.classList.add("hidden")

    for(let i=0;i<birdsArr.length;i++)
    {   
        
        let birdLeft=positionParse(birdsArr[i].style.left);
        let birdRight=birdLeft+birdsArr[i].width
        let birdTop=positionParse(birdsArr[i].style.top);
        let birdBottom=positionParse(birdsArr[i].style.top)+birdsArr[i].height
       
        let bombLeft=positionParse(clickedBomb.style.left)- (clickedBomb.width * 6);     
        let bombTop=positionParse(clickedBomb.style.top)-(clickedBomb.height * 6);
        let bombBottom = positionParse(clickedBomb.style.top)+clickedBomb.height+ (clickedBomb.height * 6);
        let bombRight = positionParse(clickedBomb.style.left)+clickedBomb.width+ (clickedBomb.width * 6)
       
        if(birdTop>=bombTop  &&  birdBottom<=bombBottom &&  birdLeft>=bombLeft  &&  birdRight<=bombRight)
        {
            if(birdsArr[i].ID==0){score-=10;}
            if(birdsArr[i].ID==1){score+=10;}
            if(birdsArr[i].ID==2){score+=5;}
            birdNum++;
            document.querySelectorAll("div[class='upperBar']")[3].innerText=`Birds Killed:${birdNum}`
            document.querySelectorAll("div[class='upperBar']")[1].innerText=`Score:${score}`
            birdsArr[i].remove();
        }
    } 
}

//====================================================================================================================================================================

function positionParse(pos)
{   
    if(pos==''){return 0;}
    let splitString=pos.split("p");
    return parseInt(splitString[0])
}

