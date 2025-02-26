let newProjectButton = document.querySelector('.new-project');
let deleteProjectButton = document.querySelectorAll('.delete-project');
let editProjectButton = document.querySelectorAll('.edit-project');



let deleteTaskButton = document.querySelectorAll('.delete-task');
let editTaskButton = document.querySelectorAll('.edit-task');
let newTaskButton = document.querySelector('.new-task');
let numberOfTasks = document.querySelectorAll('.task-list').length;



let dialogProject = document.getElementById('dialog project');
let dialogTask = document.getElementById('dialog task');


let currentTaskContainer = null;
function editOrNewTask(edit, taskContainer){

    let buttonSubmit = document.querySelector('.new-Task-form .buttons .submit'); 

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


        buttonSubmit.textContent = 'Edit';


    
    }
    else {

        buttonSubmit.textContent = 'Create';
    }

    dialogTask.showModal();

    let cancel = document.querySelector('.new-Task-form .buttons .cancel');
    let form = document.querySelector('.new-Task-form');




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


    if ( !buttonSubmit.classList.contains('cannot') )
        buttonSubmit.classList.add('cannot');





    checkFormValidity();


    requiredFields.forEach(field => {
        if (field.tagName.toLowerCase() === 'select') {
            field.addEventListener('change', checkFormValidity);
        }
        else {
            field.addEventListener('input', checkFormValidity);
        }
    });





}

editTaskButton.forEach( button => {
    button.addEventListener('click', function(){
        currentTaskContainer = button.parentElement.parentElement;
        editOrNewTask(true , currentTaskContainer );
    });
});

newTaskButton.addEventListener('click', function(){
    editOrNewTask(false , null);
}); 


let SubmitEditTask = document.querySelector('.new-Task-form .buttons .submit'); 

SubmitEditTask.addEventListener('click', function(event){
    if ( !SubmitEditTask.classList.contains('can')  || SubmitEditTask.textContent === 'Create' )
        return false;

    event.preventDefault();

    let newTaskTitle = document.getElementById('Task-title-input').value;
    let newTaskDescription = document.getElementById('Task-Notes-input').value;
    let newTaskDueDate = document.getElementById('Task-Date-input').value;
    let newTaskPriority = document.getElementById('Task-Priority-input').value;
    let newTaskProject = document.getElementById('Task-Project-input').value;



    currentTaskContainer.setAttribute('task-title', newTaskTitle);
    currentTaskContainer.setAttribute('description', newTaskDescription);
    currentTaskContainer.setAttribute('task-date', newTaskDueDate);
    currentTaskContainer.setAttribute('priority', newTaskPriority);
    currentTaskContainer.setAttribute('project', newTaskProject);

    
    let taskTitleDisplay = currentTaskContainer.querySelector('.task-title');
    let taskDateDisplay = currentTaskContainer.querySelector('.task-date');



    taskTitleDisplay.textContent = newTaskTitle;
    taskDateDisplay.textContent = newTaskDueDate;


    dialogTask.close();
});

