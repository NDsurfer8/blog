import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Feather } from '@expo/vector-icons';
import { Context } from '../context/BlogContext'


const IndexScreen = ({ navigation }) => {

    const { state, deleteBlogPost, getBlogPosts } = useContext(Context);
    
    useEffect(()=>{
        getBlogPosts();
        const listener = navigation.addListener('didFocus', ()=> {
            getBlogPosts();
        });
        return ()=> {
            listener.remove();
        };
    }, []);

    return (
        <View>
            <FlatList
                data={state}
                keyExtractor={(blogPost) => blogPost.title}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
                            <View style={styles.row}>
                                <Text style={styles.title}>{item.title}-{item.id}</Text>
                                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                    <Feather style={styles.icon} name="trash-2" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
};
// ALLOWS FOR PLUSS SIGN TO BE ADDED INTO THE HEADER 
IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                <Feather name="plus" size={30} />
            </TouchableOpacity>
        ),
    };
}

export default IndexScreen

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 18,
    },
    icon: {
        fontSize: 24
    }
})