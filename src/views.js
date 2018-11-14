import moment from 'moment'
import { getFilters } from './filters'
import { sortNotes, getNotes, removeNote, saveNotes } from './notes'

// generate the dom structure for a note
//--------------------------------------------------------

   const generateNoteDom = (note) => {

      const noteWrapper = document.createElement('div')
      noteWrapper.classList.add('list-item')
      const noteTitle = document.createElement('p')
      const noteLink = document.createElement('a')
      const noteButton = document.createElement('span')
      const noteMeta = document.createElement('span')
      

      // setup the note title
      noteTitle.classList.add('list-item__title')
      noteLink.textContent = note.title.length > 0 ? note.title : 'Unnamed Note'
      noteLink.setAttribute('href', `edit.html#${note.id}`)
      noteTitle.appendChild(noteLink)
      noteWrapper.appendChild(noteTitle)

      //setup the last edited on
      noteMeta.classList.add('list-item__subtitle')
      noteMeta.textContent = generateLastEdited(note.updatedAt)
      noteWrapper.appendChild(noteMeta)

      //setup the remove button
      noteButton.classList.add('warning')
      noteButton.textContent = 'remove note'
      noteWrapper.appendChild(noteButton)
      noteButton.addEventListener('click', () => {
         removeNote(note.id)
         saveNotes()
         renderNotes()
      })

      return noteWrapper
   }


// render application notes
//--------------------------------------------------------

   const renderNotes = () => {

      const notesEl = document.querySelector('#notes')
      const filters = getFilters()
      const notes = sortNotes(filters.sortBy, filters.order)

      const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

      notesEl.innerHTML = ''

      if (filteredNotes.length > 0) {
         filteredNotes.forEach(note => {
            const noteEl = generateNoteDom(note)
            notesEl.appendChild(noteEl)
         })   
      } else {
         const emptyMessage = document.createElement('p')
         emptyMessage.classList.add('empty-message')
         emptyMessage.textContent = 'No notes saved'
         notesEl.appendChild(emptyMessage)
      }

      
   }


const initializeEditPage = (noteID) => {
   
   const title = document.querySelector('#note-title')
   const body = document.querySelector('#note-body')
   const lastEdited = document.querySelector('#last-edited')

   const notes = getNotes()
   const note = notes.find((note) => noteID === note.id)

   if (!note) {
      location.assign('/index.html')
   }

   // render the existing data 
   //--------------------------------------------------------

   title.value = note.title
   body.value = note.body
   lastEdited.textContent = generateLastEdited(note.updatedAt)
}

// generate the last edited message
//--------------------------------------------------------

   const generateLastEdited = (timestamp) => `last edited ${moment(timestamp).fromNow()}`


export { generateLastEdited, renderNotes, initializeEditPage }
