
import configparser
import pymysql
import pymysql.cursors

CP = configparser.ConfigParser()
CP.read('config.ini')

# sql db connection details
DATABASE = CP.get('sql_conn', 'database')
HOST = CP.get('sql_conn', 'host')
USERNAME = CP.get('sql_conn', 'username')
PASSWORD = CP.get('sql_conn', 'password')

def get_connection():
    con = pymysql.connect(HOST, USERNAME, PASSWORD, DATABASE,  charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    return con

# cursor = db.cursor()
# sql = "SELECT * FROM employee"
# cursor.execute(sql)
# results = cursor.fetchall()