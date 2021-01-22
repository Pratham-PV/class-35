var ball;
var database,position;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    database=firebase.database();
    var ballPosition=database.ref("ball/position");
    ballPosition.on("value",readPosition,showError);

}

function draw(){
    background("white");
    if(position !== undefined){
        if(keyDown(LEFT_ARROW)){
            changePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            changePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            changePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            changePosition(0,+1);
        }
        drawSprites();
    }
    
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}


function readPosition(data){
   position=data.val();
   //assign the x and y values of ball in database to the ball sprite
   ball.x=position.x;
   ball.Y=position.y;
}

function writePosition(x,y){
    // set() is used to set the value in the database
    // ref() is used to refer to the location of a value in database
    database.ref("ball/position").set({'x':position.x+x, 'y':position.y+y});
}

function showError(){
    console.log("error")
}