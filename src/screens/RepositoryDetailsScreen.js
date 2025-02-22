import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const RepositoryDetailsScreen = ({ route }) => {
  const { repository } = route.params;

  return (
    <View style={styles.container}>
        <View style={styles.ownerContainer}>
        <Image
          source={{ uri: repository.owner.avatar_url }}
          style={styles.avatar}
        />
        <Text>{repository.owner.login}</Text>
      </View>
      <Text style={styles.desText}><Text style={styles.name}>Repository name: </Text>{repository.name}</Text>
      <Text style={styles.desText}><Text style={styles.name}>Description:</Text> {repository.description}</Text>
      <Text style={styles.desText}><Text style={styles.name}>Stars: </Text>{repository.stargazers_count}</Text>
      <Text style={styles.desText}><Text style={styles.name}>Forks: </Text>{repository.forks_count}</Text>
      <Text style={styles.desText}><Text style={styles.name}>Language: </Text>{repository.language}</Text>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  name: {
    fontSize: 17,
    fontWeight: '500',
  },
  text:{
    fontSize: 18,
    fontWeight: '500',
  },
  desText:{
    fontSize:15,
  },
  ownerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
});

export default RepositoryDetailsScreen;