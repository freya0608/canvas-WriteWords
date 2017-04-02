/**
 * Created by freya on 2017/4/2.
 */
var canvasWidth = 600;
var canvasHeight = canvasWidth;
var isMouseDown = false;

var lastLocation = {x:0,y:0};
var lastTimestamp = 0;
var lastLineWidth = -1;


var canvas =document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width  = canvasWidth;
canvas.height = canvasHeight;

drawGrid();

canvas.onmousedown = function (e) {
    e.preventDefault();
    isMouseDown = true;
    console.log('mousedown');

    lastLocation = windowToCanvas(e.clientX,e.clientY);
    lastTimestamp = new Date().getTime();
};

canvas.onmouseup = function (e) {
    e.preventDefault();
    isMouseDown = false;
    console.log('mouseup')

};
canvas.onmouseout = function (e) {
    e.preventDefault();
    isMouseDown = false;
    console.log('mouseout')
};
canvas.onmousemove = function (e) {
    e.preventDefault();
    if(isMouseDown){
        console.log('mousemove');
        var  curLocation = windowToCanvas(e.clientX,e.clientY);
        var curTimestamp = new Date().getTime();
        var s = calDistance(curLocation,lastLocation);
        var t = curTimestamp - lastTimestamp;

        var lineWidth = calLineWidth(t,s);

        //lastLocation和curLocation之间绘制线段
        context.beginPath();
        context.moveTo(lastLocation.x, lastLocation.y);
        context.lineTo(curLocation.x,  curLocation.y);

        context.strokeStyle= 'black';
        context.lineWidth = lineWidth;
        context.lineCap = 'round';//笔画链接流畅
        context.lineJoin = 'round';
        context.stroke();

        lastLocation = curLocation;
        lastTimestamp = curTimestamp;
        lastLineWidth = lineWidth;
    }
};


var maxLineWidth = 30;
var minLineWidth = 1;
var maxStrokeV = 10;
var minStrokeV = 0.1;
function calLineWidth(t, s) {
    var v = s/t;
    var resultLineWith;
    if(v<minStrokeV){
        resultLineWith = maxLineWidth;
    }else if(v>maxStrokeV){
        resultLineWith = minLineWidth;
    }else {
        resultLineWith = maxLineWidth-(v-minStrokeV)/(maxStrokeV-minStrokeV)*(maxLineWidth-minLineWidth)
    }


    if(lastLineWidth==-1){
        return resultLineWith;
    }

    return lastLineWidth*2/3+ resultLineWith*1/3;
}
// function calLineWidth(t, s) {
//     var v = s/t;
//     var resultLineWith;
//     if(v<0.1){
//         resultLineWith = 30;
//     }else if(v>10){
//         resultLineWith = 1;
//     }else {
//         resultLineWith = 30-(v-0.1)/(10-0.1)*(30-1)
//     }
//
//
//     if(lastLineWidth==-1){
//         return resultLineWith;
//     }
//
//     return lastLineWidth*2/3+ resultLineWith*1/3;
// }

function calDistance(loc1, loc2) {
    return Math.sqrt((loc1.x-loc2.x)*(loc1.x-loc2.x) + (loc1.y-loc2.y)*(loc1.y-loc2.y));
}



//转换为canvas下的坐标，从（0,0）开始
function windowToCanvas(x, y) {
    var bbox = canvas.getBoundingClientRect();
    return {
        x:Math.round(x-bbox.left),
        y:Math.round(y-bbox.top)
    }
}


function drawGrid() {
    context.save();

    context.strokeStyle='rgb(230,11,9)';

    context.beginPath();
    context.moveTo(3,3);
    context.lineTo(canvasWidth-3,3);
    context.lineTo(canvasWidth-3,canvasHeight-3);
    context.lineTo(3,canvasHeight-3);
    context.closePath();

    context.lineWidth = 6;
    context.stroke();

    context.beginPath();
    //左上到右下
    context.moveTo(0,0);
    context.lineTo(canvasWidth,canvasHeight);
    //左下到右上
    context.moveTo(canvasWidth,0);
    context.lineTo(0,canvasHeight);
    //竖着的
    context.moveTo(canvasWidth/2,0);
    context.lineTo(canvasWidth/2,canvasHeight);
    //横着的
    context.moveTo(0,canvasHeight/2);
    context.lineTo(canvasWidth,canvasHeight/2);

    context.lineWidth = 1;
    context.stroke();

    context.restore();
}








