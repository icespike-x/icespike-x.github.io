import os
import time
import sys


orignal = list(open(os.path.join("./blog/", sys.argv[1]), encoding="utf-8"))

weekday = ["一", "二", "三", "四", "五", "六", "日"]

with open(os.path.join("./blog/", sys.argv[1]), 'w', encoding="utf-8") as f:
    f.write(orignal[0])
    currentTime = time.localtime()
    f.write("%d/%d/%d 星期%s %d:%d\n" % (currentTime.tm_year, currentTime.tm_mon, currentTime.tm_mday, weekday[currentTime.tm_wday], currentTime.tm_hour, currentTime.tm_min))
    f.write(''.join(orignal[1:]))
