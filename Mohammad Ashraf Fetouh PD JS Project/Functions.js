const startGame=function()
{
    let bombID=setInterval(function(){let x=new Bomb()},2500);
    let birdID=setInterval(function(){let y=new Bird()} ,1000);
    document.querySelector("div[class='highScore']").remove();
    document.querySelectorAll("div[class='upperBar']")[0].innerText=`Name:${getPlayerName()}`
    document.querySelectorAll("div[class='upperBar']")[3].innerText=`Birds Killed:${birdNum}`
    document.querySelectorAll("div[class='upperBar']")[1].innerText=`Score:${score}`
    timeLimit();
    
    let timeoutTimer=setTimeout(function()
    {   
        stopGame();
        clearInterval(bombID);
        clearInterval(birdID);
        
        saveScore();
        gameResult();

    },60000)
}
//=====================================================================
const getPlayerName=function()
{
    if(location.search==''){return null;}
    else return pascalCase(location.search.split("?")[1].split("=")[1])       ;
}
//======================================================================
const saveScore=function()
{
    let playerName=getPlayerName();
    
    let playerData={"Name":playerName,"Score":score,"Date":Date()}
    
    let highScore=localStorage.getItem("highestScore");
    
    localStorage.setItem(playerData.Name,JSON.stringify(playerData));

    if(highScore==null||JSON.parse(localStorage.getItem("highestScore")).Score<score)
    {
    localStorage.setItem("highestScore",JSON.stringify(playerData));
    }
}

const highScoreDisp=function()
{
    let highScoreDiv=document.querySelector("h5")

    if(localStorage.key(0)!=null)
    {
        highScoreDiv.innerText=highScoreDiv.innerHTML+"\n"+`${JSON.parse(localStorage.getItem("highestScore")).Name} : ${JSON.parse(localStorage.getItem("highestScore")).Score}`+"\n"+"Press anywhere to start";
    }
    else{highScoreDiv.innerText=document.querySelector("h5").innerHTML+"\n"+"No scores yet"+"\n"+"Press anywhere to start";}
}

const startEvent=function()
{
    startGame();
    window.onclick=function(){}    
}

const stopGame=function()
{
    let imgList=document.querySelectorAll("img");
    imgList=[...imgList];
    for(let i=0;i<imgList.length;i++)
    {
        imgList[i].remove();
    }
}

const timeLimit=function()
{
    let timeBar=document.querySelectorAll("div[class='upperBar']")[2];
    counter=60;
    timeBar.innerText=`Time Limit:${counter}`;
    let timerId=setInterval(() => {
        counter--;
        timeBar.innerText=`Time Limit:${counter}`;

        if(counter==0){clearInterval(timerId);}
        
    }, 1000);
}

let pascalCase=(Input)=>
{   
    let result=""
    let splitString=Input.split(" ")
    for(let i=0;i<splitString.length;i++)
    { 
        result+=splitString[i].replace(splitString[i][0],splitString[i][0].toUpperCase());
    }
    return result;
}

const gameResult=function()
{
    let div=document.createElement('div');
    let vid=document.createElement('video');
    document.querySelector("body").append(div);
    div.innerText=`You got ${score} points`
    div.style.fontSize="medium"
    div.append(vid);
    let newDiv=document.createElement('div');

    vid.height=250;
    
    if(score<50)
    {
        vid.src="Assets/Losing-video.mp4";
        newDiv.innerText=`OOPS!! YOU LOST`;
        newDiv.style.color="red";
    }
    else
    {
        vid.src="Assets/win.mp4";
        newDiv.innerText=`CONGRATULATIONS!! YOU WON`;
        newDiv.style.color="blue";
        div.style.width="auto";
    }
    vid.play();
    vid.onended=function() {div.append(newDiv);}


    let btn=document.createElement("input");
    btn.type="button";
    btn.value="Play Again";
    btn.classList.add("Boxes");
    div.append(btn);
    btn.onclick=function(){location.href=location.href}

    btn=document.createElement("input");
    btn.type="button";
    btn.value="Exit";
    btn.classList.add("Boxes");
    btn.style.marginTop="3px"
    div.append(btn);
    btn.onclick=function(){location.href="index.html"};
}

const userWelcome=function()
{
    let playerName=getPlayerName();
    if(localStorage.getItem(playerName)!=undefined)
    {
        alert(`hello ${playerName} your last score was ${JSON.parse(localStorage.getItem(playerName)).Score} on  ${JSON.parse(localStorage.getItem(playerName)).Date}`)
    }
    else{alert(`Welcome ${playerName} for the first time!!`)}
}