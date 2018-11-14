import { generateLastEdited, initializeEditPage } from './views'
import { loadNotes, saveNotes, updateNote, removeNote } from './notes'
import moment from 'moment'


// set some vars
//--------------------------------------------------------

   const noteID = location.hash.substring(1)
   const title = document.querySelector('#note-title')
   const body = document.querySelector('#note-body')
   const lastEdited = document.querySelector('#last-edited')
   const remove = document.querySelector('#remove-note')
   const form = document.querySelector('#note-form')
   
   initializeEditPage(noteID)



// add event listeners
//--------------------------------------------------------

   title.addEventListener('input', (e) => {
      const note = updateNote(noteID, {
         title : e.target.value,
         updatedAt: moment().valueOf()
      })
      lastEdited.textContent = generateLastEdited(note.updatedAt)
   })

   body.addEventListener('input', (e) => {
      const note = updateNote(noteID, {
         body : e.target.value,
         updatedAt: moment().valueOf()
      })
      lastEdited.textContent = generateLastEdited(note.updatedAt)
   })

   remove.addEventListener('click', (e) => {
      removeNote(noteID)
      saveNotes()
      location.assign('/index.html')
   })

   form.addEventListener('submit', (e) => {
      e.preventDefault()
      location.assign('/index.html')
   })

   window.addEventListener('storage', (e) => {
      if(e.key === 'notes'){
         initializeEditPage(noteID)
      }
   })