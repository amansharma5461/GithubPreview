import React from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const FavoritesScreen = ({ favorites, toggleFavorite, navigation }) => {
  const favoriteList = Object.values(favorites);

  return (
    <View style={styles.container}>
      {favoriteList.length === 0 ? (
        <Text style={styles.noDataText}>No favorite repositories</Text>
      ) : (
        <FlatList
          data={favoriteList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.repositoryItem}>
              <View style={styles.repoDetails}>
                <TouchableOpacity 
                  onPress={() => navigation.navigate('RepositoryDetails', { repository: item })}
                >
                  <Text style={styles.repositoryName}>{item.name}</Text>
                  <Text style={styles.repositoryDescription}>{item.description}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => toggleFavorite(item)}>
                <FontAwesome 
                  name={favorites[item.id] ? 'heart' : 'heart'} 
                  size={24} 
                  color={favorites[item.id] ? 'red' : 'black'} 
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  repositoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  repoDetails: {
    flex: 1,
  },
  repositoryName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  repositoryDescription: {
    fontSize: 14,
    color: '#555',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default FavoritesScreen;
