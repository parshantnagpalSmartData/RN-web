import * as types from "../../actionTypes";
import { Navigation } from 'react-native-navigation';

export const pushTParticulatScreen = (componentId, screenNAme) => {
  return (dispatch) => {
    Navigation.push(componentId, {
      component: {
        name: screenNAme,
      }
    });
  };
}

export const pop = (componentId) => {
  return (dispatch) => {
    Navigation.pop(componentId);
  };
}
export const mergeOptions = (componentId, draweropen) => {
  return (dispatch) => {
    Navigation.mergeOptions(componentId, {
      sideMenu: {
        left: {
          visible: draweropen
        }
      }
    });
  }
}
export const setScrenStack = (componentId,screen,visible)=> {
  return(dispatch) => {
    Navigation.setStackRoot(componentId, {
      component: {
        name: screen,
        options: {
          topBar: {
            title: {
              text: 'Pushed 1'
            }
          },
             bottomTabs: {
                  visible,
                  drawBehind:true,
                }
        }
      }
    });
  }
}


