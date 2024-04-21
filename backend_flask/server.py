from flask import Flask, jsonify, request
from flask_cors import CORS
import exercises_manager
import json
import os
# Initializing flask app
app = Flask(__name__)
CORS(app)

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
    for workout in saved_workouts:
        if workout["ID"] == str(data["ID"]):
            return workout
    return "-1"

@app.route('/api/update_saved_exercises', methods=['POST'])
def update_saved_exercises():
    data = request.json
    id,exercises = str(data["ID"]), (data["exercises"])
    print(exercises)
    
    for exercise in exercises:
        exercise['info'] = ({
                            "sets" : 0,
                            "reps" : 0,
                            "weight" : 0 })
    print (exercises)
        
    with open(os.path.dirname(__file__)+'\\saved_workouts.json') as f:
        saved_workouts = json.load(f)
    for workout in saved_workouts:
        if workout['ID'] == id:
            workout["Exercises"] = exercises            
            with open(os.path.dirname(__file__)+'\\saved_workouts.json', 'w') as f:
                json.dump(saved_workouts, f, indent=2)
            return ({"message": "Success"})   
    return ({"message": "ERROR: ID not valid"})   

@app.route('/api/add_new_routine', methods=['POST'])
def add_new_routine():
    data = request.json
    name,id = data['Name'], data['ID']
    with open(os.path.dirname(__file__)+'\\saved_workouts.json') as f:
        saved_workouts = json.load(f)
    saved_workouts.append({
        "Name" : name,
        "ID": str(id),
        "Exercises" : []
    })
    with open(os.path.dirname(__file__)+'\\saved_workouts.json', 'w') as f:
        json.dump(saved_workouts, f, indent=2)
    return ({"message": "Successful"})   

@app.route('/api/remove_routine', methods=['POST'])
def remove_routine():
    data = request.json
    id = str(data['ID'])
    with open(os.path.dirname(__file__)+'\\saved_workouts.json') as f:
        saved_workouts = json.load(f)
        for workout in saved_workouts:
            if workout['ID'] == id:
                saved_workouts.remove(workout)
                for i, workout in enumerate(saved_workouts):
                    workout['ID'] = str(i)
                with open(os.path.dirname(__file__)+'\\saved_workouts.json', 'w') as f:
                    json.dump(saved_workouts, f, indent=2)
                
                return ({"message": "Successful"})   
    return ({"message": "ERROR ID not found"})  

@app.route('/api/rename_routine', methods=['POST'])
def rename_routine():
    data = request.json
    id, new_name = str(data["ID"]), data["Name"]
    with open(os.path.dirname(__file__)+'\\saved_workouts.json') as f:
        saved_workouts = json.load(f)
    for workout in saved_workouts:
        if workout['ID'] == id:
            workout['Name'] = new_name
            with open(os.path.dirname(__file__)+'\\saved_workouts.json', 'w') as f:
                json.dump(saved_workouts, f, indent=2)

            return ({"message": "Successful"})   
    return ({"message": "ERROR ID not found"})  

@app.route('/api/prev_workouts')
def prev_workouts():
    with open(os.path.dirname(__file__)+'\\prev_workouts.json') as f:
        prev_workouts = json.load(f)
    return prev_workouts

@app.route('/api/add_prev_workout', methods=['POST'])
def add_prev_workout():
    data = request.json
    print(data)
    with open(os.path.dirname(__file__)+'\\prev_workouts.json') as f:
        prev_workouts = json.load(f)
    prev_workouts.append(data)
    with open(os.path.dirname(__file__)+'\\prev_workouts.json', 'w') as f:
        json.dump(prev_workouts, f, indent=2)
    return prev_workouts

@app.route('/saved_exercises')
def send_saved_exercises():
    with open(os.path.dirname(__file__)+'\\saved_workouts.json') as f:
        saved_workouts = json.load(f)
    return jsonify(saved_workouts)

if __name__ == '__main__':
    app.run(debug=True)
