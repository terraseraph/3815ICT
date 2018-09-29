// var w = 10;
//     var cols, rows, value;
 
 
//     function setup() {
//         createCanvas(500, 500);
//         video = createCapture(VIDEO);
//         video.size(width, height);
//         video.hide();
//     }
 
//     function draw() {
//         video.loadPixels();
 
//         //background(102);
 
//         for (var x = 0; x < width + w; x += (w * cos(PI / 6) * 2)) { 
//             index = 0;
//             for (var y = 0; y < height + w; y += w * (1 + cos(PI / 3))) { 
 
//                 var loc = (y + x * width) * 4;
 
//     // The functions red(), green(), and blue() pull out the three color components from a pixel.
//                 var r = video.pixels[loc];
//                 var g = video.pixels[loc + 1];
//                 var b = video.pixels[loc + 2];
 
//                 fill(r, g, b);
 
//                 push(); {
//                     translate(x - ((w * cos(PI / 6)) * (index % 2)), y);
//                     rotate(radians(30));
//                     polygon(0, 0, 10, 6);
//                 }
//                 pop();
 
//                 index++;
//                 console.log(loc);
 
//             }
//         }
 
//     }
 
//     function polygon(x, y, radius, npoints) {
//         var angle = TWO_PI / npoints;
//         beginShape();
//         for (var a = 0; a < TWO_PI; a += angle) {
//             var sx = x + cos(a) * radius;
//             var sy = y + sin(a) * radius;
//             vertex(sx, sy);
//         }
//         endShape(CLOSE);
//     }

var screenWidth = 800;
var screenHeight = 400;
var cols = 7;
var rows = 7;
var cellSize = 30;
var grid = [];
var xOffset = 200;
var yOffset = 50;

function setup () {
    createCanvas(screenWidth, screenHeight);

    for(j = 0; j < rows; j++) {
        for(i = 0; i < cols; i++) {
            var cell = new Cell(i, j);
            
            grid.push(cell);
        }
    }
}

function draw () {
    background(0, 114, 183);

    for(var i = 0; i < grid.length; i++) {
        grid[i].show();
    }
}

function Cell(i, j) {
    this.i = i;
    this.j = j;

    if(j % 2 === 0) {
        this.x = this.i * cellSize * 2 + xOffset;
    } else {
        this.x = this.i * cellSize * 2 + cellSize + xOffset;
    }
    
    this.y = this.j * cellSize * 1.7 + yOffset;
    this.hasPlayer = false;

    this.show = function () {
        stroke(255, 255, 255, 50)
        fill(0, 114, 183);
 
        push(); 
        translate(this.x, this.y);
        rotate(radians(30));
        polygon(0, 0, cellSize, 6);
        pop();
    }
}

