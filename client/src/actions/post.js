import { GET_POSTS,POST_ERROR,UPDATE_LIKES,DELETE_POST,ADD_POST,GET_POST } from "./type";
import axios from 'axios';
import setAlert from "./alerts";

export const getPosts =()=> async dispatch=>{
    try {
        const res = await axios.get('/api/post');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload:{
                msg: err.response.statusText,
                status:err.response.status
            }
        })
    }
}
// get post
export const getPost =(id)=> async dispatch=>{
    try {
        const res = await axios.get(`/api/post/${id}`);
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload:{
                msg: err.response.statusText,
                status:err.response.status
            }
        })
    }
}
// Add like
export const addLike =id=> async dispatch=>{
    try {
        const res = await axios.put(`/api/post/like/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: {id,likes:res.data}
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload:{
                msg: err.response.statusText,
                status:err.response.status
            }
        })
    }
}

// remove like
export const removeLike =id=> async dispatch=>{
    try {
        const res = await axios.put(`/api/post/unlike/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: {id,likes:res.data}
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload:{
                msg: err.response.statusText,
                status:err.response.status
            }
        })
    }
}

// deletepost
export const deletePost =id=> async dispatch=>{
    console.log('Delete post action is working');
    try {
        await axios.delete(`/api/post/${id}`);
        dispatch({
            type: DELETE_POST,
            payload: id
        })
        dispatch(setAlert('Post Removed','success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload:{
                msg: err.response.statusText,
                status:err.response.status
            }
        })
    }
}

// add post
export const addPost =(formData)=> async dispatch=>{
    // console.log('Delete post action is working');
    const config = {
        headers:{
            'Content-Type' : 'application/json' 
        }
    }
    try {
        const res = await axios.post(`/api/post`,formData,config);
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
        dispatch(setAlert('Post Created','success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload:{
                msg: err.response.statusText,
                status:err.response.status
            }
        })
    }
}