import { Project } from './project';
import { Task } from './task';
import '../css/style.css'; 
import '../css/reset-modern.css';

/*** SAMPlES OF USAGE OF THE CLASSES ***/
let projectTest1 = new Project('Project 1');
let taskTest1 = new Task('task1', 'description1', '2021-12-12', 'high' , 'Project 1');
let taskTest2 = new Task('task2', 'description2', '2021-12-12', 'low' ,'Project 1');
projectTest1.addTask(taskTest1);
projectTest1.addTask(taskTest2);

console.log(projectTest1.getName());
console.log(taskTest1.infos());
console.log(taskTest2.infos());
/***********/



let projectsALL= [projectTest1];
let tasksALL = [taskTest1 , taskTest2];








// WORK OF PROJECT 
let dialogProject = document.getElementById('dialog project');
let formProject = document.querySelector('.new-Project-form');
let nameField = formProject.querySelector('#Project-Name-input');
let submitButtonProject = formProject.querySelector('.buttons .submit');
let cancelButtonProject = formProject.querySelector('.buttons .cancel');

/* SHOW TASKS OF A PROJECT */
let projectsListSelect = document.querySelectorAll('.single-project');



function checkFormProjectValidity() {
    let isValid = nameField.value !== '';
    if (isValid) {
        if (submitButtonProject.classList.contains('cannot'))
        submitButtonProject.classList.remove('cannot');
        if (!submitButtonProject.classList.contains('can'))
        submitButtonProject.classList.add('can');
    } else {
        if (submitButtonProject.classList.contains('can'))
        submitButtonProject.classList.remove('can');
        if(!submitButtonProject.classList.contains('cannot'))
        submitButtonProject.classList.add('cannot');
    }
}


function edit_Delete_Project_Events(workingProj , workingProjDom){
    console.log(workingProjDom);
    /* DELETE PROJECT */
    let deleteProject = workingProjDom.querySelector('.delete-project');
    let editProject = workingProjDom.querySelector('.edit-project');
    deleteProject.addEventListener('click', function(){
        let projectIndex = projectsALL.findIndex(project => project.getId() == workingProj.id);
        if (projectIndex !== -1) {
            projectsALL.splice(workingProj.id, 1);
        }
        workingProjDom.remove();

    });
    /* EDIT PROJECT */
    editProject.addEventListener('click', function(){
        dialogProject.showModal();

        nameField.value = workingProj.getName();

        submitButtonProject.textContent = 'Edit';
        submitButtonProject.addEventListener('click', function(e){

            if(submitButtonProject.textContent === 'Create') 
                return; 
            e.preventDefault();
            let newName = nameField.value;
            workingProj.setName(newName);

            workingProjDom.querySelector('.project-name').textContent = newName;

            let titleprojTasks= document.querySelector(".task-project-title") ;
            if ( titleprojTasks.getAttribute("idproject") == workingProj.getId()) 
                titleprojTasks.textContent = newName;

            dialogProject.close();
        }); 

    
    }); 
    cancelButtonProject.addEventListener('click', function(e){
        e.preventDefault();
        dialogProject.close();
    });
} 

function functionalitiesProject (workingProj , workingProjDom){

    
    // show tasks of this project
    let checkflex = workingProjDom.querySelector('.checkflex');
    checkflex.addEventListener('click', function(){


        // display the name of the project 
        let nameofProject = workingProj.getName();
        let idofProject = workingProj.getId();
        let TitleTaskNow = document.querySelector('.task-project-title'); 
        TitleTaskNow.textContent = nameofProject;
        TitleTaskNow.setAttribute('idproject',idofProject);
        // display its tasks
        let tasks = workingProj.getTasks();
        let taskList = document.querySelector('.tasks-list');
        taskList.innerHTML = '';




        tasks.forEach(task => {
            let htmlTASKNOW = task.getHtmlTask();
            taskList.appendChild(htmlTASKNOW);

            // APPLY THE TASKS FUNCS 
            let deleteTaskButtonNEW = htmlTASKNOW.querySelector('.delete-task');
            let editTaskButtonNEW = htmlTASKNOW.querySelector('.edit-task');

            deleteTaskFunc(deleteTaskButtonNEW);
            editTaskFunc(editTaskButtonNEW);

        });
    });

    /* EDIT  & DELETE   PROJECT */
    edit_Delete_Project_Events(workingProj, workingProjDom) ; 

}
projectsListSelect.forEach(projectElement => {
    let idofProject =projectElement.getAttribute('id');
    let currentProject = projectsALL.find(project => project.getId() == idofProject);

    functionalitiesProject(currentProject, projectElement);


}); 

/**  Add New Project **/

let newProjectButton = document.querySelector('.new-project');

