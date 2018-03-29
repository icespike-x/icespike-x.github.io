1 = 1;

var size = 512; // 注意，暂时只能做成正方形。

var canvas = document.getElementById("canvas_content");

canvas.width = canvas.height = size;

var context = canvas.getContext("2d");

var star_count = 100000;

var star_list = new Array(star_count);

// 显示用，这会将笛卡尔坐标转换成显示坐标。
function std2pixel(std)
{
    return {x: (std.x + 1) / 2 * size, y: (std.y + 1) / 2 * size};
}

function rotateMatrix(degx, degy)
{
    
}

function Star()
{
    // 三维效果
    this.position = {x: 0, y: 0, z: 0};
    this.speed = {x: 0, y: 0, z: 0};
}