# coding=gbk
# ������̣�����python
# __auther__ = 'Mr.Hu'


class Pageinfo(object):
    #                  ��ǰҳ  ��������    ÿҳ��ʾ����  չ��ҳ������
    def __init__(self, page, all_count, par_page, url, showpage=11):
        try:
            self.page = int(page)
        except Exception as e:
            self.page = 1
        self.par_page = par_page
        # ������ҳ����
        a, b = divmod(all_count, par_page)
        if b:
            a = a + 1
        self.all_page = a  # ��ҳ��
        self.showpage = showpage
        self.url = url

    # ȡֵ��ʼ
    def start(self):
        return (self.page - 1) * self.par_page

    #     ȡֵ����
    def end(self):
        return self.page * self.par_page

    def a_page(self):
        if self.all_page <= self.showpage:
            begin = 1
            sotp = self.all_page + 1
        else:
            if self.page <= 5:
                begin = 1
                sotp = self.showpage
            else:
                if self.page + 5 >= self.all_page:
                    begin = self.all_page - self.showpage
                    sotp = self.all_page + 1
                else:
                    begin = self.page - 5
                    sotp = self.page + 5 + 1
        if self.page <= 1:
            # prev = f"<a class='page-link' href='' aria-label='Previous'><< ��һҳ</a>"
            prev = f'<a class="page pageSet cur" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span></a>'
        else:
            # prev = f"<a class='page-link' href='{self.url}?page={self.page - 1}' aria-label='Previous'><< ��һҳ</a>"
            prev = f'<a class="page pageSet cur" href="{self.url}{self.page - 1}" aria-label="Previous"><span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span></a>'
        if self.page >= self.all_page:
            # next = f"<a class='page pageSet cur' href='' aria-label='Next'>��һҳ>></a>"
            next = f'<a class="page pageSet cur" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a>'
        else:
            next = f'<a class="page pageSet cur" href="{self.url}{self.page + 1}" aria-label="Next"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a>'
            # next = f"<a class='page-link' href='{self.url}?page={self.page + 1}' aria-label='Previous'>��һҳ>></a>"

        pagelist = []
        pagelist.append(prev)
        for i in range(begin, sotp):
            if i == self.page:
                # v = f"<a  class='page-item active' href='{self.urpage pageSet curpage={i}'>{i}</a>"
                v= f'<a class="activesss page pageSet cur" style="background-color:#015231;color:#fff" href="{self.url}{i}">{i}</a>'
            else:
                # v = f"<a  class='page-item active' href='{self.url}?page={i}'>{i}</a>"
                v= f'<a class="page pageSet cur " href="{self.url}{i}">{i}</a>'

            pagelist.append(v)
        pagelist.append(next)
        # print(v)
        return ''.join(pagelist)