newProjectButton.addEventListener('click', function(){
    dialogProject.showModal();
    nameField.value = '';
    checkFormProjectValidity(); 
    submitButtonProject.textContent = 'Create';


}); 
submitButtonProject.addEventListener('click', function(e){

    if(submitButtonProject.textContent === 'Edit' || 
        !submitButtonProject.classList.contains('can') 
    ) 
        return; 
    e.preventDefault();
    
    let newProjectCreated = new Project(nameField.value);
    let htmlNewProject = newProjectCreated.getHtmlProject();
    projectsALL.push(newProjectCreated);
    document.querySelector('.projects-list').appendChild(htmlNewProject);
    /* EDIT  & DELETE   PROJECT && show tasks sorted   */
    functionalitiesProject(newProjectCreated , htmlNewProject);


    dialogProject.close();
}); 

nameField.addEventListener('input', checkFormProjectValidity);

//////////////// PROJECTS DONE //////////////////////

// TASK WORK //

let formTask = document.querySelector('.new-Task-form');
let deleteTaskButton = document.querySelectorAll('.delete-task');
let editTaskButton = document.querySelectorAll('.edit-task');
let newTaskButton = document.querySelector('.new-task');


let buttonSubmitTask = document.querySelector('.new-Task-form .buttons .submit'); 
let buttonCancelTask = document.querySelector('.new-Task-form .buttons .cancel');
let dialogTask = document.getElementById('dialog task');


buttonCancelTask.addEventListener('click', function(e){
    e.preventDefault();
    dialogTask.close();
});

