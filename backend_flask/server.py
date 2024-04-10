from flask import Flask, jsonify, request
import exercises_manager
import json
import os
# Initializing flask app
app = Flask(__name__)

@app.route('/data')
def hello_world():
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

params = {
    'level' : 'intermediate',
    'equipment' : "cable",
    'primaryMuscles' : []
    }

@app.route('/filtered_exercises')
def filtered_exercises():
    data = exercises_manager.filter_exercises(params)
    return jsonify(data)

@app.route('/all_exercises')
def all_excercises():
    data = exercises_manager.data
    return jsonify(data)

@app.route('/login')
def login_receive_data():
    data = request.json
    return jsonify({'message': 'Data received successfully'})

@app.route('/api/data', methods=['POST'])
def receive_data():
    with open(os.path.dirname(__file__)+'\\accounts.json') as f:
        user_logins = json.load(f)
    data = request.json 
    if data in user_logins:
        return_message = {'message': 'Login successful!'} 
    else:
        return_message = {'message': 'Login failed, incorrect email/password!'} 
        
    return jsonify(return_message)

if __name__ == '__main__':
    app.run(debug=True)
