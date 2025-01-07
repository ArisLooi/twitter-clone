import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Async thunk for fetching a user's posts
export const fetchPostsByUser = createAsyncThunk(
    "posts/fetchByUser",
    async (userId) => {
        try {
            const postsRef = collection(db, `users/${userId}/posts`);

            const querySnapshot = await getDocs(postsRef);
            const docs = querySnapshot.docs.map((doc) => ({
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
    async ({ userId, postContent, file }) => {
        try {
            const imageRef = ref(storage, `posts/${file.name}`);
            const response = await uploadBytes(imageRef, file);
            const imageUrl = await getDownloadURL(response.ref);
            const postsRef = collection(db, `users/${userId}/posts`);
            const newPostRef = doc(postsRef);
            await setDoc(newPostRef, { content: postContent, likes: [], imageUrl });
            const newPost = await getDoc(newPostRef);
            console.log(`users/${userId}/posts`);
            // Since no ID is given, Firestore auto generate a unique ID for this new document

            console.log(postContent);
            await setDoc(newPostRef, { content: postContent, likes: [] });

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