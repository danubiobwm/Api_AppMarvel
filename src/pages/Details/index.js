import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import api from '~/services/api';

class Details extends Component {
  constructor(props){
    super(props)
 }

 state = {
    requestedHeroId: this.props.navigation.getParam('id', 'Invalid ID'),
    heroProfile: [],
    heroImageUrl: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
    heroComics: []
 }

 static navigationOptions = {
    title: 'Character detail'
 }

 componentDidMount(){
    this.loadHeroDetail(this.state.requestedHeroId)
 }

 loadHeroDetail = async(id) => {
    const response = await api('characters/'+id)
    const {results} = response.data.data
    this.setState({heroProfile: results[0], heroImageUrl: results[0].thumbnail.path+'.jpg', heroComics: {...results[0].comics}})
 }

 render() {
    const { name, description } = this.state.heroProfile
    const {available} = this.state.heroComics
    return (
       <ScrollView>
          <View style={styles.container}>
             <Image source={{uri: this.state.heroImageUrl}} style={styles.characterImage}/>
             <Text style={styles.characterName}>{name}</Text>
             <ScrollView style={styles.characterInfo}>
                <Text style={styles.characterDescription}>{description || 'No description provided'}</Text>
             </ScrollView>
             <Text style={styles.characterComicsSection}> Comics ({available}) </Text>
             <FlatList
                data={this.state.heroComics.items}
                keyExtractor={comic => comic.resourceURI}
                renderItem={({item}) => (<View><Text style={styles.comicName}>  {item.name} </Text></View>)}
             />
          </View>
       </ScrollView>
    );
 }
}

const styles = StyleSheet.create({
 container: {
    flex:1,
    backgroundColor: 'rgba(128, 0, 0, 0.9)',
    padding: 10,
 },

 characterInfo: {
    backgroundColor: '#A52A2a',
    marginVertical: 12,
    borderRadius: 8,
    padding: 12
 },

 characterImage: {
    borderRadius: 50,
    width: 'auto',
    height: 380,
    resizeMode: 'contain'
 },

 characterName: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center'
 },

 characterDescription: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'justify'
 },

 characterComicsSection: {
    marginVertical: 12,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
 },

 comicName: {
    fontSize: 18,
    color: '#ddd',
    marginBottom: 15
 },
})
export default Details;
