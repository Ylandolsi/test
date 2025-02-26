class task{
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
    infos(){
        return {
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority
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
        this.priority = priority;
    }


    editOrNewTask(edit){

        let taskContainer = document.querySelector('.single-task');
    
    
        if ( edit ){
        
            let taskData = {
                title: taskContainer.getAttribute('task-title') , 
                description: taskContainer.getAttribute('description') , 
                dueDate: taskContainer.getAttribute('task-date') , 
                priority: taskContainer.getAttribute('priority') ,
                project: taskContainer.getAttribute('project')
            }
    
            // data of this task to modify on 
            document.getElementById('Task-title-input').value = taskData.title;
            document.getElementById('Task-Notes-input').value = taskData.description;
            document.getElementById('Task-Date-input').value = taskData.dueDate;
            document.getElementById('Task-Priority-input').value = taskData.priority;
            document.getElementById('Task-Project-input').value = taskData.project;
    
        
        }
        dialogTask.showModal();
    
        let buttonSubmit = document.querySelector('.new-Task-form .buttons .submit'); 
        let cancel = document.querySelector('.new-Task-form .buttons .cancel');
        let form = document.querySelector('.new-Task-form');
    
        buttonSubmit.textContent = 'Edit';
    
    
    
        const requiredFields = Array.from(form.querySelectorAll('input[required], select[required]'));
    
    
        function checkFormValidity() {
            let isValid = true;
            requiredFields.forEach(field => {
                if (!field.value || (field.type === 'date' && field.value === '') || (field.tagName.toLowerCase() === 'select' && field.value === '')) {
                    isValid = false;
                }
            });
            if (isValid) {
                if (buttonSubmit.classList.contains('cannot'))
                buttonSubmit.classList.remove('cannot');
                if (!buttonSubmit.classList.contains('can'))
                buttonSubmit.classList.add('can');
            } else {
                if (buttonSubmit.classList.contains('can'))
                buttonSubmit.classList.remove('can');
                if(!buttonSubmit.classList.contains('cannot'))
                buttonSubmit.classList.add('cannot');
            }
        }
    
    
    
    
    
        cancel.addEventListener('click', function(){
            dialogTask.close();
        });
    
        if ( buttonSubmit.classList.contains('cannot') )
            buttonSubmit.classList.add('cannot');
    
    
    
    
    
        // this happens once 
        checkFormValidity();
    
    
        // this is dynamically ,  the event must be done before because its callback
        requiredFields.forEach(field => {
            if (field.tagName.toLowerCase() === 'select') {
                field.addEventListener('change', checkFormValidity);
            }
            else {
                field.addEventListener('input', checkFormValidity);
            }
        });
    
    
    
        buttonSubmit.addEventListener('click', function(event){
            if ( !buttonSubmit.classList.contains('can') )
                return false;
    
            event.preventDefault();
    
            let newTaskTitle = document.getElementById('Task-title-input').value;
            let newTaskDescription = document.getElementById('Task-Notes-input').value;
            let newTaskDueDate = document.getElementById('Task-Date-input').value;
            let newTaskPriority = document.getElementById('Task-Priority-input').value;
            let newTaskProject = document.getElementById('Task-Project-input').value;
    
            taskContainer.setAttribute('task-title', newTaskTitle);
            taskContainer.setAttribute('description', newTaskDescription);
            taskContainer.setAttribute('task-date', newTaskDueDate);
            taskContainer.setAttribute('priority', newTaskPriority);
            taskContainer.setAttribute('project', newTaskProject);
    
            
    
    
            let taskTitleDisplay = taskContainer.querySelector('.task-title');
            let taskDescriptionDisplay = document.querySelector('.task-date');
    
    
            taskTitleDisplay.textContent = newTaskTitle;
            taskDescriptionDisplay.textContent = newTaskDueDate;
    
            dialogTask.close();
        });
    
    }
    

}