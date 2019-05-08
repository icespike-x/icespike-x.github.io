import os
import json
import io


blog_info = dict(langth = 0, value=list())

blogs = os.listdir("./blog/")

blogs = list(filter(lambda x: x.endswith(".md"), blogs))

blogs.sort()

blog_list = []

for i in blogs:
    blog_dict = {}
    with open("./blog/" + i, encoding="utf-8") as f:
        f.readline()
        blog_dict['title'] = f.readline()[5:-5]
    blog_dict['href'] = "./blog/" + i[:-3]
    blog_info['value'].append(blog_dict)

blog_info['value'].reverse()

blog_info['length'] = len(blog_info['value'])

json.dump(blog_info, open("blog/bloglist.json", 'w', encoding="utf-8"), ensure_ascii=False)
