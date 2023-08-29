const linkAPI       = 'http://localhost:3000/data'
const getAddTask    = document.getElementById('btn-toggle-form')
const getAreaFrom   = document.getElementById('area-form')
const getCancel     = document.getElementById('btn-cancel')
const bodyElement   = document.getElementById('area-list-task')
const submitElement = document.getElementById('btn-submit')
const nameElement   = document.getElementById('input-name')
const statusElement = document.getElementById('input-status')

function addTask () {getAddTask.onclick = () => {getAreaFrom.classList.toggle('d-none')}}
function cancel() {getCancel.onclick = () => {getAreaFrom.classList.add('d-none')}}

addTask()
cancel()
getData(renderData)
handleSubmitForm()

function getData(cb){ 
    fetch(linkAPI)
        .then(res => res.json())
        .then(cb);
}

function renderData (data,temp){
    var html = data.map(element => {  
        if(element.level =='small'){temp = 'bg-primary'}
        if(element.level =='medium'){temp = 'bg-warning'}
        if(element.level =='high'){temp = 'bg-danger'}
        console.log(temp);
        return `    
        <tr>
            <td>${element.id}</th>
            <td>${element.name}</td>
            <td><span class="badge ${temp}">${element.level}</span></td>
            <td>
                <button onclick="handleEdit('${element.id}','${element.name}','${element.level}')" class="btn btn-warning">Edit</button>
                <button onclick="handleDelete(${element.id})" class="btn btn-danger">Delete</button>
            </td>
        </tr>
        `
    })
    bodyElement.innerHTML = html.join('')
}

function handleSubmitForm(){
    submitElement.onclick = function(){
        let data = {    
            name: nameElement.value,
            level: statusElement.value
            }
            saveData(data,function(){
            getData(renderData)
            })  
    }
}

function saveData (data,cb){
    let option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    fetch(linkAPI,option)
    .then(res => res.json())
    .then(cb)
}

function handleDelete(id){
    let text = " DELETE \nBạn có chắc chắn muốn xóa công việc?"
    if(confirm(text)==true){
        let option = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }
        fetch(linkAPI + "/"+id,option)
        .then(res => res.json())
        .then(function (element){
        console.log(element);
        })
    }
}

function handleEdit(id, name, level){  
    nameElement.value = name
    statusElement.value = level
    submitElement.innerText= 'save'
    getAreaFrom.classList.remove('d-none')
    submitElement.onclick = function(){
        let data = {    
            name: nameElement.value,
            level: statusElement.value
           }
        let option = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }
        submitElement.innerText = 'save'
        fetch(linkAPI + "/" + id,option)
        .then(res => res.json())
        .then(function () {
            getData(renderData)
        })
    }
}