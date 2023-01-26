class Bird{
    constructor()
    {
        let birdObj=createNewBird()
        moveBird(birdObj);
        birdObj.onclick=shootBird;
    }
}

class Bomb
{
    constructor()
    {
        let bombObj=createBomb()
        moveBomb(bombObj);
        bombObj.onclick=bombClick;    
    }
}
