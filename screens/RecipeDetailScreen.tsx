import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Image, useWindowDimensions } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { environment } from '../environment/environment';
import { RootTabScreenProps } from '../types';
import RenderHtml from 'react-native-render-html';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode as atob, encode as btoa } from 'base-64';

export default function RecipeDetailScreen({ route, navigation }: RootTabScreenProps<'RecipeDetail'>) {
  const [recipe, setRecipe] = useState<any>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const { itemId } = route.params;
  const { width } = useWindowDimensions();
  const [source, setSource] = useState<any>({ html: '' });
  useEffect(() => {

    const getData = async () => {
      try {
        const uname = await AsyncStorage.getItem('uname');
        const sid = await AsyncStorage.getItem('sid');
        if (uname !== null && sid !== null) {
          const apiUrl = environment();
          const url = apiUrl + "/recipes/" + itemId;
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
              setRecipe(json);
              setSource({ html: json.howToMake });
              //console.log("::source::", { html: source });
              if (json && json.materialList) {
                setMaterials(json.materialList);
              }
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
        {
          // Setting "index" as key because name and age can be repeated, It will be better if you assign uniqe id as key
          <View style={styles.recipes} key={recipe.id}>
            <Text style={styles.title}>
              {recipe.name}
            </Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            <Image
              source={{ uri: recipe.imageUrl }}
              style={styles.recipeImg}
              resizeMode="contain"
            />

            <View style={styles.materials}>
              <Text style={styles.subtitle}>
                {'Malzemeler'}
              </Text>
              {materials.map((material: any) => (
                <Text>
                  {material.quantity ? material.quantity + ' ' + material.materialName : material.materialName}
                </Text>
              ))}
            </View>
            <Text style={styles.subtitle}>
              {'Yapılışı'}
            </Text>
            <RenderHtml
              contentWidth={width}
              source={source}
            />
          </View>
        }
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingStart: 0,
    paddingEnd: 0
  },
  scrollView: {
    backgroundColor: 'white',
    width: '100%',
    marginHorizontal: 0,
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
    fontSize: 16
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '100%',
  },
  recipes: {
    paddingTop: 20,
    paddingHorizontal: 10
  },
  materials: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20
  },
  recipeImg: {
    height: 195,
    width: 395
  }
});
