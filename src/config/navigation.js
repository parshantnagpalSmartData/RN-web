import { Navigation } from 'react-native-navigation'

export const goToAuth = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'App',
      children: [
        {
          component: {
            name: 'SignIn',
          }
        }
      ],
    }
  }
});

export const goHome = () => Navigation.setRoot({
  root: {
    sideMenu: {
      left: {
        component: {
          id: 'sideDrawer',
          name: 'SideMenu',
        }
      },
      center: {
        bottomTabs: {
          id: 'BottomTabsId',
          children: [
            {
              stack: {
                id: 'MY_STACK',
                children: [{
                  component: {
                    name: 'Home',
                    options: {
                      bottomTab: {
                        fontSize: 12,
                        text: 'Home',
                        icon: require('../assets/img/signin.png')
                      }
                    }
                  },
                }],
              },
            },
            {
              stack: {
                children: [{
                  component: {
                    name: 'Tab2',
                    options: {
                      bottomTab: {
                        text: 'Tab 2',
                        fontSize: 12,
                        icon: require('../assets/img/signup.png')
                      }
                    }
                  },
                }],
              },
            },
          ],
        }
      }
    }
  }
})