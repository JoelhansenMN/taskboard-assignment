// Retrieve tasks and nextId from localStorage
//let taskList = JSON.parse(localStorage.getItem("tasks"));
//let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskTitle = $('#taskTitle');
const dueDate = $('#dueDate');
const taskDescription = $('#taskDesrciption');

const taskLanes = $('swim-lanes'); //DOM element for taks lanes
const taskForm = $('formModal');   //DOM element for modal

function getTasksFromStorage (){
  let string = localStorage.getItem('tasks');
  let taskList = JSON.parse('string');
  
  return taskList;
}

function saveTaskToStorage (taskList) {
  JSON.stringify(taskList);
  let saveData = localStorage.setItem('tasks', saveData);

};

// Todo: create a function to generate a unique task id
function generateTaskId() {
  let id = crypto.randomUUID(); //jquery UI for ID random id generation
  console.log(id);
    return id;
}

// Todo: create a function to create a task card
function createTaskCard(task) { //all this is needed to create a task card
  const taskCard = $('<div>')
  .addClass('card task-card draggable my-3')
  .attr('data-task-id', task.id);
const taskTitle = $('<div>').addClass('card-header h4').text(task.name);
const cardBody = $('<div>').addClass('card-body');
const description = $('<p>').addClass('card-text').text(task.type);
const dueDate = $('<p>').addClass('card-text').text(task.dueDate);
const cardDeleteBtn = $('<button>')
  .addClass('btn btn-danger delete')
  .text('Delete')
  .attr('data-task-id', task.id);
cardDeleteBtn.on('click', handleDeleteProject);

// ? Sets the card background color based on due date. Only apply the styles if the dueDate exists and the status is not done.
if (task.dueDate && task.status !== 'done') {
  const now = dayjs();
  const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

  // ? If the task is due today, make the card yellow. If it is overdue, make it red.
  if (now.isSame(taskDueDate, 'day')) {
    taskCard.addClass('bg-warning text-white');
  } else if (now.isAfter(taskDueDate)) {
    taskCard.addClass('bg-danger text-white');
    cardDeleteBtn.addClass('border-light');
  }
}

// ? Gather all the elements created above and append them to the correct elements.
cardBody.append(description, dueDate, cardDeleteBtn);
taskCard.append(taskTitle, cardBody);


return taskCard; // ? Return the card so it can be appended to the correct lane.
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  const taskList = getTasksFromStorage();

  // ? Empty existing project cards out of the lanes
  const todoList = $('#todo-cards');
  todoList.empty();

  const inProgressList = $('#in-progress-cards');
  inProgressList.empty();
  const doneList = $('#done-cards');
  doneList.empty();

  // ? Loop through projects and create project cards for each status
  for (let task of taskList) {
    if (task.status === 'to-do') {
      todoList.append(createTaskCard(task));
    } else if (task.status === 'in-progress') {
      inProgressList.append(createTaskCard(task));
    } else if (task.status === 'done') {
      doneList.append(createTaskCard(task));
    }
  };

  // ? Use JQuery UI to make task cards draggable
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
    helper: function (e) {
      // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });
}

// Todo: create a function to handle deleting a task

function handleDeleteTask() {  
  const taskId = $(this).attr('data-task-id');
  const taskList = getTasksFromStorage();

  // ? Remove project from the array. There is a method called `filter()` for this that is better suited which we will go over in a later activity. For now, we will use a `forEach()` loop to remove the project.
  taskList.forEach((task, i) => {
    if (task.id === taskId) {
      taskList.splice(i, 1);
    }
  });

  // ? We will use our helper function to save the projects to localStorage
  saveTasksToStorage(taskList);

  // ? Here we use our other function to print projects back to the screen
  renderTaskList();
}


// Todo: create a function to handle adding a new task
function handleAddTask(event){
  event.preventDefault();

  // ? Read user input from the form
  const taskName = taskTitle.val();
  const description = description.val(); 
  const dueDate = dueDate.val(); // yyyy-mm-dd format
  const newTask = {
    // ? Here we use a Web API called `crypto` to generate a random id for our project. This is a unique identifier that we can use to find the project in the array. `crypto` is a built-in module that we can use in the browser and Nodejs.    id: crypto.randomUUID(),
    id: generateTaskId(),
    name: taskName,
    description: description,
    dueDate: dueDate,
    status: 'to-do',
  };

 
  const tasks = getTasksFromStorage();
  tasks.push(newtask);

  // ? Save the updated projects array to localStorage
  saveTaskToStorage(tasks);

  // ? Print project data back to the screen
  renderTaskList();

  // ? Clear the form inputs
  taskTitle.val('');
  description.val('');
  dueDate.val('');

};



// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(e, ui) {
  e.preventDefault()
  console.log("drop")
  const id = e.dataTransfer.getData('text/plain')
  squares = squares.map( function( sq ){
    if( sq.id !== id ) {
      return sq
    } else {
      return {
        id: sq.id,
        label: sq.id,
        location: 'B'
      }
    }
  })
  populate()
}

function handleDragOver(e){
  e.preventDefault()
}


//populate() 


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});


