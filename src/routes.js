import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { TouchableOpacity } from 'react-native';

import Home from '~/pages/Home';
import Details from '~/pages/Details';
import Search from '~/pages/Search';

const rootStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      path: '/',
      navigationOptions: ({ navigation }) => ({
        title: 'Api Marvel',
        headerRight: (
          <TouchableOpacity
            style={{ marginHorizontal: 15 }}
            onPress={() => navigation.navigate('Search')}
          >
            <Icon name="search" color="white" size={20} />
          </TouchableOpacity>
        ),
      }),
    },
    Details: {
      screen: Details,
      path: '/details/:id',
    },
    Search: {
      screen: Search,
      path: '/search',
    },
  },
  {
    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#c00',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 22,
      },
    },
  }
);

const Routes = createAppContainer(rootStack);
export default Routes;
