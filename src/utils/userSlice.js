import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:null,
    reducers:{
        addUser:(state,action)=>{
         return action.payload;
        },
        removeUser:(state,action)=>{
       return null;// return null means to set the state to null which means no user is authenticated 
        },
    },
}
);
export const {addUser,removeUser}=userSlice.actions;
export default userSlice.reducer;