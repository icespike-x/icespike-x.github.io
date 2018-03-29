var size = 512; // 注意，暂时只能做成正方形。

var canvas = document.getElementById("canvas_content");

canvas.width = canvas.height = size;

var context = canvas.getContext("2d");

var star_count = 100000;

var star_list = new Array(star_count);

// 用于矩阵乘法的旋转，简化代码。
var cos = Math.cos, sin = Math.sin;

// 显示用，这会将笛卡尔坐标转换成显示坐标。
function std2pixel(std)
{
    return {x: (std.x + 1) / 2 * size, y: (std.y + 1) / 2 * size};
}

// 显示用，会旋转之后再显示。
function rotateMatrix(degx, degy)
{
    var matrixX = new Array(4);
    matrixX[0] = new Array(          1,          0,          0,          0);
    matrixX[1] = new Array(          0,  cos(degx),  sin(degx),          0);
    matrixX[2] = new Array(          0, -sin(degx),  cos(degx),          0);
    matrixX[3] = new Array(          0,          0,          0,          1);

    var matrixY = new Array(4);
    matrixY[0] = new Array(  cos(degy),          0, -sin(degy),          0);
    matrixY[1] = new Array(          0,          1,          0,          0);
    matrixY[2] = new Array(  sin(degy),          0,  cos(degy),          0);
    matrixY[3] = new Array(          0,          0,          0,          1);
}

function Star()
{
    // 三维效果
    this.position = {x: 0, y: 0, z: 0};
    this.speed = {x: 0, y: 0, z: 0};
}