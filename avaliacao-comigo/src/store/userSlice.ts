import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface InitialState {
    user: UserState;
    isLogged: boolean;
}

const initialState: InitialState = {} as InitialState;

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        changeUserEmail: (state, action: any) => {
            state.user.email = action.payload;
        },
        logInUser: (state, action: any) => {
            state.user = action.payload.user;
            state.isLogged = true;
        },
        setUser: (state, action: any) => {
            state.user = action.payload.user;
            state.isLogged = true;
        },
        logOutUser: (state) => {
            state.user = {} as UserState;
            state.isLogged = false;
        },
    },
});

export const { changeUserEmail, logInUser, setUser, logOutUser } =
    userSlice.actions;

export default userSlice.reducer;
