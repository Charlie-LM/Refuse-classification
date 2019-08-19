import mysql.connector

mq = mysql.connector.connect(
    host='192.168.0.46',
    user='sc',
    passwd='123456',
    database='pzl',
    port='3306'
)

mycursor = mq.cursor()

mycursor.execute("create database wo")
# mycursor.execute("show databases")
mq.commit()
for i in mycursor:
    print(i)