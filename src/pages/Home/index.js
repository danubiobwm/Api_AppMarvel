import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
//import {  } from './styles';
import api from '~/services/api';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Home extends Component {
  state = {
    docs: [],
    offset: 0,
    total: 0,
    orderBy: '-modified'
  }
componentDidMount(){
  this.loadComics()
}
loadComics=async(offset=0)=>{
  const response=await api('characters', `limit=10&offset=${offset}&orderBy=${this.state.orderBy}`)
  const {results}=response.data.data
  const {total}=response.data.data
  this.setState({docs:[...this.state.docs, ...results], total, offset})
}
loadMore=()=>{
  const {total, docs, offset}=this.state
    if (total===docs.length) return

    const offsetValue = offset + 10

    this.loadComics(offsetValue)

}

renderItem=({item})=>(
  <View style={StyleSheet.listComicsItem}>
    <TouchableOpacity onPress={()=>{
      this.props.navigation.navigate('Details',{
        id:item.id+''
      })
    }}>
      <Image
      source={{uri:item.thumbnail.path+'.jpg'}}
      style={{width:'auto', height:290, borderRadius:50}}
      />
    </TouchableOpacity>
    <Text style={styles.listComicsItemName}>{item.name}</Text>
  </View>
)

render(){
return(
  <View style={styles.container}>
    <FlatList
    contentContainerStyle={styles.listComics}
    data={this.state.docs}
    keyExtractor={item=>''+item.id}
    renderItem={this.renderItem}
    onEndReached={this.loadMore}
    onEndReachedThreshold={0.1}
    />
  </View>
  )
}
}

const styles=StyleSheet.create({
  container:{
    backgroundColor:'rgba(128, 0, 0, 0.9)',
    flex:1,
    padding:20,
  },
  listComics:{
    marginVertical:15,
  },
  listComicsItem:{
    height: 380,
    borderRadius:5,
    marginVertical:10,
    marginHorizontal:10,
    padding:5,
    backgroundColor:'#ff0000'
  },
  listComicsItemName:{
    color:'#fff',
    fontSize:20,
    padding:10,
    fontWeight:'bold',
    textAlign: 'center'

  }
})
