import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SearchScreen from './src/screens/SearchScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import RepositoryDetails from './src/screens/RepositoryDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs() {
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (repo) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = { ...prevFavorites };
      if (updatedFavorites[repo.id]) {
        delete updatedFavorites[repo.id];
      } else {
        updatedFavorites[repo.id] = repo;
      }
      return updatedFavorites;
    });
  };

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        options={{ tabBarIcon: ({ color }) => <FontAwesome name="search" size={24} color={color} /> }}
      >
        {({ navigation }) => (
          <SearchScreen toggleFavorite={toggleFavorite} favorites={favorites} navigation={navigation} />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Favorites"
        options={{ tabBarIcon: ({ color }) => <FontAwesome name="heart" size={24} color={color} /> }}
      >
        {({ navigation }) => (
          <FavoritesScreen toggleFavorite={toggleFavorite} favorites={favorites} navigation={navigation} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="RepositoryDetails" component={RepositoryDetails} options={{ title: 'Repository Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