function polygon(x, y, radius, npoints) {
    var angle = TWO_PI / npoints;
    beginShape();
    for (var a = 0; a < TWO_PI; a += angle) {
        var sx = x + cos(a) * radius;
        var sy = y + sin(a) * radius;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}   


























HexTile = function (game, x, y, tileImage,isVertical, i,j, type) {

    Phaser.Sprite.call(this, game, x, y, tileImage);
    this.anchor.setTo(0.5, 0.5);
    this.tileTag = game.make.text(0,0,type);
    //this.tileTag = game.make.text(0,0,'i'+(i)+',j'+(j));
    //this.tileTag = game.make.text(0,0,'i'+(i-6)+',j'+(j-6));
        
    this.tileTag.anchor.setTo(0.5, 0.5);
    this.tileTag.addColor('#ffffff',0);
    if(isVertical){
        this.tileTag.rotation=-Math.PI/2;
    }
    this.addChild(this.tileTag);
    this.tileTag.visible=false;
    this.revealed=false;
    this.name="tile"+i+"_"+j;
    this.type=type;

    if(isVertical){
        this.rotation=Math.PI/2;
    }
    this.inputEnabled = true;
    this.input.useHandCursor = true;
    this.events.onInputOut.add(this.rollOut, this);
    this.events.onInputOver.add(this.rollOver, this);
    this.marked=false;
    
    //this.originali=(i-(Math.floor(j/2)));//x = x' - floor(y/2)
    //this.originalj=j;
};

HexTile.prototype = Object.create(Phaser.Sprite.prototype);
HexTile.prototype.constructor = HexTile;

HexTile.prototype.rollOut=function(){
    this.scale.x = 1;
    this.scale.y = 1;
}
HexTile.prototype.rollOver=function(){
    this.scale.x = 0.9;
    this.scale.y = 0.9;
}

HexTile.prototype.reveal=function(){
    this.tileTag.visible=true;
    this.revealed=true;
    if(this.type==10){
        this.tint='0xcc0000';
    }else{
        this.tint='0x00cc00';
    }
}
HexTile.prototype.toggleMark=function(){
    if(this.marked){
       this.marked=false; 
       this.tint='0xffffff';
    }else{
        this.marked=true;
        this.tint='0x0000cc';
    }
}


var levelData=
[[-1,-1,-1,0,0,0,0,0,0,0,-1,-1,-1],
[-1,-1,0,0,0,0,0,0,0,0,-1,-1,-1],
[-1,-1,0,0,0,0,0,0,0,0,0,-1,-1],
[-1,0,0,0,0,0,0,0,0,0,0,-1,-1],
[-1,0,0,0,0,0,0,0,0,0,0,0,-1],
[0,0,0,0,0,0,0,0,0,0,0,0,-1],
[0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,-1,-1],
[-1,-1,0,0,0,0,0,0,0,0,0,-1,-1],
[-1,-1,0,0,0,0,0,0,0,0,-1,-1,-1],
[-1,-1,-1,0,0,0,0,0,0,0,-1,-1,-1]];

levelData=transpose(levelData);
//...
function transpose(a) {
    return Object.keys(a[0]).map(
        function (c) { return a.map(function (r) { return r[c]; }); }
        );
}


function addMines(){
    var tileType=0;
    var tempArray=[];
    var newPt=new Phaser.Point();
    for (var i = 0; i < levelData.length; i++)
    {
        for (var j = 0; j < levelData[0].length; j++)
        {
            tileType=levelData[i][j];
            if(tileType===0){
                newPt=new Phaser.Point();
                newPt.x=i;
                newPt.y=j;
                tempArray.push(newPt);
            }
        }
    }
    for (var i = 0; i < numMines; i++)
    {
        newPt=Phaser.ArrayUtils.removeRandomItem(tempArray);
        levelData[newPt.x][newPt.y]=10;//10 is mine
        updateNeighbors(newPt.x,newPt.y);
    }
}
function updateNeighbors(i,j){//update neighbors around this mine
    var tileType=0;
    var tempArray=getNeighbors(i,j);
    var tmpPt;
    for (var k = 0; k < tempArray.length; k++)
    {
        tmpPt=tempArray[k];
        tileType=levelData[tmpPt.x][tmpPt.y];
        levelData[tmpPt.x][tmpPt.y]=tileType+1;
    }
}


function onTap(){
    var tile= findHexTile();
     
     if(!checkforBoundary(tile.x,tile.y)){
        if(checkForOccuppancy(tile.x,tile.y)){
            if(levelData[tile.x][tile.y]==10){
                //console.log('boom');
                var hexTile=hexGrid.getByName("tile"+tile.x+"_"+tile.y);
                if(!hexTile.revealed){
                    hexTile.reveal();
                    //game over
                }
            }
        }else{
            var hexTile=hexGrid.getByName("tile"+tile.x+"_"+tile.y);
                     
            if(!hexTile.revealed){
                if(levelData[tile.x][tile.y]===0){
                    //console.log('recursive reveal');
                    recursiveReveal(tile.x,tile.y);
                }else{
                    //console.log('reveal');
                    hexTile.reveal();
                    revealedTiles++;
                }
                 
            }
        }
    }
    infoTxt.text='found '+revealedTiles +' of '+blankTiles;
}

function recursiveReveal(i,j){
    var newPt=new Phaser.Point(i,j);
    var hexTile;
    var tempArray=[newPt];
    var neighbors;
    while (tempArray.length){
        newPt=tempArray[0];
        var neighbors=getNeighbors(newPt.x,newPt.y);
         
        while(neighbors.length){
            newPt=neighbors.shift();
            hexTile=hexGrid.getByName("tile"+newPt.x+"_"+newPt.y);
            if(!hexTile.revealed){
                hexTile.reveal();
                revealedTiles++;
                if(levelData[newPt.x][newPt.y]===0){
                    tempArray.push(newPt);
                }
            }
        }
        newPt=tempArray.shift();//it seemed one point without neighbor sometimes escapes the iteration without getting revealed, catch it here
        hexTile=hexGrid.getByName("tile"+newPt.x+"_"+newPt.y);
        if(!hexTile.revealed){
            hexTile.reveal();
            revealedTiles++;
        }
    }
}

HexTile.prototype.reveal=function(){
    this.tileTag.visible=true;
    this.revealed=true;
    if(this.type==10){
        this.tint='0xcc0000';
    }else{
        this.tint='0x00cc00';
    }
}
HexTile.prototype.toggleMark=function(){
    if(this.marked){
       this.marked=false; 
       this.tint='0xffffff';
    }else{
        this.marked=true;
        this.tint='0x0000cc';
    }
}


if(isVertical){
    this.rotation=Math.PI/2;
}

var hexTileHeight = 20
var hexTileWidth = 20

var verticalOffset=hexTileHeight*3/4;
var horizontalOffset=hexTileWidth;
var startX;
var startY;
var startXInit=hexTileWidth/2;
var startYInit=hexTileHeight/2;
     
var hexTile;
for (var i = 0; i < levelData.length; i++)
{
    if(i%2!==0){
        startX=2*startXInit;
    }else{
        startX=startXInit;
    }
    startY=startYInit+(i*verticalOffset);
    for (var j = 0; j < levelData[0].length; j++)
    {
        if(levelData[i][j]!=-1){
            hexTile= new HexTile(game, startX, startY, 'hex',false,i,j,levelData[i][j]);
            hexGrid.add(hexTile);
        }    
        startX+=horizontalOffset;
    }    
}


// function findHexTileX(){
//     var pos=game.input.activePointer.position;
//     pos.x-=hexGrid.x;
//     pos.y-=hexGrid.y;
//     var xVal = Math.floor((pos.x)/hexTileWidth);
//     var yVal = Math.floor((pos.y)/(hexTileHeight*3/4));
//     var dX = (pos.x)%hexTileWidth;
//     var dY = (pos.y)%(hexTileHeight*3/4); 
//     var slope = (hexTileHeight/4)/(hexTileWidth/2);
//     var caldY=dX*slope;
//     var delta=hexTileHeight/4-caldY;
     
//     if(yVal%2===0){
//       //correction needs to happen in triangular portions & the offset rows
//       if(Math.abs(delta)>dY){
//           if(delta>0){//odd row bottom right half
//                 xVal--;
//                 yVal--;
//           }else{//odd row bottom left half
//                 yVal--;
//           }
//       }
//     }else{
//         if(dX>hexTileWidth/2){// available values don't work for even row bottom right half
//             if(dY<((hexTileHeight/2)-caldY)){//even row bottom right half
//                 yVal--;
//             }
//         }else{
//           if(dY>caldY){//odd row top right & mid right halves
//               xVal--;
//           }else{//even row bottom left half
//               yVal--;
//           }
//         }
//     }
//   pos.x=yVal;
//   pos.y=xVal;
// }

function findHexTileY(){
    var pos=game.input.activePointer.position;
    pos.x-=hexGrid.x;
    pos.y-=hexGrid.y;
    var xVal = Math.floor((pos.x)/(hexTileWidth*3/4));
    var yVal = Math.floor((pos.y)/(hexTileHeight));
    var dX = (pos.x)%(hexTileWidth*3/4);
    var dY = (pos.y)%(hexTileHeight); 
    var slope = (hexTileHeight/2)/(hexTileWidth/4);
    var caldX=dY/slope;
    var delta=hexTileWidth/4-caldX;
    if(xVal%2===0){
        if(dX>Math.abs(delta)){// even left
             
        }else{//odd right
            if(delta>0){//odd right bottom
                xVal--;
                yVal--;
            }else{//odd right top
                xVal--;
            }
        }
    }else{
        if(delta>0){
            if(dX<caldX){//even right top
                xVal--;
            }else{//odd mid
               yVal--; 
            }
        }else{//current values wont help for even right bottom
           if(dX<((hexTileWidth/2)-caldX)){//even right bottom
                xVal--;
           }
        } 
    }
   pos.x=yVal;
   pos.y=xVal;
   return pos;
}