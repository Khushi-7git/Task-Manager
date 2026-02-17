from fastapi import FastAPI
from pydantic import BaseModel 
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],   
    allow_headers=["*"],
    allow_credentials=True
)

#define a task model

class Task(BaseModel):
    id:int
    title:str
    description:Optional[str]=None
    complete :bool=False

#create a list to store tasks
task_db=[]

#create a task
@app.post("/tasks/",response_model=Task)
def create_task(task:Task):
    task_db.append(task)
    return task

#get all tasks
@app.get("/tasks/",response_model=List[Task])
def get_tasks():
    return task_db

#get a tsk by id
@app.get("/tasks/{task_id}",response_model=Task)
def get_task(task_id:int):
    for task in task_db:
        if task_id==task.id:
            return task
    return {"message":"Task not found"}

#update a task
@app.put("/tasks/{task_id}",response_model=Task)
def update_task(task_id:int,updated_task:Task):
    for index,task in enumerate(task_db):
        if task_id==task.id:
            task_db[index]=updated_task
            return updated_task
    return {"message":"Task not found"}

# delete a task
@app.delete("/tasks/{task_id}")
def delete_task(task_id:int):
    for index,task in enumerate(task_db):
        if task_id==task.id:
            del task_db[index]
            return {"message":"Task deleted"}   
    return {"message":"Task not found"}