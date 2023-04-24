//this will store all the types of the initialState. and then taking the action according to them..
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
// for user loading 
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
// for login user
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
//for logout
export const LOGOUT = 'LOGOUT';

// for profile
export const GET_PROFILE = 'GET_PROFILE';
export const PROFILE_ERROR = 'PROFILE_ERROR';
//when user logout it's profile should be clear..
export const CLEAR_PROFILE = 'CLEAR_PROFILE';
// to update profile
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
// to delete the account
export const ACCOUNT_DELETE = 'ACCOUNT_DELETE';
// to get all user's profiles
export const GET_PROFILES = 'GET_PROFILES';
// to get user's github repos
export const GET_REPOS = 'GET_REPOS';
