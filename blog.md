# CNGOODBOY: A blog full of interesting maths.
[BACK TO HOME](https://cngoodboy.github.io)
<script>
    
	var xmlHttp = new XMLHttpRequest();

	document.writeln("<ul>");

	xmlHttp.open("GET", "/blog/bloglist.json", false);
	xmlHttp.send(null);

	var bloglist = JSON.parse(xmlHttp.responseText);
	var length = bloglist.length;
	var blogs = bloglist.value;
	var pageId = window.location.search.match(/page=\d+/i);
	if (!pageId) {
		window.location.href = "https://cngoodboy.github.io/blog?page=1";
	}
	else {
		pageId = parseInt(pageId[0].substr(5, pageId[0].length));
	}
	pageId -= 1;
	if (length < pageId * 20) {
		window.location.href = "https://cngoodboy.github.io/blog?page=1";
	}
	for (var i = 0; i < 20; i++) {
        if (pageId * 20 + i > length)
			break;
    	var obj = blogs[pageId * 20 + i];
		document.write("<li><a href=\"" + obj.href + "\" target=\"_blank\">" + obj.title + "</a></li>");
	}
	document.writeln("</ul>");
	if ((pageId + 1) * 20 < length) {
		document.write("<a href=\"https://cngoodboy.github.io/blog?page=" + (pageId + 1) + "\">OLDER</a>")
	}
	if (pageId > 1) {
		document.write("<a href=\"https://cngoodboy.github.io/blog?page=" + (pageId - 1) + "\">NEWER</a>")
	}

</script>