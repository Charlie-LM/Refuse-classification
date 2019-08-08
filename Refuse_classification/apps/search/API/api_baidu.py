"""
@file:   .py 
@author:  pzl
@date:  2019/07/09  
"""
import requests


def jiekou(value):
    kw = value
    url = 'https://open.onebox.so.com/dataApi'
    data = {
        'query': kw,
        'type': 'garbage',
        'url': kw,
        'src': 'onebox',
        'num': 1,
        'addInfo': 'city%3A%E5%8C%97%E4%BA%AC'

        # 'callback':'jsonp1'
    }
    res = requests.get(url, params=data)
    html = res.text  # 得到的文本html页面
    final_html = eval(html)
    # print(final_html)
    dict_all = {}
    img = ""
    # 将json格式转换成字典形式

    rubbish = final_html['key']
    # print(rubbish)  # 搜索的关键字

    rubbish_type = final_html['display']['type']



    if rubbish_type == "干垃圾":
        rubbish_type = rubbish_type + "(又名其他垃圾)"
    elif rubbish_type == "湿垃圾":
        rubbish_type = rubbish_type + "(又名厨余垃圾)"
    # print(rubbish_type)  # 垃圾关键字类别

    rubbish_type_reason = final_html['display']['abstract']
    j = ""
    for i in rubbish_type_reason:
        j += i + "<br/>"
    rubbish_type_reason = j
    # print(rubbish_type_reason)  # 属垃圾类别原因

    rubbish_true = final_html['display']['tabs']  # 垃圾的所在区域，方便截取
    rubbish_true_content = final_html['display']['hittab']  # 根据垃圾的所属类别寻找更详细的信息


    for i in rubbish_true:
        rubbish_def_title = rubbish_true_content + "主要包括"
        rubbish_def_title2 = rubbish_true_content + "投放要求"
        if rubbish_true_content in i.values():
            # print(i)

            rubbish_type_def = i['abstract']
            # print(rubbish_type_def)  # 垃圾所属类别的定义

            rubbish_type_content = i['example']
            # print(rubbish_type_content)  # 垃圾所属类别的内容

            # 该种垃圾的分类方法
            rubbish_way = i['claim']
            z = ""
            for x in rubbish_way:
                z += x + "<br/>"
            rubbish_way = z


            dict_all = {'rubbish': rubbish,
                        'rubbish_type': rubbish_type,
                        'rubbish_type_reason': rubbish_type_reason,
                        'rubbish_def_title': rubbish_def_title,
                        'rubbish_type_def': rubbish_type_def,
                        'rubbish_type_content': rubbish_type_content,
                        'rubbish_def_title2': rubbish_def_title2,
                        'rubbish_way': rubbish_way,
                        'rubbish_img': "/static/img/"+rubbish_true_content+".jpg",
                        }

    return dict_all


"""
rubbish 关键字
rubbish_type 垃圾类别
rubbish_type_reason  属于某垃圾的原因
rubbish_type_def   属垃圾类型的定义
rubbish_type_content  该垃圾类型的内容
rubbish_way1  丢垃圾的两种方法
rubbish_way2
"""
