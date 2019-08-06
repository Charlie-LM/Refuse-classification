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
        'type': 'lajifenlei',
        'url': kw,
        'src': 'onebox',
        'p1': 0,
        'num': 1,
        # 'callback':'jsonp1'
    }
    res = requests.get(url, params=data)
    html = res.text  # 得到的文本html页面

    #new_html = html.encode('utf-8').decode('unicode_escape')  # 转码后的html页面
    # print(new_html)
    # print(type(y))

    final_html = eval(html)
    # 将json格式转换成字典形式

    rubbish = final_html['key']
    # print(rubbish)  # 搜索的关键字

    rubbish_type = final_html['display']['type']
    if rubbish_type == "干垃圾":
        rubbish_type = rubbish_type+"(又名其他垃圾)"
    elif rubbish_type == "湿垃圾":
        rubbish_type = rubbish_type+"(又名厨余垃圾)"
    # print(rubbish_type)  # 垃圾关键字类别

    rubbish_type_reason = final_html['display']['abstract'][0]
    # print(rubbish_type_reason)  # 属垃圾类别原因

    rubbish_true = final_html['display']['tabs']  # 垃圾的所在区域，方便截取
    rubbish_true_content = final_html['display']['type']  # 根据垃圾的所属类别寻找更详细的信息
    dict_all = {}
    for i in rubbish_true:
        if rubbish_true_content in i.values():
            # print(i)

            rubbish_type_def = i['abstract']
            # print(rubbish_type_def)  # 垃圾所属类别的定义

            rubbish_type_content = i['example']
            # print(rubbish_type_content)  # 垃圾所属类别的内容

            # 该垃圾的分类方法
            rubbish_way1 = i['claim'][0]
            # print(rubbish_way1)
            rubbish_way2 = i['claim'][1]
            # print(rubbish_way2)
            dict_all = {'rubbish': rubbish,
                        'rubbish_type': rubbish_type,
                        'rubbish_type_reason': rubbish_type_reason,
                        'rubbish_type_def': rubbish_type_def,
                        'rubbish_type_content': rubbish_type_content,
                        'rubbish_way1': rubbish_way1,
                        'rubbish_way2': rubbish_way2,
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
