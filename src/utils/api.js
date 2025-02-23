import NetInfo from '@react-native-community/netinfo';

export const searchRepositories = async (query = '', page = 1, perPage = 15) => {
    console.log(`API Calling: Query="${query}", Page=${page}`);

    const apiUrl = query.trim()
        ? `https://api.github.com/search/repositories?q=${query}+in:name&sort=stars&order=desc&page=${page}&per_page=${perPage}`
        : `https://api.github.com/search/repositories?q={query}`;

    try {
        // Check Internet Connection
        const netState = await NetInfo.fetch();
        if (!netState.isConnected) {
            console.error('No Internet Connection');
            return { error: 'No Internet Connection' };
        }

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.items) {
            return data.items;
        } else {
            console.error('API Error:', data);
            return [];
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        return { error: 'Something went wrong!' };
    }
};
