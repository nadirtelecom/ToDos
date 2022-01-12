
//----------------------------------------------------
const myList = document.querySelector('ul');
// Retreive DATA from Firestore: --------------------------------------------------------------------------
    addTasck = (tasck, id )=> {
        const html=  `<li class="list-group-item" data-id="${id}">
                        <h6>${tasck.Title}</h6>
                        <p> ${tasck.Create_at.toDate()} </p>
                        <button name="nadir" class="btn btn-outline-danger btn-sm my- fw-bold"> Delete </button>
                    </li>`
    // concatenation with var myList:
    myList.innerHTML += html
}

// Add Tascks on Firestore :--------------------------------------------------------------------------------
const myForm = document.querySelector('form');
myForm.addEventListener("submit", e => {
    e.preventDefault() // stop soumession du formumlaire de la page 
    const now = new Date();
    const tasck = {
        Title: myForm.tasck.value,
        Create_at : firebase.firestore.Timestamp.fromDate(now)//change date from timestap to date form(date-now)
    }
    db.collection("todoLists").add(tasck)
        .then(() => myForm.reset())
        .catch(err => console.err(err))
})

// Delete Data from Firestore:------------------------------------------------------------------------------

 myList.addEventListener("click", e => {
    if(e.target.nodeName === 'BUTTON'){
       //  console.log(e);
     let id = e.target.parentElement.getAttribute('data-id')
     //console.warn(id)
     db.collection("todoLists").doc(id).delete()
          .then(() => console.log("Document successfully deleted!"))
          .catch(err => console.error(err))    
     }
 })

 
// Delete item: -----------------------------------------------------------
  const deleteTasck = id => {
    const lists = document.querySelectorAll('li')
    lists.forEach(list => {
        if (list.getAttribute('data-id') === id){
            list.remove()}
        })   
}

// // Retreive Data by get : ----------------------------------------------------------------------------
// db.collection("todoLists").get() // db object created in script of connecting firestore with my Project
//     .then(res => 
//     res.docs.forEach(tasck =>  {
//         //console.log(tasck.id)
//         addTasck(tasck.data(), tasck.id)
//     }))
//   .catch(err => console.log(err))


// retreive data from Database firstore by OnSnapshot function:-----------------------------------------
db.collection("todoLists").onSnapshot(snap => {
    console.log(snap.docChanges())
    snap.docChanges().forEach( tasck => {
    //console.log(tasck.doc.id)
    if (tasck.type === "added") {
        addTasck(tasck.doc.data(), tasck.doc.id) 

    } else {
        deleteTasck(tasck.doc.id)
    }     
    })
})
