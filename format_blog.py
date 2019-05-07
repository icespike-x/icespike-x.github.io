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
    f.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"styles/fonts.css\">\n")
    f.write("<div id=\"blog_content\">\r\n")
    f.write(orignal[0])
    currentTime = time.localtime()
    f.write("%d/%d/%d 星期%s %2d:%2d\n" % (currentTime.tm_year, currentTime.tm_mon, currentTime.tm_mday, weekday[currentTime.tm_wday], currentTime.tm_hour, currentTime.tm_min))
    f.write(''.join(orignal[1:]))
    f.write("</div>\n")