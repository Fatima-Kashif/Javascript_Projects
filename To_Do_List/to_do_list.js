let add = document.querySelector("#add_task");
let task_box = document.querySelector("#task_list");
let taskno = document.querySelector("#taskno");
let done_box = document.querySelector("#done_list");
let doneno = document.querySelector("#done");
let input = document.querySelector("#input");

let tasks_list = [];
let done_list = [];
// localStorage.setItem('tasks',JSON.stringify(tasks_list))     they are resetting my local storage everytime it reloads
// localStorage.setItem('done',JSON.stringify(done_list))
if (!localStorage.getItem('tasks')) {
  localStorage.setItem('tasks', JSON.stringify([]));
}
if (!localStorage.getItem('done')) {
  localStorage.setItem('done', JSON.stringify([]));
}
let local_task=JSON.parse(localStorage.getItem('tasks')) || []
let local_done=JSON.parse(localStorage.getItem('done')) || []

function rendertask() {
  let taskcount = local_task.length;
  // let taskcount = tasks_list.length;
  localStorage.setItem('count',taskcount)
  let tc=localStorage.getItem('count')
  if (tc > 0) {
    taskno.innerHTML = `Tasks to do - ${tc}`;
  } else {
    taskno.innerHTML = "No task!! Hurray 🥳";
  }
  // if (taskcount > 0) {
  //   taskno.innerHTML = `Tasks to do - ${taskcount}`;
  // } else {
  //   taskno.innerHTML = "No task!! Hurray 🥳";
  // }
  task_box.innerHTML = "";
  // it removes all the tasks that was already and refresh everytime when add button is clicked
  // for (task of tasks_list){ // I made a new element for every task and then I will append into DOM. For every tak there 3 button we can assign it same ids so we have to use index it also helps in deleting editing the particular task
 
  local_task.forEach((task, index) => {
    // to track which button belongs to which task we have to use index that's why we use for each
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.innerHTML = `<p> ${task} </p>`;

    const check_but = document.createElement("button");
    check_but.classList.add("action", "check");
    check_but.dataset.index = index;
    check_but.innerHTML = `<img src="check.svg" alt="check">`;
    check_but.addEventListener("click", check_task);

    const edit_but = document.createElement("button");
    edit_but.classList.add("action", "edit");
    edit_but.dataset.index = index;
    edit_but.innerHTML = `<img src="edit.svg" alt="check">`;
    edit_but.addEventListener("click", edit_task);

    const del_but = document.createElement("button");
    del_but.classList.add("action", "del");
    del_but.dataset.index = index;
    del_but.innerHTML = `<img src="bin.svg" alt="check">`;
    del_but.addEventListener("click", delete_task);

    const icons = document.createElement("div");
    icons.id = "icons";
    icons.append(check_but, edit_but, del_but);

    taskElement.appendChild(icons);
    task_box.appendChild(taskElement);

    // let del=document.querySelectorAll('.del')
    // I added this in render function because every time add button pressed it made new elements so event listener should be added on those element's button
    //     del.forEach((remove)=>{
    //     remove.addEventListener('click',delete_task)
  });
}

function delete_task(e) {
  let index = e.target.dataset.index;
  console.log("Task is deleting");
  //  if (!index) {
  //     index = e.target.parentElement.dataset.index;
  // }
  // This gets the value you set with data-index.
  // e.target → the element that was clicked (e.g., the delete button)
  // e.target.dataset → gives access to all data- attributes
  // e.target.dataset.index → gives the value of data-index

  local_task.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(local_task));
  rendertask();
}


function renderdone() {
  let donecount = local_done.length;
  localStorage.setItem('d_count',donecount)
  let dc=localStorage.getItem('d_count')
  done_box.innerHTML='';
  if (dc > 0) {
    doneno.innerHTML = `Done - ${dc}`;
  // if (donecount > 0) {
  //   doneno.innerHTML = `Done - ${donecount}`;
    local_done.forEach((comp)=>{
    const done_task=document.createElement('div')
    done_task.classList.add("done_task")
    done_task.innerHTML=`<p>${comp}</p>`
    // done_list.forEach((comp)=>{
    // const done_task=document.createElement('div')
    // done_task.classList.add("done_task")
    // done_task.innerHTML=`<p>${comp}</p>`
    done_box.appendChild(done_task);
  })
  } else {
    doneno.innerHTML = "Done";
  }
 
}
function check_task(e) {
  let index = e.target.dataset.index;
  let done = local_task.splice(index, 1)[0]; // Because splice() returns the removed items as an array
  // you need [0] to get the actual string/item, not the whole array.
  localStorage.setItem('tasks', JSON.stringify(local_task));
  local_done.push(done);
  localStorage.setItem('done',JSON.stringify(local_done))
  // done_list.push(done);
  rendertask();
  renderdone();
}

function edit_task(e){
    let index = e.currentTarget.dataset.index; 
    const taskDiv = e.currentTarget.closest('.task');
    let current_task=local_task[index]
    // let current_task=tasks_list[index]
    console.log(current_task)
    //e.currentTarget → always refers to the button that the event listener is attached to (not the child <img>, etc.)
//.closest('.task') → goes up the DOM tree to find the nearest ancestor with the class task (your task container div)
taskDiv.innerHTML=''
let updateinp=document.createElement('input')
updateinp.classList.add("updateinp")
updateinp.value=current_task
const confirm_but = document.createElement("button");
    confirm_but.classList.add("action", "check");
    confirm_but.dataset.index = index;
    confirm_but.innerHTML = `<img src="check.svg" alt="check">`;
    confirm_but.addEventListener("click", function () {
        const updated_task = updateinp.value.trim();
        if (updated_task !== "") {
            local_task[index] = updated_task;
            // tasks_list[index] = updated_task;
            localStorage.setItem('tasks', JSON.stringify(local_task));
            rendertask();
        } else {
            alert("Task cannot be empty.");
        }
    });
   taskDiv.append(updateinp,confirm_but)
}


function addtask() {
  let task = input.value.trim(); // to remove extra spaces
  if (task != "") {
    console.log(task);
    local_task.push(task);
    localStorage.setItem('tasks', JSON.stringify(local_task));
    // tasks_list.push(task);
    console.log(tasks_list);
    // The mistake I was doing I am running the loop every time when the add button is there so it duplicates the tasks
    // what I can do I refresh the task like when the add button pressed it removes the already listed task and add the updated list
    // Solution - Every time you add a task and loop through tasks_list to create elements, it adds duplicates unless you clear the previous list first.
    rendertask();
    input.value = "";
  } else {
    alert("Enter some task then add it");
  }
}
add.addEventListener("click", addtask);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addtask();
  }
});
// when page reloads it get all the tasks on the webpage
window.onload = () => {
  rendertask();
  renderdone();
};