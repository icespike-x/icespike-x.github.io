var size = 512; // 注意，暂时只能做成正方形。

var canvas = document.getElementById("canvas_content");

canvas.width = canvas.height = size;

var context = canvas.getContext("2d");

var star_count = 100000;

var center_g = 0.3;

var star_list = new Array(star_count);

// 用于矩阵乘法的旋转，简化代码。
var cos = Math.cos, sin = Math.sin;

var fps = 30;

// 显示用，这会将笛卡尔坐标转换成显示坐标。
function std2pixel(std)
{
    return {x: (std.x + 1) / 2 * size, y: (std.y + 1) / 2 * size};
}

// 生成旋转矩阵。
function rotateMatrix(degx, degy)
{
    var matrixX = new Array(4);

    matrixX[0] = [          1,          0,          0,          0];
    matrixX[1] = [          0,  cos(degx),  sin(degx),          0];
    matrixX[2] = [          0, -sin(degx),  cos(degx),          0];
    matrixX[3] = [          0,          0,          0,          1];

    var matrixY = new Array(4);

    matrixY[0] = [  cos(degy),          0, -sin(degy),          0];
    matrixY[1] = [          0,          1,          0,          0];
    matrixY[2] = [  sin(degy),          0,  cos(degy),          0];
    matrixY[3] = [          0,          0,          0,          1];

    matrix = new Array(4);
    for (var i = 0; i < 4; i++)
    {
        matrix[i] = new Array(4);
        for (var j = 0; j < 4; j++)
        {
            matrix[i][j] = 0;
            for (var k = 0; k < 4; k++)
            {
                matrix[i][j] += matrixX[i][k] * matrixY[k][j];
            }
        }
    }
    return matrix;
}

// 返回矩阵变换后的坐标。
function transform(pos, matrix)
{
    var vec = [new Array(pos.x, pos.y, pos.z, 0)];
    var nvec = [new Array(4)];
    for (var i = 0; i < 4; i++)
    {
        nvec[0][i] = 0;
        for (var j = 0; j < 4; j++)
        {
            nvec[0][i] += vec[0][j] * matrix[j][i];
        }
    }
    return {x: nvec[0], y: nvec[1], z: nvec[2]};
}

function Star()
{
    // 三维效果
    this.pos = {x: 0, y: 0, z: 0};
    this.speed = {x: 0, y: 0, z: 0};
    this.get_power = () => {
        var distance = Math.sqrt(Math.pow(this.pos.x, 2) + Math.pow(this.pos.y, 2) + Math.pow(this.pos.z, 2));
        return center_g / (distance * distance);
    }
    this.get_v = () => {
        var distance = Math.sqrt(Math.pow(this.pos.x, 2) + Math.pow(this.pos.y, 2) + Math.pow(this.pos.z, 2));
        return Math.sqrt(distance * this.get_power());
    }
    this.init = () => {
        var d = Math.random() * 0.8 + 0.1
        var r = Math.random() * Math.PI * 2 - Math.PI;
        this.pos.x = cos(r) * d;
        this.pos.y = sin(r) * d;
        var v = this.get_v();
        // 计算初始速度以进行圆周运动。
        d = d + Math.PI;
    }
}