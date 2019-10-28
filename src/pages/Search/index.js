import React, { Component } from 'react';
import api from '~/services/api';

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import { SearchBar } from 'react-native-elements';
import {search, close} from 'react-native-vector-icons/MaterialIcons'

import { ScrollView, FlatList } from 'react-native-gesture-handler';


export default class Search extends Component {
  state = {
    searchValue: '',
    searchResults: [],
  };
  static navigationOptions = {
    title: 'Search Commics',
  };
  updateSearchValue = searchValue => {
    this.setState({ searchValue });
    this.searchHero(searchValue);
  };
  searchHero = async nameStart => {
    const response = await api(
      'characters',
      `nameStartsWith=${nameStart}&limit=80`
    ).catch(err => {
      this.setState({ searchResults: 'error' });
    });
    const { results } = response.data.data;

    if (!results) return this.setState({ searchResults: results });

    return this.setState({ searchResults: results });
  };

  renderItem = ({item}) => {
    if(item ==='error') return

    return<TouchableOpacity onPress={()=>(
      this.props.navigation.navigate('Details', {
        id: item.id+''
      })
    )}>
    <ImageBackground
      source={{uri:item.thumbnail.path+'.jpg'}}
      style={styles.resultsListItemBg}
    >
      <View style={styles.resultsListItem}>
        <Text style={styles.resultsListItemName}>{item.name}</Text>
      </View>
      </ImageBackground>
    </TouchableOpacity>
    }

  render() {
    return (
    <ScrollView style={styles.container}>
      <View>
        <SearchBar
        placeholder="commics/ hero's name begins with"
        onChangeText={this.updateSearchValue}
        value={this.state.searchValue}
        icon={{name: search}}
        cancelIcons={{name: close}}
        />
        <FlatList
        data={this.state.searchResults}
        contentContainerStyle={styles.resultsList}
        keyExtractor={item=>item.id+''}
        renderItem={this.renderItem}
        />
      </View>
    </ScrollView>
    );
  }
}

const styles=StyleSheet.create({
  container:{
     backgroundColor:'rgba(128, 0, 0, 0.9)',
    flex:1
  },

  resultsList:{
    marginVertical:15,
  },

  resultsListItemBg:{
    width:'100%'
  },

  resultsListItem:{
    paddingHorizontal:10,
    paddingVertical:80,
    backgroundColor:'rgba(255,0,0,0.2)'
  },

  resultsListItemName:{
    color:'#fff',
    fontSize: 20,
    fontWeight: 'bold'
  }

})
