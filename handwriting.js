/**
 * Created by freya on 2017/4/2.
 */
var canvasWidth = 600;
var canvasHeight = canvasWidth;
var isMouseDown = false;

var canvas =document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width  = canvasWidth;
canvas.height = canvasHeight;

drawGrid();

canvas.onmousedown = function (e) {
    e.preventDefault();
    isMouseDown = true;
    console.log('mousedown')
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
        console.log('mousemove')
    }
};

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








