import { renderNotes } from './views'
import { createNote } from './notes'
import { setFilters } from './filters'

renderNotes();

document.querySelector('#add').addEventListener('click', (e) => {
   const id = createNote()
   location.assign(`/edit.html#${id}`)
})

document.querySelector('#search').addEventListener('input', (e) => {
   setFilters({searchText: e.target.value})
   renderNotes()
})

document.querySelector('#sort').addEventListener('change', (e) => {
   setFilters({sortBy: e.target.value})
   renderNotes();
})

document.querySelector('#order').addEventListener('change', (e) => {
   setFilters({order: e.target.value})
   renderNotes();
})

window.addEventListener('storage', (e) => {
   if(e.key === 'notes'){
      renderNotes();
   }
})