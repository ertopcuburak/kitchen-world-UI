import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, TouchableHighlight, Image, Pressable, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {environment} from '../environment/environment';

export default function CategoryScreen({ navigation }: RootTabScreenProps<'Category'>) {
  const [categories, setCategpries] = useState<any[]>([]);
  useEffect(() => {
    const apiUrl = environment();
    const url = apiUrl+"/categories";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        //console.log(json);
        setCategpries(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();

  }, []);

  return (
    
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      {categories.map((category, index) => (
        <TouchableOpacity key={index} onPress={() => navigation.navigate('TabOne', {categoryId:category.id, name:category.name})}>
        <View style={styles.box}>
          <Image style={styles.image} source={{uri:category.imageUrl}} />
          <View style={styles.info}>
            <Text  style={styles.name}>{category.name}</Text>
            
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                
                <Text style={styles.iconFonts}>{category.description}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      ))}
      </ScrollView>
    </SafeAreaView>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    paddingTop:50,
  },
  icon:{
    width:30,
    height:30,
  },
  image: {
    width: 150,
    height:100
  },
  box: {
    marginTop:10,
    paddingStart:10,
    paddingEnd:10,
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:1,
      width:-2
    },
    elevation:2
  },
  info: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize:20,
    marginTop:10,
    color: '#333'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginTop:10
  },
  iconContainer: {
    flex: 1,
    alignItems:'center'
  },
  iconFonts: {
    color: 'gray',
  },
  red: {
    color: '#FF4500',
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 0,
    paddingTop:10,
    width:'100%',
  }
});
