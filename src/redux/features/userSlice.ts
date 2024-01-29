import User from '@/domain/user/User';
import UserRepository from '@/domain/user/UserRepository';
import { createSlice } from '@reduxjs/toolkit';

const userRepository = new UserRepository();

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userRepository,
    },
    reducers: {
        addUser: (state, action) => {
            const { name, email } = action.payload;
            state.userRepository.addUser(name, email);
        },
    },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
