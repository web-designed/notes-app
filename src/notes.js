import uuidv4 from 'uuid'
import moment from 'moment' 

let notes = []

// read exisiting notes from local storage
//--------------------------------------------------------

   export const loadNotes = () => {
      const notesJSON = localStorage.getItem('notes')
      try {
         return notesJSON ? JSON.parse(notesJSON) : []
      } catch (e){
         return []
      }
   }

   notes = loadNotes()


// expose notes from the module
//--------------------------------------------------------

   const getNotes = () => notes


// create note
//--------------------------------------------------------

   const createNote = () => {
      const id = uuidv4()
      const timestamp = moment().valueOf()
      notes.push({
         id: id,
         title:'',
         body:'',
         createdAt:timestamp,
         updatedAt:timestamp
      })
      saveNotes(notes)
      return id
   }


// save the notes to local storage
//--------------------------------------------------------

const saveNotes = () => {
   localStorage.setItem('notes', JSON.stringify(notes))
}


// remove the note
//--------------------------------------------------------

const removeNote = (id) => {
   console.log(id)
   const index = notes.findIndex((note) => id === note.id)
   if (index > -1 ) {
      notes.splice(index, 1);
      saveNotes()   
   }
}


// sort notes
//--------------------------------------------------------

const sortNotes = (sortBy, order) => {

   // sort ASC and DESC
   const orderIndex = order === 'desc' ? 1 : -1

   if(sortBy === 'byEdited'){
      return notes.sort((a, b) => {
         if (a.updatedAt > b.updatedAt) return -1 * orderIndex
         else if (a.updatedAt < b.updatedAt) return 1 * orderIndex
         return 0
      })
   } else if (sortBy === 'byCreated'){
      return notes.sort((a, b) => {
         if (a.createdAt > b.createdAt) return -1 * orderIndex
         else if (a.createdAt < b.createdAt) return 1 * orderIndex
         return 0
      })
   } else if (sortBy === 'alphabetical') {
      return notes.sort((a, b) => {
         if (a.title.toLowerCase() > b.title.toLowerCase()) return 1 * orderIndex
         else if (a.title.toLowerCase() < b.title.toLowerCase()) return -1 * orderIndex
         return 0
      })
   } 
}


// update note
//--------------------------------------------------------

   const updateNote = (id, updates) => {
      const note = notes.find((note) => note.id === id)

      if (!note) {
         return
      }

      if(typeof updates.title === 'string') {
         note.title = updates.title
         note.updatedAt = moment().valueOf()
      }

      if(typeof updates.body === 'string'){
         note.body = updates.body
         note.updatedAt = moment().valueOf()
      }

      saveNotes()

      return note
   }



export { saveNotes, getNotes, createNote, removeNote, sortNotes, updateNote }