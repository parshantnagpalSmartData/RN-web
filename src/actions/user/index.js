// import RestClient from './helper/RestClient';
/*
Api for registeration of rider
*/
import {Platform} from 'react-native';
import * as Types from "../../actionTypes";
import * as AppActions from  '../app';

export const signIn =  (screen) => {
  return async (dispatch, getState) => {
   
  };
};

export const login = () => ({
   type :  Types.LOGIN         
});

export const logOut = () => ({
  type :  Types.LOGOUT         
});
