import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Image } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { environment } from '../environment/environment';
import { RootTabScreenProps } from '../types';

export default function RecipeDetailScreen({ route, navigation }: RootTabScreenProps<'RecipeDetail'>) {
  const [recipe, setRecipe] = useState<any>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const {itemId}  = route.params;
  useEffect(() => {
    const apiUrl = environment();
    const url = apiUrl+"/recipes/"+itemId;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        setRecipe(json);
        if(json && json.materialList) {
          setMaterials(json.materialList);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();

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
              source={{ uri:recipe.imageUrl }} 
              style={styles.recipeImg}
              resizeMode="contain"
            />

            <View style={styles.materials}>
              <Text style={styles.subtitle}>
                {'Malzemeler'}
              </Text>
              {materials.map((material: any) => (
                <Text>
                  {material.quantity + ' ' + material.materialName}
                </Text>
              ))}
            </View>

            <Text style={styles.subtitle}>
              {'Yapılışı'}
            </Text>
            <Text style={styles.bodyText}>
              {recipe.howToMake}
            </Text>
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
    width:'100%',
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
