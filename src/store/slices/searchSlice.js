import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  records:[
    {id:1,address:'Alabama',postCode:43534,rooms:2,area:43,type:1,checked:false},
    {id:2,address:'Alaska',postCode:5345,rooms:32,area:41,type:3,checked:false},
    {id:3,address:'Arizona',postCode:23423,rooms:23,area:23,type:2,checked:false},
    {id:4,address:'Arkansas',postCode:23432,rooms:2,area:21,type:1,checked:false},
    {id:5,address:'California',postCode:234,rooms:65,area:100,type:2,checked:false}
  ],
  types:[{id:0,text:'All'},{id:1,text:'Flat'},{id:2,text:'Teraced House'},{id:3,text:'semi-detched'}],
  selectedType:0,
  searchedRecords:[],
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSelectedType:(state,action)=>{
      state.selectedType=action.payload
    },
    handleSearch:(state,action)=>{
      state.searchedRecords=state.records.filter(record=>record.address.includes(action.payload))
    },
    setFilteredRecord:(state,action)=>{
      state.records=state.records.map(record=>record.id===action.payload?{...record,checked:!record.checked}:record)
    }
  },
})

export const { setSelectedType,handleSearch,setFilteredRecord } = searchSlice.actions

export default searchSlice.reducer