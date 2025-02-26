
class Task{

    static counter = 0;  
    constructor(title, description, dueDate, priority , project){
        this.id = ++Task.counter; 
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.setPriority(priority);
        this.project = project;
        this.done = false;
    }
    infos(){
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            project: this.project, 
            done:this.done
        }
    }
    setTitle(title){
        this.title = title;
    }
    setDescription(description){
        this.description = description;
    }
    setDueDate(dueDate){
        this.dueDate = dueDate;
    }
    setPriority(priority){
        if ( priority =='high') this.priority=1;
        else if ( priority =='medium') this.priority=2;
        else if ( priority =='low') this.priority=3;
    }
    setProject(project){
        this.project = project;
    }
    setDone(){
        this.done = true;
    }
    togleDone(){
        this.done = !this.done;
    }
    getTitle(){
        return this.title;
    }
    getDescription(){
        return this.description;
    }
    getDueDate(){
        return this.dueDate;
    }
    getPriorityInt(){
        return this.priority;
    }
    getProject(){
        return this.project;
    }
    getPriorityString(){
        if (this.priority == 1) return 'high';
        else if (this.priority == 2) return 'medium';
        else if (this.priority == 3) return 'low';
    }
    getId(){
        return this.id;
    }
    static getCounter(){
        return this.counter;
    }

    


    getHtmlTask() {
        let taskContainer = document.createElement('div');
        taskContainer.classList.add('single-task');

        taskContainer.id = this.id;
        taskContainer.classList.add(this.getPriorityString());


        let checkflexCreated=  document.createElement('div');
        checkflexCreated.classList.add('checkflex');
        

        let inputCheckbox = document.createElement('input');
        inputCheckbox.setAttribute('type', 'checkbox');
        if(this.done) inputCheckbox.checked = true;

        let infosDiv = document.createElement('div');
        infosDiv.classList.add('infos');
        if (this.done) infosDiv.classList.add("coched") ; 

        let taskTitleDiv = document.createElement('div');
        taskTitleDiv.classList.add('task-title');
        taskTitleDiv.textContent = this.title; 

        let taskDateDiv = document.createElement('div');
        taskDateDiv.classList.add('task-date');
        taskDateDiv.textContent = this.dueDate;

        infosDiv.appendChild(taskTitleDiv);
        infosDiv.appendChild(taskDateDiv);

        checkflexCreated.appendChild(inputCheckbox);
        checkflexCreated.appendChild(infosDiv);


        let iconsSvg = document.createElement('div');
        iconsSvg.classList.add('icons');

        iconsSvg.innerHTML= `<svg class="delete-task" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
              <svg 
              class="edit-task" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>`;


        taskContainer.appendChild(checkflexCreated);
        taskContainer.appendChild(iconsSvg);

        return taskContainer; 
    }


}

export {Task};
