
//context stores 2d context of canvas el itself
let ctx = null;
//tile width and height of each tile drawn to map in px
let tileW = 40, tileH = 40
//map width and height in tiles
let mapW = 10, mapH = 10

//track frame rate
let currentSecond = 0, frameCount = 0, frameLastSecond = 0

//array stores all map tiles which will make up our map
//0 is not passable, 1 is passable
//we've laid map out in columns and rows corresponding to how they will appear on map itself
let gameMap = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 1, 0, 0, 0, 1, 1, 0,
    0, 1, 0, 1, 0, 1, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
    0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]

//function handles load event
window.onload = function () {
    ctx = document.getElementById('game').getContext('2d')
    //when its ready for us to begin drawing to canvas, we'll handle with drawGamefunction
    requestAnimationFrame(drawGame)
    ctx.font = 'bold 10pt sans-serif'


}



//draw game function
function drawGame() {
    //is ctx variable null? if so, leave
    if (ctx == null) {
        return
    }

    //calc cur sec, used to keep track of fraame rate in game
    let sec = Math.floor(Date.now() / 1000)
    //if sec is not equal to currentSecond
    // then we update currentSec accordingly and frame count for frame count's last sec will be assigned
    if (sec != currentSecond) {
        currentSecond = sec;
        framesLastSecond = frameCount;
        frameCount = 1;
    } else {
        //increase frame count
        frameCount++;
    }
    //draw tiles that make up game map
    //beign by looping through each tile
    for (let y = 0; y < mapH; y++) {
        //for each row, go left to right 
        for (let x = 0; x < mapW; x++) {
            //switch statement lets us choose which color to draw curent tile with
            //find value at corresponding game map index by y*mapW and add x
            switch (gameMap[((y * mapW) + x)]) {
                case 0:
                    ctx.fillStyle = "#999999";
                    break;
                default:
                    ctx.fillStyle = "#eeeeee"
            }
            //draw rectangle at coresponding position tile
            ctx.fillRect(x * tileW, y * tileH, tileW, tileH)

        }
    }

    //finally set fill style to bright red
    ctx.fillStyle = "#ff0000"
    //draw current frame rate
    ctx.fillText("FPS: " + framesLastSecond, 10, 20)

    //when ready to draw another animation to canvas, draw this again
    requestAnimationFrame(drawGame)
}


