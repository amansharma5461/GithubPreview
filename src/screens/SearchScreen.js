// import React, { useState, useEffect } from 'react';
// import { 
//   View, TextInput, FlatList, Text, StyleSheet, ActivityIndicator, TouchableOpacity 
// } from 'react-native';
// import { searchRepositories } from '../utils/api';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

// const SearchScreen = ({ navigation, toggleFavorite, favorites }) => {
//     const [query, setQuery] = useState('');
//     const [repositories, setRepositories] = useState([]);
//     const [page, setPage] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [hasMore, setHasMore] = useState(true);
//     const [typingTimeout, setTypingTimeout] = useState(null);
  
//     // Fetch repositories
//     const fetchRepositories = async (searchQuery, pageNumber) => {
//       if (loading) return; 
//       setLoading(true);
  
//       try {
//         const results = await searchRepositories(searchQuery, pageNumber, 15);
//         if (results && results.length > 0) {
//           setRepositories((prevRepos) =>
//             pageNumber === 1 ? results : [...prevRepos, ...results]
//           );
//           setHasMore(true);
//         } else {
//           setHasMore(false);
//         }
//       } catch (error) {
//         console.error('Error fetching repositories:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     // Handle search
//     const handleSearch = (text) => {
//       setQuery(text);
//       setPage(1);
//       setRepositories([]);
//       setHasMore(true);
  
//       if (typingTimeout) clearTimeout(typingTimeout);
//       setTypingTimeout(setTimeout(() => {
//         fetchRepositories(text, 1);
//       }, 500));
//     };
  
//     useEffect(() => {
//       fetchRepositories(query, page);
//     }, [page]);
  
//     return (
//       <View style={styles.container}>        
//         <TextInput
//           style={styles.searchBar}
//           placeholder="Search GitHub Repositories"
//           value={query}
//           onChangeText={handleSearch}
//         />
//         {loading && repositories.length === 0 ? (
//           <ActivityIndicator size="large" color="#0000ff" />
//         ) : repositories.length === 0 ? (
//           <Text style={styles.noDataText}>No repositories found</Text>
//         ) : (
//           <FlatList
//             data={repositories}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item }) => (
//               <View style={styles.repositoryItem}>
//                 <View style={styles.repoDetails}>
//                   <TouchableOpacity 
//                     onPress={() => navigation.navigate('RepositoryDetails', { repository: item })}
//                   >
//                     <Text style={styles.repositoryName}>{item.name}</Text>
//                     <Text style={styles.repositoryDescription}>{item.description}</Text>
//                   </TouchableOpacity>
//                 </View>
//                 <TouchableOpacity onPress={() => toggleFavorite(item)}>
//                   <FontAwesome 
//                     name={favorites[item.id] ? 'heart' : 'heart-o'} 
//                     size={24} 
//                     color={favorites[item.id] ? 'red' : 'black'} 
//                   />
//                 </TouchableOpacity>
//               </View>
//             )}
//             onEndReached={() => setPage(page + 1)}
//             onEndReachedThreshold={0.5}
//             ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
//           />
//         )}
//       </View>
//     );
//   };
  
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       padding: 16,
//     },
//     searchBar: {
//       height: 40,
//       borderColor: 'gray',
//       borderWidth: 1,
//       paddingHorizontal: 8,
//       marginBottom: 16,
//     },
//     repositoryItem: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       padding: 16,
//       borderBottomWidth: 1,
//       borderBottomColor: '#ccc',
//     },
//     repoDetails: {
//       flex: 1, 
//     },
//     repositoryName: {
//       fontWeight: 'bold',
//       fontSize: 16,
//       marginBottom: 4,
//     },
//     repositoryDescription: {
//       fontSize: 14,
//       color: '#555',
//       flexWrap: 'wrap', 
//     },
//     noDataText: {
//       textAlign: 'center',
//       marginTop: 20,
//       fontSize: 16,
//     },
//   });
  

// export default SearchScreen;



import React, { useState, useEffect } from 'react';
import { 
  View, TextInput, FlatList, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { searchRepositories } from '../utils/api';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SearchScreen = ({ navigation, toggleFavorite, favorites }) => {
    const [query, setQuery] = useState('');
    const [repositories, setRepositories] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [typingTimeout, setTypingTimeout] = useState(null);
  
    const fetchRepositories = async (searchQuery, pageNumber) => {
      setLoading(true);
  
      // Check Internet Connection
      const netInfo = await NetInfo.fetch();
      if (!netInfo.isConnected) {
        Alert.alert('No Internet', 'Please check your connection and try again.');
        setLoading(false);
        return;
      }

      try {
        const results = await searchRepositories(searchQuery, pageNumber, 15);
        if (results && results.length > 0) {
          setRepositories((prevRepos) =>
            pageNumber === 1 ? results : [...prevRepos, ...results]
          );
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching repositories:', error);
      } finally {
        setLoading(false);
      }
    };
  
    // Handle search
    const handleSearch = (text) => {
      setQuery(text);
      setPage(1);
      setRepositories([]);
      setHasMore(true);
  
      if (typingTimeout) clearTimeout(typingTimeout);
      setTypingTimeout(setTimeout(() => {
        fetchRepositories(text, 1);
      }, 500));
    };
  
    useEffect(() => {
      fetchRepositories(query, page);
    }, [page]);
  
    return (
      <View style={styles.container}>        
        <TextInput
          style={styles.searchBar}
          placeholder="Search GitHub Repositories"
          value={query}
          onChangeText={handleSearch}
        />
        {loading && repositories.length === 0 ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : repositories.length === 0 ? (
          <Text style={styles.noDataText}>No repositories found</Text>
        ) : (
          <FlatList
            data={repositories}
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
                    name={favorites[item.id] ? 'heart' : 'heart-o'} 
                    size={24} 
                    color={favorites[item.id] ? 'red' : 'black'} 
                  />
                </TouchableOpacity>
              </View>
            )}
            onEndReached={() => setPage(page + 1)}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
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
    searchBar: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      paddingHorizontal: 8,
      marginBottom: 16,
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
      flexWrap: 'wrap', 
    },
    noDataText: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 16,
    },
  });
  
export default SearchScreen;
