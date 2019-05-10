import os
import time
import sys

formated_mark = "<!-- mark formated blog -->\n"

origin_file = open(os.path.join("./blog/", sys.argv[1]), encoding="utf-8")
orignal = list(origin_file)
origin_file.close();

if orignal[0] == formated_mark:
    print("blog already formated")
    sys.exit()

weekday = ["一", "二", "三", "四", "五", "六", "日"]

with open(os.path.join("./blog/", sys.argv[1]), 'w', encoding="utf-8") as f:
    f.write(formated_mark)
    f.write("<!--" + origin_file[0][2:] + "-->")
    f.write("""<head>
        <script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
        <script type="text/x-mathjax-config">
            MathJax.Hub.Config({
                tex2jax: {
                    skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
                    inlineMath: [['$','$']]
                }
            });
        </script>
    </head>""")
    f.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"/styles/basic_styles.css\">\n")
    f.write("<a href=\"cngoodboy.github.io/blog.html\">返回</a>\r\n")
    f.write(orignal[0])
    currentTime = time.localtime()
    f.write("%d/%d/%d 星期%s %2d:%2d\n" % (currentTime.tm_year, currentTime.tm_mon, currentTime.tm_mday, weekday[currentTime.tm_wday], currentTime.tm_hour, currentTime.tm_min))
    f.write(''.join(orignal[1:]))