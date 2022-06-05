// DATA CONTROLLER


//stores tasks that we add
var taskStore = [];

//constructor for tasks
var task = function(id, description){
    this.id = id;
    this.description = description;
} 

//Add task
function addTask(des){
    var newTask;

    //creates new ID
    if (taskStore.length > 0){
       ID = taskStore[taskStore.length -1].id + 1;
    } else {
        ID = 0;
    }
    
    //create new task
    newTask = new task( ID, des);

    //push into data structure
    taskStore.push(newTask);
    //return new element
    return newTask;
}
//Delete Task
function deleteTask(id){
    var ids, index;
    //create array for ids
    ids = taskStore.map(function(current){
        return current.id;
    });
    //find IDs index 
    index = ids.indexOf(parseInt(id));
    //delete task
    if (index !== -1){
        taskStore.splice(index, 1);
    }
};

//UI CONTROLLER

//Gather DOM strings same place 
var DOMStrings = {
    addBtn: document.querySelector('.add_btn'), 
    taskDescription: document.querySelector('.add_description'), 
    taskContainer: document.querySelector('.task_list'), 
}
//add task to UI
function addListTask(task){
    var html, newHtml, element;
    //create html string with placeholder text
    html = '<div class = "item clearfix" id="%id%"><div class = "item_description"> %description% </div><div class = "right clearfix"><div class ="item_done"><button class= "item_done--btn">Task Completed<i class="ion-ios-checkmark-outline"> </i></button></div><div class = "item_delete"><button class = "item_delete--btn">Delete Task<i class = "ion-ios-close-outline"></i></button></div></div></div>';

    //replace placeholder with actual data
    newHtml = html.replace('%id%', task.id);
    newHtml = newHtml.replace('%description%', task.description);
    
    //insert HTML into the DOM
    element = DOMStrings.taskContainer;
    element.insertAdjacentHTML('beforeEnd', newHtml);
}




//APP CONTROLLER

function ctrlAddTask(){
    var input, text, newTask;


    //Get input data from DOM
    input = DOMStrings.taskDescription;
    text = input.value;
   

    //check for text
if (text) {
    //Add the task to the data structure
    newTask = addTask(text);
    //Add the task to the UI
    addListTask(newTask);
    //Clear the field
    input.value = '';
    input.focus();
}

   
};

function ctrlDeleteTask(event){
    var taskID;
    //find ID
    taskID = event.target.parentNode.parentNode.parentNode.id;

    //check if there is an ID
    if (taskID) {
        //delete task from data structure
        deleteTask(taskID);
        //delete task from the UI
        
    }
}

DOMStrings.addBtn.addEventListener('click', ctrlAddTask);

document.addEventListener('keypress', function(e) {
    if (e.key === 13) { //this originally was an || e.which === 13, but it looks like browsers may no longer support e.which
        ctrlAddTask();
    }
});

DOMStrings.taskContainer.addEventListener('click', ctrlDeleteTask);