from flask import Flask, jsonify, request
from flask_cors import CORS
import exercises_manager
import json
import os
# Initializing flask app
app = Flask(__name__)
CORS(app)

""" ROUTINES_FILE = os.path.join(os.path.dirname(__file__), 'routines.json')


def load_routines():
    if not os.path.exists(ROUTINES_FILE):
        return []
    with open(ROUTINES_FILE, 'r') as f:
        return json.load(f)

def save_routines(routines):
    with open(ROUTINES_FILE, 'w') as f:
        json.dump(routines, f)

@app.route('/routines', methods=['GET'])
def get_routines():
    routines = load_routines()
    return jsonify(routines)

@app.route('/routines/<int:routine_id>', methods=['PUT'])
def update_routine(routine_id):
    routines = load_routines()
    routine = next((r for r in routines if r['id'] == routine_id), None)
    if not routine:
        return jsonify({'error': 'Routine not found'}), 404
    routine['name'] = request.json.get('name', routine['name'])
    save_routines(routines)
    return jsonify(routine), 200

@app.route('/routines', methods=['POST'])
def add_routine():
    routines = load_routines()
    if not request.json or 'name' not in request.json:
        return jsonify({'error': 'Bad request'}), 400
    new_id = max((routine['id'] for routine in routines), default=0) + 1
    new_routine = {
        'id': new_id,
        'name': request.json['name']
    }
    routines.append(new_routine)
    save_routines(routines)
    return jsonify(new_routine), 201

@app.route('/routines/<int:routine_id>', methods=['DELETE'])
def delete_routine(routine_id):
    routines = load_routines()
    new_routines = [routine for routine in routines if routine['id'] != routine_id]
    if len(routines) == len(new_routines):
        return jsonify({'error': 'Routine not found'}), 404
    save_routines(new_routines)
    return jsonify({'message': 'Routine deleted successfully'}), 200 """

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

@app.route('/api/filtered_exercises',  methods=['POST'])
def filtered_exercises():
    params = request.json 
    data = exercises_manager.filter_exercises(params)
    # print(json.dumps(data, indent=4))
    return jsonify(data)

@app.route('/all_exercises')
def all_excercises():
    data = exercises_manager.data
    return jsonify(data)

@app.route('/login')
def login_receive_data():
    data = request.json
    return jsonify({'message': 'Data received successfully'})

@app.route('/api/login', methods=['POST'])
def receive_data():
    with open(os.path.dirname(__file__)+'\\accounts.json') as f:
        user_logins = json.load(f)
    data = request.json 
    for user in user_logins:
        if user["email"] == data['email'] and user["password"] == data['password']:
            return_message =    {  
                                'message': 'Login successful!',
                                'user' : user
                                } 
            break
    else:
        return_message = {'message': 'Login failed, incorrect email/password!'} 
        
    return jsonify(return_message)

@app.route('/api/saved_exercises', methods=['POST'])
def check_saved_exercises():
    with open(os.path.dirname(__file__)+'\\saved_workouts.json') as f:
        saved_workouts = json.load(f)
    data = request.json
    print (data)
    for workout in saved_workouts:
        if workout["ID"] == str(data["ID"]):
            return workout
    return "-1"

if __name__ == '__main__':
    app.run(debug=True)
