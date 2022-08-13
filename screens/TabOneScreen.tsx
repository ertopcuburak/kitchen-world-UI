import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, TouchableHighlight, Image, Pressable, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { environment } from '../environment/environment';
import { RootTabScreenProps } from '../types';
import { decode as atob, encode as btoa } from 'base-64';

export default function TabOneScreen({ route, navigation }: RootTabScreenProps<'TabOne'>) {
  const [advice, setAdvice] = useState<any[]>([]);
  const { categoryId } = route.params;
  useEffect(() => {

    const getData = async () => {
      try {
        const uname = await AsyncStorage.getItem('uname');
        const sid = await AsyncStorage.getItem('sid');
        if (uname !== null && sid !== null) {
          const apiUrl = environment();
          const url = apiUrl + "/recipes/categorized/" + categoryId;
          const fetchData = async () => {
            try {
              const base64Str = btoa(uname + ':' + sid);
              console.log(base64Str);
              const request = {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Basic ' + base64Str
                },
                body: null
              };
              console.log("::requesy::", request);
              const response = await fetch(url, request);
              //console.log("::no prob fetch::", JSON.stringify(response));
              const json = await response.json();
              //console.log(json);
              setAdvice(json);
            } catch (error) {
              console.log("error", error);
            }
          };


          fetchData();
        }
      } catch (e) {
        // error reading value
      }
    }

    getData();

  }, []);

  return (

    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {advice.map((recipe, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate('RecipeDetail', { itemId: recipe.id, name: recipe.name })}>
            <View style={styles.box}>
              <Image style={styles.image} source={{ uri: recipe.imageUrl }} />
              <View style={styles.info}>
                <Text style={styles.name}>{recipe.name}</Text>

                <View style={styles.row}>
                  <View style={styles.iconContainer}>

                    <Text style={styles.iconFonts}>{recipe.description}</Text>
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
    paddingTop: 50,
  },
  icon: {
    width: 30,
    height: 30,
  },
  image: {
    width: 150,
    height: 100
  },
  box: {
    marginTop: 10,
    paddingStart: 10,
    paddingEnd: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height: 1,
      width: -2
    },
    elevation: 2
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    marginTop: 10,
    color: '#333'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginTop: 10
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center'
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
    paddingTop: 10,
    width: '100%',
  }
});
