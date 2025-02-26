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

    getHtmlProject(){

        let project = document.createElement('div');
        project.classList.add('single-project');

        project.setAttribute('id', this.id);

        let checkflexCreated=  document.createElement('div');
        checkflexCreated.classList.add('checkflex');
        let infos = document.createElement('div');
        infos.classList.add('infos');
        
        let projectName = document.createElement('div');
        projectName.classList.add('project-name');
        projectName.textContent = this.name;
        infos.appendChild(projectName);

        checkflexCreated.appendChild(infos);

        let iconsSvg = document.createElement('div');
        iconsSvg.classList.add('icons');

        iconsSvg.innerHTML= `<svg class="delete-project" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
              <svg 
              class="edit-project" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>`;

              
        project.appendChild(checkflexCreated);
        project.appendChild(iconsSvg);
        return project;
    }





}

export {Project};