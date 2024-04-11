import json, os
global data

with open(os.path.dirname(__file__)+'\\exercises.json') as f:
    data = json.load(f)


def filter_exercises(params : dict):
    exercises = []
    for i in range(0,len(data)):
        if data[i]["level"] == params["level"] or params["level"] == None:
            if data[i]["equipment"] == params["equipment"] or params["equipment"] == None:
                if any (item in data[i]["primaryMuscles"] for item in params["primaryMuscles"]) or params["primaryMuscles"] == []:
                    exercises.append(data[i])
    return exercises

def filter_exercises_test():
    params = {
        'level' : None,
        'equipment' : None,
        'primaryMuscles' : []
    }
    params['level'] = 'beginner'
    params['equipment'] = 'body only'
    params['primaryMuscles'] = ['forearms']
    print(json.dumps(filter_exercises(params), indent=4))