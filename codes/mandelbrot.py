from PIL import Image, ImageDraw
from math import sqrt

# 清晰度，坐标轴转换成像素的比例值。
SCALE = 256

# 迭代深度
ITER_DEPTH = 64

# 控制着色的参数，建议设置成 ITER_DEPTH / 16
ITER_PER_COLOR = 4

im = Image.new('RGB', (4 * SCALE,) * 2, 0)

g = ImageDraw.Draw(im)

for i in range(SCALE * 4):
    for j in range(SCALE * 4):
        # 将像素位置转换成坐标轴上的位置。
        x = i / SCALE - 2.0
        y = j / SCALE - 2.0

        # 初始化迭代的参数

        c = complex(x, y)

        z = complex(0, 0)

        # 迭代，迭代终止时使用迭代的次数作色。

        for k in range(ITER_DEPTH):
            z = z ** 2
            z += c
            if z.real ** 2 + z.imag ** 2 > 4:
                # 着色，使用的公式可以让输出的图片变得更清晰
                g.point((i, j), (0, int((k // ITER_PER_COLOR) * ((256 - 1) / (ITER_DEPTH // ITER_PER_COLOR))), 0))
                break
            

im.save("mandelbrot.jpg", format='JPEG')
