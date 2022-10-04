import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store';






type TPizzaItem = {
  id: string;
  title: string;
  size: number[];
  price: number[];
  imageUrl: string;
  type: string;
  rating: number;
}

export type SearchPizzaParams = {
  category: string;
   search: string;
    order: string;
     sortBy: string;
    pageCount: number;
}


export const fetchPizza = createAsyncThunk<TPizzaItem[] , SearchPizzaParams>(
  'pizza/fetchByPizzaStatus',
  async (params) => {
    
    
    const { category, search, order, sortBy, pageCount }= params;
    
    const { data } = await axios.get<TPizzaItem[]>(`https://630a37483249910032829f92.mockapi.io/pizzadb?page=${pageCount}&limit=4${category}&&sortBy=${sortBy}&order=${order}&&${search}`)
    return data;

  }
)


type TPizzaState = {

  items:TPizzaItem[] ;
  status: 'loading'| 'success' | 'error';
}

const initialState: TPizzaState = {
  items: [],
  status: 'loading'

}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {

    SetItems(state, action) {
      state.items = action.payload;
    },

  },

  extraReducers(builder) {
    builder.addCase(fetchPizza.pending,(state, ) =>{
      state.status = 'loading'
       state.items = []
    })
    builder.addCase(fetchPizza.fulfilled,(state, action) =>{
      state.items = action.payload;
      state.status = 'success'
    })
    builder.addCase(fetchPizza.rejected,(state, ) =>{
      state.status = 'error'
     state.items = []
    })
  },
  
})


export const PizzaData = (state:RootState) => state.Pizza;
// Action creators are generated for each case reducer function
export const { SetItems } = pizzaSlice.actions

export default pizzaSlice.reducer