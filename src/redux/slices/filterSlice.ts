import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export enum SortPropertyEnum {
  RATING_DESC= 'rating',
  RATING_ASC= '-rating',
  TITLE_DESC= 'title',
  TITLE_ASC= '-title',
  PRICE_DESC= 'price',
  PRICE_ASC= '-price',

}

export type TSort = {
  name: string;
  sortProperties: SortPropertyEnum;
}

type FilterSliceState = { 
  searchValue: string;
  categoryId: number;
  sort: TSort;
  pageCount: number;
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  sort: {
    name: 'популярности (DESC)',
    sortProperties: SortPropertyEnum.RATING_DESC
  },
  pageCount: 1,
}

export const filterSlice     = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action:PayloadAction<number>) => {

      state.categoryId = action.payload
    },
    setSearchValue: (state, action: PayloadAction<string>) => {

      state.searchValue = action.payload
    },
    setSort: (state, action:PayloadAction<TSort>) => {
      state.sort.name = action.payload.name
      state.sort.sortProperties = action.payload.sortProperties;
    },
    setPageCount: (state, action:PayloadAction<number>) => {
      state.pageCount = action.payload;
    },
    setFilters: (state, action:PayloadAction<FilterSliceState>) => {
     if(Object.keys(action.payload).length){
      state.pageCount = Number(action.payload.pageCount);
      console.log(action.payload.categoryId);
      
      state.categoryId = action.payload.categoryId;
      state.sort = action.payload.sort;
     } else{
      state.pageCount=1;
      state.categoryId = 0;
      state.sort = {
        name: 'популярности',
        sortProperties: SortPropertyEnum.PRICE_DESC 
      }
     }
    }

  },
})

export const selectSort = (state: RootState) => state.filter;


// Action creators are generated for each case reducer function
export const { setSearchValue, setCategoryId, setSort, setPageCount, setFilters } = filterSlice.actions

export default filterSlice.reducer