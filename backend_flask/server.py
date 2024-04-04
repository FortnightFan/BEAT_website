

# Filename - server.py
 
# Import flask and datetime module for showing date and time
from flask import Flask
import datetime
 
x = datetime.datetime.now()
 
# Initializing flask app
app = Flask(__name__)
 
 
# Route for seeing a data
@app.route('/data')
def hello_world():
    # Returning an api for showing in  reactjs
    return {
        'Name':"Kevin", 
        "Age":"21",
        }
 
@app.route('/weekly')
def workouts():
    return {
        'w1':1,
        'w2':0,
        'w3':2,
        'w4':3,
        'w5':5,
        'w6':0,
        'w7':2,
    }
     
# Running app
if __name__ == '__main__':
    app.run(debug=True)
