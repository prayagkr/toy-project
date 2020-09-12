
import configparser
import pymysql

CP = configparser.ConfigParser()
CP.read('config.ini')

# sql db connection details
DATABASE = CP.get('sql_conn', 'database')
HOST = CP.get('sql_conn', 'host')
USERNAME = CP.get('sql_conn', 'username')
PASSWORD = CP.get('sql_conn', 'password')


db = pymysql.connect(HOST, USERNAME, PASSWORD, DATABASE)

# cursor = db.cursor()
# sql = "SELECT * FROM employee"
# cursor.execute(sql)
# results = cursor.fetchall()