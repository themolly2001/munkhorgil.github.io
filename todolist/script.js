const inputBox = document.getElementById("input-box");

const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("No Tasks Added!");
    } 
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        saveData();
    }
    inputBox.value = "";
    
}

//allows tasks to be added by pressing "Enter"
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
});

inputBox.addEventListener("keydown", function(e){
    if (e.key === "Enter"){
        addTask();
    }
});

function saveData(){
    localStorage.setItem("tasks", listContainer.innerHTML);
}

function showTasks(){
    listContainer.innerHTML  = localStorage.getItem("tasks");
}

showTasks();

//allows checked tasks to remain checked after refreshing
function keepCheck(){
    const tasks = document.querySelectorAll("#list-container li");
    const checkedTasks = JSON.parse(localStorage.getItem("checkedTasks")) || [];
    tasks.forEach(tasks => {
        if(checkedTasks.includes(tasks.textContent)) {
            task.classList.add("checked");
        }
    });
}
keepCheck();