let currentTaskContainer = null;
function editOrNewTask(edit, taskContainer){



    if ( edit ){
        let idTaskWorking  = taskContainer.getAttribute('id');
        let taskData = tasksALL.find(task => task.getId() == idTaskWorking);

        // data of this task to modify on 
        formTask.querySelector('#Task-title-input').value = taskData.getTitle();
        formTask.querySelector('#Task-Notes-input').value = taskData.getDescription();
        formTask.querySelector('#Task-Date-input').value = taskData.getDueDate();
        formTask.querySelector('#Task-Priority-input').value = taskData.getPriorityString();
        formTask.querySelector('#Task-Project-input').value = taskData.getProject();

        buttonSubmitTask.textContent = 'Edit';
    }
    else {

        buttonSubmitTask.textContent = 'Create';
    }

    dialogTask.showModal();




    const requiredFields = Array.from(formTask.querySelectorAll('input[required], select[required]'));


    function checkFormValidity() {
        let isValid = true;
        requiredFields.forEach(field => {
            if (!field.value || (field.type === 'date' && field.value === '') || (field.tagName.toLowerCase() === 'select' && field.value === '')) {
                isValid = false;
            }
        });
        if (isValid) {
            if (buttonSubmitTask.classList.contains('cannot'))
            buttonSubmitTask.classList.remove('cannot');
            if (!buttonSubmitTask.classList.contains('can'))
            buttonSubmitTask.classList.add('can');
        } else {
            if (buttonSubmitTask.classList.contains('can'))
            buttonSubmitTask.classList.remove('can');
            if(!buttonSubmitTask.classList.contains('cannot'))
            buttonSubmitTask.classList.add('cannot');
        }
    }


    if ( !buttonSubmitTask.classList.contains('cannot') )
        buttonSubmitTask.classList.add('cannot');


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

function deleteTaskFunc (workingTaskDom)
{
    // delete task 
    workingTaskDom.addEventListener('click', function(e){
        e.preventDefault() ;
        currentTaskContainer = workingTaskDom.parentElement.parentElement;

        let idTaskWorking  = currentTaskContainer.getAttribute('id');
        let taskData = tasksALL.find(task => task.getId() == idTaskWorking);
        let idProjectWorkingOn = document.querySelector('.task-project-title').getAttribute('idproject');
        let currentProject = projectsALL.find(project => project.getId() == idProjectWorkingOn);


        let taskInThatProject = currentProject.tasksProject.findIndex(
            task => task.getId() == idTaskWorking);
        if( taskInThatProject !== -1){
            currentProject.tasksProject.splice(taskInThatProject, 1);
        }
        
        currentTaskContainer.remove();
    });

}

function editTaskFunc(workingTaskDom)
{
    workingTaskDom.addEventListener('click', function(e){
        e.preventDefault();
        currentTaskContainer = workingTaskDom.parentElement.parentElement;
        editOrNewTask(true , currentTaskContainer );
    });
}


deleteTaskButton.forEach( button => {

    deleteTaskFunc(button) 
    }
);


editTaskButton.forEach( button => {
    editTaskFunc(button);
});

newTaskButton.addEventListener('click', function(){
    editOrNewTask(false , null);
}); 


// submut edit 
buttonSubmitTask.addEventListener('click', function(event){
    if (!buttonSubmitTask.classList.contains('can') || buttonSubmitTask.textContent === 'Create') {
        event.preventDefault();
        return;
    }

    event.preventDefault();


    let idTaskWorking  = currentTaskContainer.getAttribute('id');
    let taskData = tasksALL.find(task => task.getId() == idTaskWorking);


    let idProjectWorkingOn = document.querySelector('.task-project-title').getAttribute('idproject');
    let currentProject = projectsALL.find(project => project.getId() == idProjectWorkingOn);


    let taskInThatProject = currentProject.tasksProject.find(
            task => task.getId() == idTaskWorking);

    




    let newTaskTitle = formTask.querySelector('#Task-title-input').value;
    let newTaskDescription = formTask.querySelector('#Task-Notes-input').value;
    let newTaskDueDate = formTask.querySelector('#Task-Date-input').value;
    let newTaskPriority = formTask.querySelector('#Task-Priority-input').value;
    let newTaskProject = formTask.querySelector('#Task-Project-input').value;


    taskData.setTitle(newTaskTitle);
    taskData.setDescription(newTaskDescription);
    taskData.setDueDate(newTaskDueDate);
    taskData.setPriority(newTaskPriority);
    taskData.setProject(newTaskProject);

    taskInThatProject.setTitle(newTaskTitle);
    taskInThatProject.setDescription(newTaskDescription);
    taskInThatProject.setDueDate(newTaskDueDate);
    taskInThatProject.setPriority(newTaskPriority);
    taskInThatProject.setProject(newTaskProject);


    // change the html of the task
    let taskTitleDisplay = currentTaskContainer.querySelector('.task-title');
    let taskDateDisplay = currentTaskContainer.querySelector('.task-date');
    taskTitleDisplay.textContent = newTaskTitle;
    taskDateDisplay.textContent = newTaskDueDate;



    //RESDEPLAY SORTED TASKS

    let RTASKS = currentProject.getTasks();
    let taskListR = document.querySelector('.tasks-list');
    taskListR.innerHTML = '';

    RTASKS.forEach(RTASK => {
        let htmlTASKNOWR = RTASK.getHtmlTask();
        taskListR.appendChild(htmlTASKNOWR);


        // APPLY THE TASKS FUNCS 
        let deleteTaskButtonNEWR = htmlTASKNOWR.querySelector('.delete-task');
        let editTaskButtonNEWR = htmlTASKNOWR.querySelector('.edit-task');

        deleteTaskFunc(deleteTaskButtonNEWR);
        editTaskFunc(editTaskButtonNEWR);

    });
    


    dialogTask.close();
});

// submit new task
buttonSubmitTask.addEventListener('click', function(event) {
    if (!buttonSubmitTask.classList.contains('can') || buttonSubmitTask.textContent === 'Edit') {
        event.preventDefault();
        return;
    }

    event.preventDefault();

    let newTaskTitle = formTask.querySelector('#Task-title-input').value;
    let newTaskDescription = formTask.querySelector('#Task-Notes-input').value;
    let newTaskDueDate = formTask.querySelector('#Task-Date-input').value;
    let newTaskPriority = formTask.querySelector('#Task-Priority-input').value;
    let newTaskProject = formTask.querySelector('#Task-Project-input').value;

    let newTask = new Task(newTaskTitle, newTaskDescription, newTaskDueDate, newTaskPriority, newTaskProject);
    tasksALL.push(newTask);


    let idProjectWorkingOn = document.querySelector('.task-project-title').getAttribute('idproject');
    let currentProject = projectsALL.find(project => project.getId() == idProjectWorkingOn);
    
    currentProject.addTask(newTask);

    

    let tasksListContainer = document.querySelector('.tasks-list');


    let htmlofTask = newTask.getHtmlTask();
    tasksListContainer.appendChild(htmlofTask);


    let deleteTaskButtonNEWW = htmlofTask.querySelector('.delete-task');
    let editTaskButtonNEWW = htmlofTask.querySelector('.edit-task');
    deleteTaskFunc(deleteTaskButtonNEWW);
    editTaskFunc(editTaskButtonNEWW); 
    //RESDEPLAY SORTED TASKS

    let RTASKS = currentProject.getTasks();
    let taskListR = document.querySelector('.tasks-list');
    taskListR.innerHTML = '';

    RTASKS.forEach(RTASK => {
        let htmlTASKNOWR = RTASK.getHtmlTask();
        taskListR.appendChild(htmlTASKNOWR);


        // APPLY THE TASKS FUNCS 
        let deleteTaskButtonNEWR = htmlTASKNOWR.querySelector('.delete-task');
        let editTaskButtonNEWR = htmlTASKNOWR.querySelector('.edit-task');

        deleteTaskFunc(deleteTaskButtonNEWR);
        editTaskFunc(editTaskButtonNEWR);

    });
    

    dialogTask.close();

} ) ;


// Add event listener for task checkboxes
document.addEventListener('click', function(e) {
    if (e.target && e.target.getAttribute('type')=='checkbox') {
        const flexcon = e.target.parentElement;
        const taskContainer = flexcon.parentElement;
        if ( flexcon){
            
            const infoContainer = flexcon.querySelector('.infos');
            if (infoContainer) {
                
                infoContainer.classList.toggle('coched');


                
                // Find the task in tasksALL and toggle its completed status
                const taskId = taskContainer.getAttribute('id');
                const task = tasksALL.find(t => t.getId() == taskId);
                if (task) {
                    task.togleDone();
                }

                e.target.checked = !e.target.checked;
                let chk = flexcon.querySelector('input[type="checkbox"]');
                if (chk) chk.checked = true;

            }
        }
    }
});

