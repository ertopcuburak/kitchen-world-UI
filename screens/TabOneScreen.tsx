import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [advice, setAdvice] = useState<any[]>([]);
  useEffect(() => {
    const url = "https://cb1b-5-27-31-231.eu.ngrok.io/recipes";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        //console.log(json);
        setAdvice(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();

  }, []);

  return (
    
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      {advice.map((recipe, index) => (
                    // Setting "index" as key because name and age can be repeated, It will be better if you assign uniqe id as key
                    <View style={styles.recipes}>
                      <Button
                        title={recipe.name}
                        onPress={() => navigation.navigate('RecipeDetail', {itemId:recipe.id, name:recipe.name})}
                      />
                      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />                      
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
    backgroundColor: '#72A2CF',
    marginHorizontal: 0,
    width:'100%'
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
    paddingTop: 20,
    paddingHorizontal:10
  },
  materials: {
    paddingTop:20,
    paddingBottom:20,
    paddingHorizontal:20
  }
});
