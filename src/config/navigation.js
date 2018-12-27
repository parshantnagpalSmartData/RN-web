import { Navigation } from "react-native-navigation";

export const goToAuth = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: "App",
        children: [
          {
            component: {
              name: "SignIn"
            }
          }
        ]
      }
    }
  });

export const goHome = () =>
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            id: "sideDrawer",
            name: "SideMenu"
          }
        },
        center: {
          stack: {
            id: "MY_STACK",
            children: [
              {
                component: {
                  name: "OTPScreen",
                  options: {}
                }
              }
            ]
          }
        }
      }
    }
  });
