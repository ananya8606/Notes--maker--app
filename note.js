const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
 
var notes_container=document.getElementById('notes-cnt');
var modalBox=document.querySelector('#modal_box');
var addBtn = modalBox.querySelectorAll(".Add-note-btn")[0];
var updateBtn = modalBox.querySelectorAll(".Add-note-btn")[1];
var listArray=[];
let count=listArray.length;
$('#myModal').on('hidden.bs.modal', function (e) {
  document.getElementById('title-box').value = '';
  document.getElementById('description-box').value = '';
  document.querySelector(".modal-container  .modal-title").innerHTML = 'Add a new Note';
});
 
function createNote()
{
  addBtn.disabled=false;
  updateBtn.disabled=true;
  $("#myModal").modal('show');
}
  addBtn.addEventListener("click", () => {
    // Create the new note here
    var noteBox = document.createElement('div');
    noteBox.setAttribute('class', 'noteBox');
    notes_container.appendChild(noteBox);
    noteBox.id="note-box-"+Date.now();
    noteBox.innerHTML = `<li class="note">
    <div class="details">
      <p>This is a Title</p>
      <span>This is description</span>
    </div>
    <div class="bottom-content">
      <span>date here...</span>
      <div class="settings">
      <i class="fa-solid fa-ellipsis"></i>
        <ul class="menu">
          <li onclick="EditNote(event);"><i class="fa-solid fa-pen"></i>Edit</li>
          <li onclick="DeleteNote(event);"><i class="fa-solid fa-trash"></i>Delete</li>
        </ul>
      </div>
    </div>
  </li>`
    
    var titleValue = document.getElementById('title-box').value.trim();
    var descriptionValue = document.getElementById('description-box').value.trim();
    console.log(titleValue)
    console.log(descriptionValue)
    console.log(count)
    document.querySelectorAll('.note p')[count].innerHTML = titleValue;
    document.querySelectorAll('.note .details span')[count].innerHTML = descriptionValue;
    let currentDate = new Date(),
      month = months[currentDate.getMonth()],
      day = currentDate.getDate(),
      year = currentDate.getFullYear();
    document.querySelectorAll('.note .bottom-content span')[count].innerHTML = `${month} ${day}, ${year}`;
    let getLocalStorageData = localStorage.getItem("New Notes");
  if(getLocalStorageData == null){
    listArray = [];
  }else{  
    listArray = JSON.parse(getLocalStorageData);
  } 
  var newNoteBox={
    id:noteBox.id,
    class:noteBox.className,
    innerHTML:`<li class="note">
    <div class="details">
      <p>${titleValue}</p>
      <span>${descriptionValue}</span>
    </div>
    <div class="bottom-content">
      <span>${month} ${day}, ${year}</span>
      <div class="settings">
      <i class="fa-solid fa-ellipsis"></i>
        <ul class="menu">
          <li onclick="EditNote(event);"><i class="fa-solid fa-pen"></i>Edit</li>
          <li onclick="DeleteNote(event);"><i class="fa-solid fa-trash"></i>Delete</li>
        </ul>
      </div>
    </div>
  </li>`
  }
  listArray.push(newNoteBox);
  localStorage.setItem("New Notes", JSON.stringify(listArray)); 
  let LocalStorageData = localStorage.getItem("New Notes");
    document.getElementById('title-box').value = "";
    document.getElementById('description-box').value = '';
    count = count + 1;
    document.getElementById('closeModal').click();
  }); 
 
let data={};
function EditNote(event) {
  event.preventDefault();
  addBtn.disabled = true;
  updateBtn.disabled = false;
  var element = event.target.parentElement;
  while (element.className !== "note") {
    element = element.parentElement;
  }
  element.setAttribute("id", "tempid");
  let allNotes = document.querySelectorAll('.note');
  let index;
  for (let i = 0; i < allNotes.length; i++) {
    if (allNotes[i] === element) {
      index = i;
      break;
    }
  }
  console.log("index" + index);
  document.querySelector(".modal-container  .modal-title").innerHTML = "Update a Note";
  $("#myModal").modal("show");
  var presentTitle = allNotes[index].querySelector("p").innerText;
  var presentDescription = allNotes[index].querySelector(".details span").innerText;
  let currentDate = new Date(),
      month = months[currentDate.getMonth()],
      day = currentDate.getDate(),
      year = currentDate.getFullYear();
  var presentDate=`${month} ${day}, ${year}`;
  console.log(presentDate)
  document.getElementById("title-box").value = presentTitle;
  document.getElementById("description-box").value = presentDescription;
  data={ element:element,
         presentDate:presentDate
  };
  }
  // pass the abc function to the addEventListener function as a function expression
updateBtn.addEventListener("click",()=>updateNote(data));
// define the abc function using a function expression
function updateNote(data) {
  console.log(data.element);
  var titleValue = document.getElementById("title-box").value.trim();
  var descriptionValue = document.getElementById("description-box").value.trim();
  data.element.querySelector("p").innerHTML = titleValue;
  data.element.querySelector(".details span").innerHTML = descriptionValue;
  data.element.querySelector('.bottom-content span').innerHTML=data.presentDate;
  console.log(titleValue+" "+descriptionValue);
  data.element.removeAttribute("id");
  document.getElementById("title-box").value = "";
  document.getElementById("description-box").value = "";
  addBtn.innerHTML = "Add Note";
  document.querySelector(".modal-container  .modal-title").innerHTML = "Add a new Note";
  document.getElementById("closeModal").click();
  let getLocalStorageData = localStorage.getItem("New Notes");
  var noteBoxes = JSON.parse(getLocalStorageData);
  var noteBoxId=data.element.parentElement.id;
  console.log(data.element)
  var index=noteBoxes.findIndex(noteBox=>noteBox.id===noteBoxId);
  console.log(noteBoxes[index])
   noteBoxes[index].innerHTML=`<li class="note">
   <div class="details">
     <p>${titleValue}</p>
     <span>${descriptionValue}</span>
   </div>
   <div class="bottom-content">
     <span>${data.presentDate}</span>
     <div class="settings">
     <i class="fa-solid fa-ellipsis"></i>
       <ul class="menu">
         <li onclick="EditNote(event);"><i class="fa-solid fa-pen"></i>Edit</li>
         <li onclick="DeleteNote(event);"><i class="fa-solid fa-trash"></i>Delete</li>
       </ul>
     </div>
   </div>
 </li>`;
 console.log(noteBoxes[index])
   localStorage.setItem("New Notes", JSON.stringify(noteBoxes));
};
function DeleteNote(event){
  var element=event.target.parentElement;
  while(element.className!="noteBox"){
   element=element.parentElement;
   }
   let getLocalStorageData = localStorage.getItem("New Notes");
  noteBoxes = JSON.parse(getLocalStorageData);
  var noteBoxId=element.id;
  var index=noteBoxes.findIndex(noteBox=>noteBox.id===noteBoxId);
   noteBoxes.splice(index,1);
   localStorage.setItem("New Notes", JSON.stringify(noteBoxes));
   element.remove();
  count-=1;
}
function showNotes(){
  let getLocalStorageData = localStorage.getItem("New Notes");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  listArray.forEach((element) => {
    var noteBoxelement=document.createElement('div');
    noteBoxelement.id=element.id;
    noteBoxelement.className=element.class;
    noteBoxelement.innerHTML=element.innerHTML;
    notes_container.appendChild(noteBoxelement);
  });
 
}
showNotes();
 
// we can do it same from eventlistener also---------------------->
