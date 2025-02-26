import {Task} from './task.js';
class Project {
    tasksProject= [];
    static projectsCounter = 0 ; 
    constructor(name){
        this.name = name;
        this.id = ++Project.projectsCounter;
    }
    setName(name){
        this.name = name ; 
    }
    getId(){
        return this.id;
    }
    getName(){
        return this.name ; 
    }
    addTask(task){
        this.tasksProject.push(task);
    }
    getTasks(){
        // sorted by priority
        return this.tasksProject.sort((a, b) => a.getPriorityInt() - b.getPriorityInt());
    }




}

export {Project};