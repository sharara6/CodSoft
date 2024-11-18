const date = new Date()
const startTime = date.getTime()
console.log(startTime)
const list_el = document.getElementById("list");
const create_btn_el = document.getElementById("create");
const time_btn = document.getElementById("time");



	


let todos = [];


function getTimeSpent(){
	const date2 = new Date()
	const currentTime =  date2.getTime()
	console.log(currentTime)
	const timeSpent = currentTime-startTime
	return timeSpent
	console.l
}


create_btn_el.addEventListener('click', CreateNewTodo);

function CreateNewTodo () {
	const item = {
		id: new Date().getTime(),
		text: "",
		complete: false
	}

	todos.unshift(item);

	const { item_el, input_el } = CreateTodoElement(item);

	list_el.prepend(item_el);

	input_el.removeAttribute("disabled");
	input_el.focus();

	Save();
}

/* <div class="item">
	<input type="checkbox" />
	<input 
		type="text" 
		value="Todo content goes here" 
		disabled />
	<div class="actions">
		<button class="material-icons">edit</button>
		<button class="material-icons remove-btn">remove_circle</button>
	</div>
</div> */
function CreateTodoElement(item) {
	const item_el = document.createElement("div");
	item_el.classList.add("item");

	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.checked = item.complete;

	if (item.complete) {
		item_el.classList.add("complete");
	}

	const input_el = document.createElement("input");
	input_el.type = "text";
	input_el.value = item.text;
	input_el.setAttribute("disabled", "");

	const actions_el = document.createElement("div");
	actions_el.classList.add("actions");

	const edit_btn_el = document.createElement("button");
	edit_btn_el.classList.add("material-icons", "edit-btn");
	edit_btn_el.innerText = "Edit";

	
	const remove_btn_el = document.createElement("button");
	remove_btn_el.classList.add("material-icons", "remove-btn");
	remove_btn_el.innerText = "Delete";


	actions_el.append(edit_btn_el);
	actions_el.append(remove_btn_el);

	item_el.append(checkbox);
	item_el.append(input_el);
	item_el.append(actions_el);

	// EVENTS
	checkbox.addEventListener("change", () => {
		item.complete = checkbox.checked;

		if (item.complete) {
			item_el.classList.add("complete");
		} else {
			item_el.classList.remove("complete");
		}

		Save();
	});

	input_el.addEventListener("input", () => {
		item.text = input_el.value;
	});

	input_el.addEventListener("blur", () => {
		
		input_el.setAttribute("disabled", "");
		Save();
	});
	input_el.addEventListener("keydown",event => {
		if (event.key === 'Enter'){
		
			input_el.setAttribute("disabled", "");
			Save();
	}
	});

	edit_btn_el.addEventListener("click", () => {
		if(edit_btn_el.innerText.toLowerCase()=="edit"){
		input_el.removeAttribute("disabled");
		input_el.focus();
		edit_btn_el.innerText = "Save";
		
		}
		else{
			edit_btn_el.innerText = "Edit";
			
			input_el.setAttribute("disabled");
			
		}
	});

	remove_btn_el.addEventListener("click", () => {
		todos = todos.filter(t => t.id != item.id);

		item_el.remove();

		Save();
	});


	

	return { item_el, input_el, edit_btn_el, remove_btn_el }

	
}


function DisplayTodos(){
    Load();

    for (let i=0; i< todos.length; i++){
        const item = todos[i];
        const {item_el }=CreateTodoElement(item);
        list_el.append(item_el);
    }
}
DisplayTodos();

function Save(){
    const save = JSON.stringify(todos);

    localStorage.setItem("my_todos",save);
}

function Load(){
    const data = localStorage.getItem('my_todos')
    if(data){
        todos = JSON.parse(data);
    }
}
time_btn.addEventListener("click",()=>{
	const timeSpentInSeconds= getTimeSpent()/ 1000
	document.getElementById("t1").innerText ="Time is : " + timeSpentInSeconds
	console.log(timeSpentInSeconds)
})
// test push 2.0