import { createSlice, PayloadAction } from "@reduxjs/toolkit";




export interface PersonalData {
    id?:number,
    first_name?: string
    last_name?: string
    email?: string
    age?: string
    grade?: string
}

const initialState: PersonalData = {
    id:0,
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    grade: ""
};

const dataSlice = createSlice({
    name: "DataStore",
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<PersonalData>) => {
            return {
                ...state,
                ...action.payload,


            };
        },
        resetData: (state) => {
            return {
                ...initialState,
            };
        },
    },
});

export default dataSlice.reducer;

export const { setData, resetData } = dataSlice.actions;