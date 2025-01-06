import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const BASE_URL = "https://4622bc0f-9fdb-4271-8edb-7f0aba70f71d-00-sc8pewkfhh93.sisko.replit.dev"

// Async thunk for fetching a user's posts
export const fetchPostsByUser = createAsyncThunk(
    "posts/fetchByUser",
    async (userId) => {
        try {
            const postRef = collection(db, `users/${userId}/posts`);

            const querySnapshot = await getDocs(postRef);
            const docs = querySnapshot.docs.mao((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            return docs;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

// Async thunk to create a post
export const savePost = createAsyncThunk(
    "posts/savePost",
    async ({ userId, postContent }) => {
        try {
            const postRef = collection(db, `users/${userId}/posts`);
            console.log(`users/${userId}/posts`);
            // Since no ID is given, Firestore auto generate a unique ID for this new document
            const newPostRef = doc(postRef);
            console.log(postContent);
            await setDoc(newPostRef, { content: postContent, likes: [] });
            const newPost = await getDoc(newPostRef);

            const post = {
                id: newPost.id,
                ...newPost.data(),
            };
            return post;
        } catch (error) {
            console.error(error);
            throw error;
        }

    }
)

// Async thunk to like a post
export const likePost = createAsyncThunk(
    "posts/likePost",
    async ({ userId, postId }) => {
        try {
            const postRef = doc(db, `users/${userId}/posts/${postId}`);
            const docSnap = await getDoc(postRef);
            if (docSnap.exists()) {
                const postData = docSnap.data();
                const likes = [...postData.likes, userId];

                await setDoc(postRef, { ...postData, likes });
            }
            return { userId, postId };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)

// Async thunk to unlike a post
export const removeLikeFromPost = createAsyncThunk(
    "posts/removeLikeFromPost",
    async ({ userId, postId }) => {
        try {
            const postRef = doc(db, `users/${userId}/posts/${postId}`);
            const docSnap = await getDoc(postRef);
            if (docSnap.exists()) {
                const postData = docSnap.data();
                const likes = postData.likes.filter((id => id !== userId));

                await setDoc(postRef, { ...postData, likes });
            }
            return { userId, postId };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

const postsSlice = createSlice({
    name: "posts",
    initialState: { posts: [], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostsByUser.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.loading = false;
            })
            .addCase(savePost.fulfilled, (state, action) => {
                state.posts = [action.payload, ...state.posts];
            })
            .addCase(likePost.fulfilled, (state, action) => {
                const { userId, postId } = action.payload;
                const postIndex = state.posts.findIndex((post) => post.id === postId);

                if (postIndex !== -1) {
                    state.posts[postIndex].likes.push(userId);
                }
            })
            .addCase(removeLikeFromPost.fulfilled, (state, action) => {
                const { userId, postId } = action.payload;
                const postIndex = state.posts.findIndex((post) => post.id === postId);

                if (postIndex !== -1) {
                    state.posts[postIndex].likes = state.posts[postIndex].likes.filter(
                        (id) => id !== userId)
                }
            })
    },
})

export default postsSlice.reducer;