import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "https://7e27c269-897c-43f3-828e-b4868ad585c2-00-2r5fr76a35h0r.pike.replit.dev"

// Async thunk for fetching a user's posts
export const fetchPostsByUser = createAsyncThunk(
    "posts/fetchByUser",
    async (userId) => {
        const response = await fetch(`${BASE_URL}/posts/user/${userId}`);
        return response.json();
    }
);

const postsSlice = createSlice({
    name: "posts",
    initialState: { posts: [], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPostsByUser.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.loading = false;
        })
    }
})

export default postsSlice.reducer;