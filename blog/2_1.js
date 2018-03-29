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

var speed_noise_rate = 0.05;

var alpha_per_star = 16;

// 显示用，这会将笛卡尔坐标转换成显示坐标。
function std2pixel(std)
{
    return {x: Math.floor((std.x + 1) / 2 * size), y: Math.floor((std.y + 1) / 2 * size)};
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
    this.update = () => {
        // 更新坐标
        this.pos.x += this.speed.x / fps;
        this.pos.y += this.speed.y / fps;
        this.pos.z += this.speed.z / fps;

        // 更新速度
        var normalized_pos = this.pos;
        var distance = Math.sqrt(Math.pow(this.pos.x, 2) + Math.pow(this.pos.y, 2) + Math.pow(this.pos.z, 2));
        normalized_pos.x *= distance;
        normalized_pos.y *= distance;
        normalized_pos.z *= distance;
        var power = this.get_power();
        var speed_update = normalized_pos;
        speed_update.x *= power;
        speed_update.y *= power;
        speed_update.z *= power;
        this.speed.x += speed_update.x;
        this.speed.y += speed_update.y;
        this.speed.z += speed_update.z;

        // 检测越界
        if (distance >= 10)
        {
            this.init();
        }
    }
    this.init = () => {
        // 生成一个随机的初始位置
        var d = Math.random() * 0.8 + 0.1
        var r = Math.random() * Math.PI * 2 - Math.PI;
        this.pos.x = cos(r) * d;
        this.pos.y = sin(r) * d;

        // 计算初始速度以进行圆周运动。
        var v = this.get_v();
        var v_angle = d - Math.PI / 2;
        this.speed.x = cos(v_angle) * v;
        this.speed.y = sin(v_angle) * v;

        // 为速度添加噪声
        var s_noise = v * speed_noise_rate * Math.random();
        var speed_r_xy = Math.random() * Math.PI * 2 - Math.PI;
        var speed_r_z = sin(Math.random() * Math.PI * 2 - Math.PI) * Math.PI * 2 - Math.PI;
        var speed_noise = {x: cos(speed_r_xy) * s_noise, y: sin(speed_r_xy) * s_noise, z: 0};
        speed_noise.z = sin(speed_r_z);
        speed_noise.x *= cos(speed_r_z);
        speed_noise.y *= cos(speed_r_z);
        this.speed.x += speed_noise.x;
        this.speed.y += speed_noise.y;
        this.speed.x += speed_noise.z;
    }
    this.init();
}

// 初始化恒星列表
for (var i = 0; i < star_list; i++)
{
    star_list[i] = new Star();
}

// 处理一帧的信息
function display_and_update()
{
    // 更新。
    for (var i = 0; i < star_count; i++)
    {
        star_list[i].update();
    }

    // 绘制所有恒星
    var imageData = context.createImageData(size, size);
    var getIndex = (x , y) => {
        return (x * size + y) * 4;
    }
    for (var i = 0; i < size; i++)
    {
        for (var j = 0; j < size; j++)
        {
            var index = getIndex(i, j);
            imageData.data[index] = imageData.data[index + 1] = imageData.data[index + 2] = 255;
            imageData.data[index + 3] = 0;
        }
    }
    for (var i = 0; i < star_count; i++)
    {
        var pos = star_list[i].pos;
        var pix_pos = std2pixel(pos);
        imageData.data[getIndex(pix_pos.x, pix_pos.y) + 3] += alpha_per_star;
    }
    context.putImageData(imageData, 0, 0);
}

function loop()
{
    setTimeout("loop()", 1000.0 / fps);
    display_and_update();
}
