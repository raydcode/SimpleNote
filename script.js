const addBtn  = document.getElementById('add');

const notes = JSON.parse(localStorage.getItem('notes'));  

//Update Local Storage

const updateNotes = ()=>{
    const notesText = document.querySelectorAll('textarea');

    const notes = [];

    notesText.forEach(note => notes.push(note.value))

    localStorage.setItem('notes', JSON.stringify(notes));
     
}



const addNotes = (text="")=>{
    const note = document.createElement('div')
    note.classList.add('note');

    note.innerHTML = `
     <div class='tools'>
       <button class='edit'><i class='fas fa-edit'></i></button>
       <button class='delete'><i class='fas fa-trash'></i></button>
     </div> 
     <div class='main ${text ? "" :"hidden"}'></div>
     <textarea class='textarea ${text ? "hidden" :""}'></textarea>
    `
    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const main = note.querySelector('.main');
    const textArea = note.querySelector('.textarea');

    textArea.value = text ;

    const markedDown = marked(text);

    main.innerHTML =  markedDown;

    deleteBtn.addEventListener('click',()=>{
        note.remove()

        updateNotes();
    })
 
   editBtn.addEventListener('click',()=>{
       main.classList.toggle('hidden');
       textArea.classList.toggle('hidden');
   })

    textArea.addEventListener('input',(e)=>{
   
        const {value} = e.target;
        main.innerHTML = marked(value)

        updateNotes()
         

    })

    document.body.appendChild(note);
}


 
if(notes){
    notes.forEach(note => addNotes(note));
}



addBtn.addEventListener('click', addNotes);