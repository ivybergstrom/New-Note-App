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
        ID = taskStore[TransformStreamDefaultController.length -1].id+1;
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
//add task to UI
function addListTask(task){
    //create html strng with placeholder text

    //replace placeholder with actual data
}

//UI CONTROLLER

//Gather DOM strings same place
const DOMStrings = {
    addBtn: document.querySelector('.add_btn'),
    taskDescription: document.querySelector('.ad_description'),
    taskContainer: document.querySelector('.task_list'),
}
//add task to UI
var html, newHtml, element;

html = '<div class = "item clearfix" id="%id%"><div class = "item_description"> %description% </div><div class = "right clearfix"><div class ="item_done"><button class= "item_done--btn"><i class="ion-ios-checkmark-outline"> </i></button></div><div class = "item_delete"><button class = "item_delete--btn"><i class = "ion-ios-close-outline"></i></button></div></div></div>'

//replace the placeholder with actual data
newHtml = html.replace('%id%', task.id);
newHtml = newHtml.replace('%description%', task.description);

//insert html into the dom
element = DOMStrings.taskContainer;
element.insertAdjacentHTML('beforeBegin', newHtml);

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
}

   
}

DOMStrings.addBtn.addEventListener('click', ctrlAddTask);

document.addEventListener('keypress', function(e) {
    if (e.keyCode === 13 || e.which === 13) {
        ctrlAddTask();
    }
});
