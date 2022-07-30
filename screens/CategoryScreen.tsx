import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, TouchableHighlight, Image, Pressable } from 'react-native';

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
                    // Setting "index" as key because name and age can be repeated, It will be better if you assign uniqe id as key
                    <View style={styles.recipes}>
                      <View style={styles.imgCol}>
                      <TouchableHighlight
                              style={[styles.profileImgContainer, { borderColor: 'green', borderWidth:1 }]}
                              onPress={() => navigation.navigate('TabOne', {categoryId:category.id, name:category.name})}
                            >
                        <Image 
                          source={{ uri:category.imageUrl }} 
                          style={styles.profileImg} 
                        />
                      </TouchableHighlight>
                      </View>
                      <View style={styles.textCol}>
                      <Pressable 
                        style={styles.categorySt} 
                        onPress={() => navigation.navigate('TabOne', {categoryId:category.id, name:category.name})}
                        >
                        <Text style={styles.title}>{category.name}</Text>
                      </Pressable>
                      
                      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> 
                      </View>
                                           
                    </View>
                ))}
      </ScrollView>
    </SafeAreaView>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingStart:0,
    paddingEnd:0
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 0,
    paddingTop:10,
    width:'100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bodyText: {
    fontSize:16
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '100%',
  },
  recipes: {
    paddingTop: 0,
    paddingHorizontal:10,
    flexWrap: 'wrap',
    flexDirecton: 'row'
  },
  materials: {
    paddingTop:20,
    paddingBottom:20,
    paddingHorizontal:20
  },
  profileImgContainer: {
    marginLeft: 8,
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  categorySt: {
    width: '100%'
  },
  imgCol:{
    flexBasis:'100%',
    width: '100%'
  },
  textCol:{
    flexBasis:'100%',
    width: '100%'
  }
});
