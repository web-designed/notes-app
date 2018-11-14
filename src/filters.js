const filters =  {
   searchText: '',
   sortBy: 'byEdited',
   order: 'desc'
}

const getFilters = () => { 
   return filters 
}

const setFilters = (updates) => {
   if(typeof updates.searchText === 'string'){
      filters.searchText = updates.searchText
   }
   if(typeof updates.sortBy === 'string'){
      filters.sortBy = updates.sortBy
   }
   if(updates.order === 'desc' || updates.order === 'asc'){
      filters.order = updates.order
   }
}


export { getFilters, setFilters }