let SubmitCreateTask = document.querySelector('.new-Task-form .buttons .submit');
SubmitCreateTask.addEventListener('click', function(event) {
    if ( !SubmitCreateTask.classList.contains('can') || SubmitCreateTask.textContent === 'Edit' )
        return false;

    event.preventDefault();

    let newTaskTitle = document.getElementById('Task-title-input').value;
    let newTaskDescription = document.getElementById('Task-Notes-input').value;
    let newTaskDueDate = document.getElementById('Task-Date-input').value;
    let newTaskPriority = document.getElementById('Task-Priority-input').value;
    let newTaskProject = document.getElementById('Task-Project-input').value;

    let tasksListContainer = document.querySelector('.tasks-list');


    currentTaskContainer = document.createElement('div');
    currentTaskContainer.classList.add('single-task');
    currentTaskContainer.setAttribute('priority', newTaskPriority);
    currentTaskContainer.setAttribute('description', newTaskDescription);
    currentTaskContainer.setAttribute('task-title', newTaskTitle);
    currentTaskContainer.setAttribute('task-date', newTaskDueDate);
    currentTaskContainer.setAttribute('project', newTaskProject);



    let checkflex=  document.createElement('div');
    checkflex.classList.add('checkflex');

    let inputCheckbox = document.createElement('input');
    inputCheckbox.setAttribute('type', 'checkbox');


    let infosDiv = document.createElement('div');
    infosDiv.classList.add('infos');
    let taskTitleDiv = document.createElement('div');
    taskTitleDiv.classList.add('task-title');
    taskTitleDiv.textContent = newTaskTitle;
    let taskDateDiv = document.createElement('div');
    taskDateDiv.classList.add('task-date');
    taskDateDiv.textContent = newTaskDueDate;

    infosDiv.appendChild(taskTitleDiv);
    infosDiv.appendChild(taskDateDiv);

    checkflex.appendChild(inputCheckbox);
    checkflex.appendChild(infosDiv);


    let iconsSvg = document.createElement('div');
    iconsSvg.classList.add('icons');
    iconsSvg.innerHTML= `
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 80 80"
                    class="delete-task"
                >
                    <path
                    d="M 37 6 C 35.35503 6 34 7.3550302 34 9 L 34 10 L 24.472656 10 C 22.580979 10 20.84645 11.07202 20 12.763672 L 18.882812 15 L 15.5 15 C 13.578812 15 12 16.578812 12 18.5 C 12 20.421188 13.578812 22 15.5 22 L 16.080078 22 L 19.697266 65.416016 C 19.912759 67.998204 22.089668 70 24.681641 70 L 55.320312 70 C 57.91153 70 60.087241 67.998204 60.302734 65.416016 L 63.919922 22 L 64.5 22 C 66.421188 22 68 20.421188 68 18.5 C 68 16.578812 66.421188 15 64.5 15 L 61.117188 15 L 60 12.763672 C 59.15355 11.07202 57.419021 10 55.527344 10 L 46 10 L 46 9 C 46 7.3550302 44.64497 6 43 6 L 37 6 z M 37 8 L 43 8 C 43.56503 8 44 8.4349698 44 9 L 44 10 L 36 10 L 36 9 C 36 8.4349698 36.43497 8 37 8 z M 24.472656 12 L 34.832031 12 A 1.0001 1.0001 0 0 0 35.158203 12 L 44.832031 12 A 1.0001 1.0001 0 0 0 45.158203 12 L 55.527344 12 C 56.665666 12 57.701388 12.639855 58.210938 13.658203 L 59.882812 17 L 64.5 17 C 65.340812 17 66 17.659188 66 18.5 C 66 19.340812 65.340812 20 64.5 20 L 64.085938 20 L 15.914062 20 L 15.5 20 C 14.659188 20 14 19.340812 14 18.5 C 14 17.659188 14.659188 17 15.5 17 L 20.117188 17 L 21.789062 13.658203 C 22.298613 12.639855 23.334334 12 24.472656 12 z M 24 15 A 1 1 0 0 0 23 16 A 1 1 0 0 0 24 17 A 1 1 0 0 0 25 16 A 1 1 0 0 0 24 15 z M 28 15 A 1 1 0 0 0 27 16 A 1 1 0 0 0 28 17 A 1 1 0 0 0 29 16 A 1 1 0 0 0 28 15 z M 32 15 A 1 1 0 0 0 31 16 A 1 1 0 0 0 32 17 A 1 1 0 0 0 33 16 A 1 1 0 0 0 32 15 z M 36 15 A 1 1 0 0 0 35 16 A 1 1 0 0 0 36 17 A 1 1 0 0 0 37 16 A 1 1 0 0 0 36 15 z M 40 15 A 1 1 0 0 0 39 16 A 1 1 0 0 0 40 17 A 1 1 0 0 0 41 16 A 1 1 0 0 0 40 15 z M 44 15 A 1 1 0 0 0 43 16 A 1 1 0 0 0 44 17 A 1 1 0 0 0 45 16 A 1 1 0 0 0 44 15 z M 48 15 A 1 1 0 0 0 47 16 A 1 1 0 0 0 48 17 A 1 1 0 0 0 49 16 A 1 1 0 0 0 48 15 z M 52 15 A 1 1 0 0 0 51 16 A 1 1 0 0 0 52 17 A 1 1 0 0 0 53 16 A 1 1 0 0 0 52 15 z M 56 15 A 1 1 0 0 0 55 16 A 1 1 0 0 0 56 17 A 1 1 0 0 0 57 16 A 1 1 0 0 0 56 15 z M 18.085938 22 L 61.914062 22 L 58.308594 65.248047 C 58.178088 66.811858 56.889095 68 55.320312 68 L 24.681641 68 C 23.111613 68 21.821912 66.811858 21.691406 65.248047 L 18.085938 22 z M 54.769531 26.027344 L 54.082031 26.603516 L 54.001953 26.945312 L 53.996094 27.044922 L 54.353516 27.867188 L 55.226562 28.072266 L 55.912109 27.496094 L 55.992188 27.154297 L 55.998047 27.054688 L 55.640625 26.232422 L 54.769531 26.027344 z M 39.716797 26.041016 L 39.0625 26.652344 L 39 27 L 39 27.099609 L 39.402344 27.900391 L 40.283203 28.058594 L 40.9375 27.447266 L 41 27.099609 L 41 27 L 40.597656 26.199219 L 39.716797 26.041016 z M 24.666016 26.058594 L 24.044922 26.705078 L 24.001953 27.054688 L 24.007812 27.154297 L 24.451172 27.931641 L 25.339844 28.042969 L 25.960938 27.396484 L 26.003906 27.044922 L 25.998047 26.945312 L 25.554688 26.167969 L 24.666016 26.058594 z M 54.546875 30.121094 L 53.861328 30.697266 L 53.779297 31.041016 L 53.775391 31.140625 L 54.132812 31.960938 L 55.003906 32.166016 L 55.691406 31.591797 L 55.771484 31.248047 L 55.777344 31.148438 L 55.419922 30.326172 L 54.546875 30.121094 z M 39.716797 30.140625 L 39.0625 30.753906 L 39 31.099609 L 39 31.199219 L 39.402344 32.001953 L 40.283203 32.158203 L 40.9375 31.546875 L 41 31.199219 L 41 31.099609 L 40.597656 30.298828 L 39.716797 30.140625 z M 24.886719 30.152344 L 24.265625 30.798828 L 24.222656 31.148438 L 24.228516 31.248047 L 24.671875 32.025391 L 25.560547 32.136719 L 26.181641 31.490234 L 26.224609 31.140625 L 26.220703 31.041016 L 25.775391 30.261719 L 24.886719 30.152344 z M 54.326172 34.214844 L 53.638672 34.791016 L 53.558594 35.134766 L 53.552734 35.234375 L 53.910156 36.054688 L 54.783203 36.261719 L 55.470703 35.685547 L 55.550781 35.341797 L 55.556641 35.242188 L 55.199219 34.419922 L 54.326172 34.214844 z M 39.716797 34.240234 L 39.0625 34.853516 L 39 35.199219 L 39 35.300781 L 39.402344 36.101562 L 40.283203 36.259766 L 40.9375 35.646484 L 41 35.300781 L 41 35.199219 L 40.597656 34.398438 L 39.716797 34.240234 z M 25.107422 34.246094 L 24.488281 34.892578 L 24.443359 35.242188 L 24.449219 35.341797 L 24.892578 36.119141 L 25.783203 36.230469 L 26.402344 35.583984 L 26.447266 35.234375 L 26.441406 35.134766 L 25.996094 34.355469 L 25.107422 34.246094 z M 54.105469 38.308594 L 53.417969 38.884766 L 53.337891 39.228516 L 53.332031 39.328125 L 53.689453 40.150391 L 54.5625 40.355469 L 55.248047 39.779297 L 55.330078 39.435547 L 55.333984 39.335938 L 54.976562 38.513672 L 54.105469 38.308594 z M 25.328125 38.339844 L 24.708984 38.986328 L 24.666016 39.335938 L 24.669922 39.435547 L 25.115234 40.214844 L 26.003906 40.324219 L 26.625 39.677734 L 26.667969 39.328125 L 26.662109 39.228516 L 26.21875 38.449219 L 25.328125 38.339844 z M 39.716797 38.341797 L 39.0625 38.953125 L 39 39.300781 L 39 39.400391 L 39.402344 40.201172 L 40.283203 40.359375 L 40.9375 39.746094 L 41 39.400391 L 41 39.300781 L 40.597656 38.498047 L 39.716797 38.341797 z M 53.882812 42.402344 L 53.197266 42.978516 L 53.117188 43.322266 L 53.111328 43.421875 L 53.46875 44.244141 L 54.339844 44.449219 L 55.027344 43.873047 L 55.107422 43.529297 L 55.113281 43.429688 L 54.755859 42.609375 L 53.882812 42.402344 z M 25.550781 42.433594 L 24.929688 43.080078 L 24.886719 43.429688 L 24.892578 43.529297 L 25.335938 44.308594 L 26.224609 44.417969 L 26.845703 43.771484 L 26.888672 43.421875 L 26.882812 43.322266 L 26.439453 42.542969 L 25.550781 42.433594 z M 39.716797 42.441406 L 39.0625 43.052734 L 39 43.400391 L 39 43.5 L 39.402344 44.300781 L 40.283203 44.458984 L 40.9375 43.847656 L 41 43.5 L 41 43.400391 L 40.597656 42.599609 L 39.716797 42.441406 z M 53.662109 46.498047 L 52.976562 47.072266 L 52.894531 47.416016 L 52.888672 47.515625 L 53.248047 48.337891 L 54.119141 48.542969 L 54.806641 47.966797 L 54.886719 47.623047 L 54.892578 47.523438 L 54.535156 46.703125 L 53.662109 46.498047 z M 25.771484 46.527344 L 25.150391 47.173828 L 25.107422 47.523438 L 25.113281 47.623047 L 25.556641 48.402344 L 26.447266 48.511719 L 27.066406 47.865234 L 27.111328 47.515625 L 27.105469 47.416016 L 26.660156 46.638672 L 25.771484 46.527344 z M 39.716797 46.541016 L 39.0625 47.152344 L 39 47.5 L 39 47.599609 L 39.402344 48.400391 L 40.283203 48.558594 L 40.9375 47.947266 L 41 47.599609 L 41 47.5 L 40.597656 46.699219 L 39.716797 46.541016 z M 53.441406 50.591797 L 52.753906 51.167969 L 52.673828 51.509766 L 52.667969 51.609375 L 53.025391 52.431641 L 53.898438 52.636719 L 54.583984 52.060547 L 54.666016 51.71875 L 54.669922 51.617188 L 54.3125 50.796875 L 53.441406 50.591797 z M 25.992188 50.621094 L 25.373047 51.267578 L 25.330078 51.617188 L 25.333984 51.71875 L 25.779297 52.496094 L 26.667969 52.605469 L 27.289062 51.958984 L 27.332031 51.609375 L 27.326172 51.509766 L 26.882812 50.732422 L 25.992188 50.621094 z M 39.716797 50.640625 L 39.0625 51.253906 L 39 51.599609 L 39 51.699219 L 39.402344 52.501953 L 40.283203 52.658203 L 40.9375 52.046875 L 41 51.699219 L 41 51.599609 L 40.597656 50.798828 L 39.716797 50.640625 z M 53.21875 54.685547 L 52.533203 55.261719 L 52.453125 55.603516 L 52.447266 55.703125 L 52.804688 56.525391 L 53.677734 56.730469 L 54.363281 56.154297 L 54.443359 55.8125 L 54.449219 55.712891 L 54.091797 54.890625 L 53.21875 54.685547 z M 26.214844 54.716797 L 25.59375 55.363281 L 25.550781 55.712891 L 25.556641 55.8125 L 26 56.589844 L 26.888672 56.701172 L 27.509766 56.054688 L 27.552734 55.703125 L 27.546875 55.603516 L 27.103516 54.826172 L 26.214844 54.716797 z M 39.716797 54.740234 L 39.0625 55.353516 L 39 55.699219 L 39 55.800781 L 39.402344 56.601562 L 40.283203 56.759766 L 40.9375 56.146484 L 41 55.800781 L 41 55.699219 L 40.597656 54.898438 L 39.716797 54.740234 z M 52.998047 58.779297 L 52.3125 59.355469 L 52.230469 59.697266 L 52.226562 59.798828 L 52.583984 60.619141 L 53.455078 60.824219 L 54.142578 60.25 L 54.222656 59.90625 L 54.228516 59.806641 L 53.871094 58.984375 L 52.998047 58.779297 z M 26.435547 58.810547 L 25.814453 59.457031 L 25.771484 59.806641 L 25.777344 59.90625 L 26.220703 60.683594 L 27.111328 60.794922 L 27.730469 60.148438 L 27.773438 59.798828 L 27.769531 59.697266 L 27.324219 58.919922 L 26.435547 58.810547 z M 39.716797 58.841797 L 39.0625 59.453125 L 39 59.800781 L 39 59.900391 L 39.402344 60.701172 L 40.283203 60.859375 L 40.9375 60.246094 L 41 59.900391 L 41 59.800781 L 40.597656 58.998047 L 39.716797 58.841797 z M 52.777344 62.873047 L 52.089844 63.449219 L 52.009766 63.792969 L 52.003906 63.892578 L 52.361328 64.712891 L 53.234375 64.919922 L 53.919922 64.34375 L 54.001953 64 L 54.007812 63.900391 L 53.648438 63.078125 L 52.777344 62.873047 z M 26.65625 62.904297 L 26.037109 63.550781 L 25.992188 63.900391 L 25.998047 64 L 26.443359 64.777344 L 27.332031 64.888672 L 27.953125 64.242188 L 27.996094 63.892578 L 27.990234 63.792969 L 27.546875 63.013672 L 26.65625 62.904297 z M 39.716797 62.941406 L 39.0625 63.552734 L 39 63.900391 L 39 64 L 39.402344 64.800781 L 40.283203 64.958984 L 40.9375 64.347656 L 41 64 L 41 63.900391 L 40.597656 63.099609 L 39.716797 62.941406 z"
                    ></path>
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 80 80"
                    class="edit-task"
                >
                    <path
                    d="M 63.074219 10.003906 C 61.535156 10.003906 59.996094 10.589844 58.828125 11.757813 L 51.585938 19 L 15.140625 55.441406 L 9.257813 70.738281 L 24.558594 64.859375 L 24.707031 64.707031 L 68.242188 21.171875 C 70.578125 18.835938 70.578125 15.019531 68.242188 12.6875 L 67.3125 11.757813 C 66.148438 10.589844 64.609375 10.003906 63.074219 10.003906 Z M 63.074219 11.992188 C 64.09375 11.992188 65.113281 12.386719 65.902344 13.171875 L 66.828125 14.097656 C 68.398438 15.671875 68.398438 18.1875 66.828125 19.757813 L 66 20.585938 L 59.414063 14 L 60.242188 13.171875 C 61.027344 12.386719 62.050781 11.992188 63.074219 11.992188 Z M 58 15.414063 L 64.585938 22 L 61 25.585938 L 54.414063 19 Z M 53 20.414063 L 59.585938 27 L 24.65625 61.929688 C 24.480469 61.378906 24.207031 60.792969 23.707031 60.292969 C 22.972656 59.558594 22.046875 59.289063 21.320313 59.144531 C 21.089844 59.097656 21.089844 59.121094 20.902344 59.097656 C 20.878906 58.910156 20.902344 58.910156 20.855469 58.679688 C 20.710938 57.953125 20.441406 57.027344 19.707031 56.292969 C 19.207031 55.792969 18.621094 55.519531 18.070313 55.34375 Z M 53 23 C 52.449219 23 52 23.449219 52 24 C 52 24.550781 52.449219 25 53 25 C 53.550781 25 54 24.550781 54 24 C 54 23.449219 53.550781 23 53 23 Z M 50 26 C 49.449219 26 49 26.449219 49 27 C 49 27.550781 49.449219 28 50 28 C 50.550781 28 51 27.550781 51 27 C 51 26.449219 50.550781 26 50 26 Z M 47 29 C 46.449219 29 46 29.449219 46 30 C 46 30.550781 46.449219 31 47 31 C 47.550781 31 48 30.550781 48 30 C 48 29.449219 47.550781 29 47 29 Z M 44 32 C 43.449219 32 43 32.449219 43 33 C 43 33.550781 43.449219 34 44 34 C 44.550781 34 45 33.550781 45 33 C 45 32.449219 44.550781 32 44 32 Z M 41 35 C 40.449219 35 40 35.449219 40 36 C 40 36.550781 40.449219 37 41 37 C 41.550781 37 42 36.550781 42 36 C 42 35.449219 41.550781 35 41 35 Z M 38 38 C 37.449219 38 37 38.449219 37 39 C 37 39.550781 37.449219 40 38 40 C 38.550781 40 39 39.550781 39 39 C 39 38.449219 38.550781 38 38 38 Z M 35 41 C 34.449219 41 34 41.449219 34 42 C 34 42.550781 34.449219 43 35 43 C 35.550781 43 36 42.550781 36 42 C 36 41.449219 35.550781 41 35 41 Z M 32 44 C 31.449219 44 31 44.449219 31 45 C 31 45.550781 31.449219 46 32 46 C 32.550781 46 33 45.550781 33 45 C 33 44.449219 32.550781 44 32 44 Z M 29 47 C 28.449219 47 28 47.449219 28 48 C 28 48.550781 28.449219 49 29 49 C 29.550781 49 30 48.550781 30 48 C 30 47.449219 29.550781 47 29 47 Z M 26 50 C 25.449219 50 25 50.449219 25 51 C 25 51.550781 25.449219 52 26 52 C 26.550781 52 27 51.550781 27 51 C 27 50.449219 26.550781 50 26 50 Z M 23 53 C 22.449219 53 22 53.449219 22 54 C 22 54.550781 22.449219 55 23 55 C 23.550781 55 24 54.550781 24 54 C 24 53.449219 23.550781 53 23 53 Z M 16.660156 57.066406 C 16.753906 57.082031 16.824219 57.085938 16.929688 57.105469 C 17.453125 57.210938 18.027344 57.441406 18.292969 57.707031 C 18.558594 57.972656 18.789063 58.546875 18.894531 59.070313 C 19 59.59375 19 60 19 60 L 19 61 L 20 61 C 20 61 20.40625 61 20.929688 61.105469 C 21.453125 61.210938 22.027344 61.441406 22.292969 61.707031 C 22.558594 61.972656 22.789063 62.546875 22.894531 63.070313 C 22.914063 63.175781 22.917969 63.246094 22.933594 63.339844 L 16.003906 66.003906 L 13.996094 63.996094 Z"
                    ></path>
                </svg>
  `
    ;

    currentTaskContainer.appendChild(checkflex);
    currentTaskContainer.appendChild(iconsSvg);


    tasksListContainer.appendChild(currentTaskContainer);




    dialogTask.close();

} ) ; 