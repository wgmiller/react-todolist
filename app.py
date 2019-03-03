import datetime
import json
import time
import sqlite3 as sql
from flask_cors import CORS
from flask import Flask, redirect, render_template, request, url_for, jsonify

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

db = "database.db"


@app.route("/list", methods=['POST', 'GET', 'PUT', 'DELETE'])
def list():
    """
    method that handles GET, POST, and PUT requests
    """
    msg = ''
    if request.method == 'POST':
        try:
            cjson = request.get_json()
            c = cjson.get('contents')

            with sql.connect("database.db") as con:
                cur = con.cursor()
                cur.execute("INSERT INTO todolist (item, complete) VALUES (?,?)",(c,0) )
            
                con.commit()
                msg = "Record successfully added"
        except:
            con.rollback()
            msg = "error in insert operation"
    
        finally:
            response = get_list()
            #response = jsonify({'msg': msg})
            response.status_code = 200
            response.headers['Access-Control-Allow-Origin'] = '*'
            return response
            con.close()
    
    elif request.method == 'PUT':
        try:
            cjson = request.get_json()
            c = cjson.get('contents')

            with sql.connect("database.db") as con:
                cur = con.cursor()
                cur.execute("UPDATE todolist SET complete = CASE WHEN complete > 0 THEN 0 ELSE 1 END WHERE todo_id = ?",(c,))
                #cur.execute("UPDATE todolist SET complete = ? WHERE todo_id = ?", (1,c))
            
                con.commit()
                msg = "Record " + c + " successfully updated"
        except:
            con.rollback()
            msg = "error in update operation"
    
        finally:
            response = get_list()
            #response = jsonify([{'msg': msg}])
            response.status_code = 200
            response.headers['Access-Control-Allow-Origin'] = '*'
            return response
            con.close()

    elif request.method == 'DELETE':
        try:
            cjson = request.get_json()
            c = cjson.get('contents')

            with sql.connect("database.db") as con:
                cur = con.cursor()
                cur.execute("DELETE FROM todolist WHERE todo_id = ?",(c,))
            
                con.commit()
                msg = "Record " + c + " successfully deleted"
        except:
            con.rollback()
            msg = "error in update operation"
    
        finally:
            response = get_list()
            #response = jsonify([{'msg': msg}])
            response.status_code = 200
            response.headers['Access-Control-Allow-Origin'] = '*'
            return response
            con.close()
    
    else:
        #GET
        return get_list()

@app.route("/list/markall", methods=['GET', 'PUT'])
def mark_all():
    if request.method == 'PUT':
        try:
            with sql.connect("database.db") as con:
                cur = con.cursor()
                cur.execute("UPDATE todolist SET complete = ?",(1,))
                #cur.execute("UPDATE todolist SET complete = ? WHERE todo_id = ?", (1,c))
            
                con.commit()
                msg = "Records successfully updated"
        except:
            con.rollback()
            msg = "error in update operation"
    
        finally:
            response = get_list()
            #response = jsonify([{'msg': msg}])
            response.status_code = 200
            response.headers['Access-Control-Allow-Origin'] = '*'
            return response
            con.close()

def get_list():
    con = sql.connect(db)
    con.execute('CREATE TABLE IF NOT EXISTS todolist (todo_id INTEGER PRIMARY KEY, item TEXT, complete INTEGER)')
    con.row_factory = sql.Row

    cur = con.cursor()
    cur.execute("select * from todolist")

    rows = cur.fetchall(); 
    items = []
    for r in rows:
        obj = {
            'task': r["item"],
            'complete': r["complete"],
            'id': r["todo_id"]
        }
        items.append(obj)
    response = jsonify(items)
    response.status_code = 200
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response
 
if __name__ == "__main__":
    """
    this is run when the script is started.
    """
 
    # this is how we run the flask server, once the script is run
    app.run(host='0.0.0.0', threaded=True)