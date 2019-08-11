from bs4 import BeautifulSoup
import re

# news_id = re.findall(r"/zxxwlb/index_55_(.*).html","/zxxwlb/index_55_12131344.html")
# print(news_id)

x = re.findall(r'<p>[\s\S]\s+(.*)[\s\S]</p>', """<p>
	　　青海省西宁市生活垃圾分类试点工作启动以来，目前生活垃圾分类达标小区覆盖率达30%。
</p>
""")
print(x)
