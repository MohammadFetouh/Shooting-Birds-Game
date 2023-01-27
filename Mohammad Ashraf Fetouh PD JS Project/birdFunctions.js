const createNewBird=function()
{
    let newBird=document.createElement("img");
    let sourceArr=["Assets/bird1.gif","Assets/bird2.gif","Assets/bird3.gif"];
    let bodyElm=document.querySelectorAll("body")[0];
    let index=Math.floor(Math.random()*3);
    let numArr=[0,1,2]

    newBird.src=sourceArr[index];
    newBird.ID=numArr[index];   //identifier to use in if conditions
    newBird.classList.add("birdSize");
    newBird.style.left="0px"

    bodyElm.append(newBird)
    newBird.style.top=Math.floor((Math.random()*(window.innerHeight-75)))+'px';       
    
    return newBird;
}

const moveBird=function(newBird)
{   
    let leftPos=0;
    let intervId=setInterval(function()
    {   
        if (leftPos<=window.innerWidth-newBird.width-30)
        {
            leftPos+=10;
            newBird.style.left=leftPos+"px"
        }
        else
        {
            clearInterval(intervId)
            newBird.remove()
        }
    },50)
    return intervId;
}

const shootBird=function()
{    
    if(this.ID==0){score-=10;}
    if(this.ID==1){score+=10;}
    if(this.ID==2){score+=5;}
    birdNum++;
    document.querySelectorAll("div[class='upperBar']")[3].innerText=`Birds Killed:${birdNum}`;
    document.querySelectorAll("div[class='upperBar']")[1].innerText=`Score:${score}`;
    this.remove()   
}
