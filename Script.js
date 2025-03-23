function controller(event){
    
    if(event.key == "Enter") {

        if(runWorkerNumber == 0){

            run();
            runSound.play();

            updateScore();
            background();

            flameMargin.forEach(createFlames);
        }
    }

    if(event.key == " ") {

        if(jumpWorkerNumber == 0){

            if(runWorkerNumber != 0){

                    clearInterval(runWorkerNumber);
                    runSound.pause();
    
                    jump();
                    jumpSound.play();
            }            
        }
    }

    if(event.key == "Shift") {

        if(slideWorkerNumber == 0){

            if(scoreWorkerNumber2 != 0){

                if(runWorkerNumber != 0){

                    clearInterval(runWorkerNumber);
                    runSound.pause();

                    slide();
                }
            }
        }
    }
}


var runImageNumber = 1;
var runWorkerNumber = 0;

var runSound = new Audio("run.mp3");
runSound.loop = true;

function run(){
    
    runWorkerNumber=setInterval(()=>{

        runImageNumber = runImageNumber+1 ;

        if (runImageNumber == 9){
            runImageNumber = 1;
        }

        document.getElementById("boy").src = "run"+runImageNumber+".png";

    },90);
}

var jumpImageNumber = 1;
var jumpWorkerNumber = 0;

var jumpSound = new Audio("jump.mp3");
var jumpMarginTop = 410;

function jump(){

    jumpWorkerNumber = setInterval(()=>{

        jumpImageNumber = jumpImageNumber + 1;

        if(jumpImageNumber < 8){

            jumpMarginTop = jumpMarginTop - 15;
            document.getElementById("boy").style.marginTop = jumpMarginTop + "px";
        }

        if(jumpImageNumber > 7){

            jumpMarginTop = jumpMarginTop + 15;
            document.getElementById("boy").style.marginTop = jumpMarginTop + "px";
        }

         if( jumpImageNumber== 13){

             jumpImageNumber = 1;

             clearInterval(jumpWorkerNumber);

             run();
             runSound.play();

             jumpWorkerNumber = 0;
         }

        document.getElementById("boy").src = "jump"+jumpImageNumber+".png";

    },90);

}

var scoreWorkerNumber = 0;
var score = 0;

function updateScore(){

    scoreWorkerNumber = setInterval(()=>{

        
        score = score + 10;

        document.getElementById("score").innerHTML = score;

        if( score == 1010){

            clearInterval(scoreWorkerNumber);
            alert("Game Won | Press ok go to Level 2");
            level2();
        }
    },100);

}

var backgroundWorkerNumber = 0;
var backgroundPosition = 0;

function background(){

    backgroundWorkerNumber = setInterval(()=>{

        backgroundPosition = backgroundPosition - 5;
        document.getElementById("background").style.backgroundPositionX = backgroundPosition + "px";
    
    },80);
}

var flameWorkerNumber = 0;
var flameMargin = [500,1000,2000];

function createFlames(x){

    var flame = document.createElement("img");
    document.getElementById("background").appendChild(flame);
    flame.src = "flame.gif";
    flame.className = "flame";
    flame.style.marginLeft = x +"px";

    flameWorkerNumber = setInterval(()=>{

        if(flameWorkerNumber != 0){

            x = x - 20;
          flame.style.marginLeft = x + "px";
        }

        if(x == 100){

            if(jumpWorkerNumber == 0){
                
                clearInterval(runWorkerNumber);
                runSound.pause();

                clearInterval(jumpWorkerNumber);
                clearInterval(backgroundWorkerNumber);
                clearInterval(scoreWorkerNumber);
                clearInterval(flameWorkerNumber);

                dead();
            }
        }
    },90);
}


var deadImage = 1;
var deadWorkerNumber = 0;

var deadSound = new Audio("dead.mp3");

function dead(){
        
        deadSound.play();
        deadWorkerNumber = setInterval(()=>{

            deadImage = deadImage + 1;

            if(deadImage == 11){

                deadImage = 1;
                clearInterval(deadWorkerNumber);

                alert("Game Over!! Press OK to restart");
                window.location.reload();
            }
            document.getElementById("boy").src = "dead"+ deadImage+".png";
        
        },100)
}

function level2(){

    var dragonWorkerNumber = 0;
    var dragonMargin = [500,1000,2500,3100];
    
    function createDragon (z){
    
        var dragon = document.createElement("img");
        document.getElementById("background").appendChild(dragon);
        dragon.src = "dragon.gif";
        dragon.className = "dragon";
        dragon.style.marginLeft = z +"px";
        
        dragonWorkerNumber = setInterval(()=>{

            if(flameWorkerNumber != 0){

                z = z - 20;
                dragon.style.marginLeft = z + "px";
            }
            if(z == 100){

                if(slideWorkerNumber == 0){

                    clearInterval(runWorkerNumber);
                    runSound.pause();
    
                    clearInterval(jumpWorkerNumber);
                    clearInterval(backgroundWorkerNumber);
                    clearInterval(scoreWorkerNumber);
                    clearInterval(flameWorkerNumber);
                    clearInterval(slideWorkerNumber);

                    dead();
                }
            }
                

        },100)
    }
        document.getElementById("background").className="background2";
        
        updateScore2();
        
        dragonMargin.forEach(createDragon);
}

var scoreWorkerNumber2 = 0;

function updateScore2(){

    scoreWorkerNumber2 = setInterval(()=>{

        score = score + 10;

        document.getElementById("score").innerHTML = score;

        if( score == 3010){

            alert("Game Won | Press ok to Restart");
            window.location.reload();
        }
    },100);
}

var slideWorkerNumber = 0;
var slideImageNumber = 1;

function slide(){

    slideWorkerNumber = setInterval(()=>{

        slideImageNumber = slideImageNumber + 1;

        if(slideImageNumber == 11){

            slideImageNumber = 1;

            clearInterval(slideWorkerNumber);

            run();
            runSound.play();

            slideWorkerNumber = 0 ;

        }
        document.getElementById("boy").src = "slide"+slideImageNumber+".png";    
    },90);
}
