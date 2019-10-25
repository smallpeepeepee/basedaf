// World's Hardest Game, 2019

// The user-controlled entity that performs actions in the game
//let player = new Player();

// Global variables for the HTML5 canvas
var canvas;
var context;
var obstacles;
var oldTimeStamp;

// Details for the screen and its size
var xMin;
var xMax;
var yMin;
var yMax;

// Information for setInterval() and clearInterval()
var intervalId = null;
const updateInterval = 10; // interval in milliseconds

function setUpGame() {
    // Stops updating the game state before restarting
    if (intervalId != null) {
        clearInterval(intervalId);
    }

    var aleksFace = "https://scontent-sea1-1.cdninstagram.com/vp/e92b43bf1d1c01d0a298e3937733c06c/5DD9D0C6/t51.2885-19/s150x150/52486763_624841137975557_4315053367689740288_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com";

    obstacles = [
        //image URL, image widht, image height, speed X, speed Y, start X, start Y, end X, end Y
        new Obstacle(aleksFace, 100, 100, 0, .25, 10, 10, 1100, 500, 11, 11)
    ];

    xMin = 0;
    xMax = 1200; 
    yMin = 0;
    yMax = 500;
    
    canvas = document.getElementById("board");
    canvas.width = xMax;
    canvas.height = yMax;
    context = canvas.getContext("2d");

    intervalId = setInterval(updateGameState, updateInterval);
}

// 2D point within bounds of screen
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        if (x < xMin || x > xMax) {
            alert("x-coordinate " + x + " is out of range, xMin = " + xMin + " and xMax = " + xMax);
        }
        if (y < yMin || y > yMax) {
            alert("y-coordinate " + y + " is out of range, yMin = " + yMin + " and yMax = " + yMax);
        }
    }
}

// Game obstacle
class Obstacle {
    constructor(imageSrc, imageWidth, imageHeight, speedX, speedY, startPointX, startPointY, endPointX, endPointY, currentPointX, currentPointY) {
        //the this.image is an image object
        this.image = new Image(imageWidth, imageHeight);
        this.image.src = imageSrc;
        this.speedX = speedX;
        this.speedY = speedY;
        this.startPoint = new Point(startPointX, startPointY);
        this.currentPoint = new Point(currentPointX, currentPointY);
        this.endPoint = new Point(endPointX - (this.image.width), endPointY - (this.image.height));
    }
}

function updateGameState() {
    moveAndDrawObstacles();
}

function moveAndDrawObstacles()
{
    clearCanvas();
    for(var i = 0; i < obstacles.length; i++)
    {
        //calculate future position of the obstacle
        obstacles[i].currentPoint.x += obstacles[i].speedX * updateInterval;
        obstacles[i].currentPoint.y += obstacles[i].speedY * updateInterval;
        if(obstacles[i].currentPoint.x < obstacles[i].startPoint.x || obstacles[i].currentPoint.x > obstacles[i].endPoint.x)
        {
            obstacles[i].speedX *= -1;
        }

        if(obstacles[i].currentPoint.y < obstacles[i].startPoint.y || obstacles[i].currentPoint.y > obstacles[i].endPoint.y)
        {
            obstacles[i].speedY *= -1;
        }
        //draw the obstacle
        drawObstacle(obstacles[i].image, obstacles[i].currentPoint);
        drawCourseEdge();
    }
}

function clearCanvas()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// Draws an image object on the canvas at the given point
function drawObstacle(image, point)
{
    context.drawImage(image, point.x, point.y);
}

function drawCourseEdge() {
    var board = document.getElementById("board");
    var context = board.getContext("2d");
    context.fillStyle = "#000000";
    context.fillRect(xMax/3, yMax/3, 100, 200);
}