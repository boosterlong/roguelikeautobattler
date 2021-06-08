import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StartGame from "./components/scenes/Start";
import Battle from "./components/scenes/Battle";

export default function App() {
  const [scene, setScene] = useState<string>('battle')

  let CScene
  if (scene === 'start') {
    CScene = <StartGame onPress={() => setScene('battle')} />
  } else if (scene === 'battle') {
    CScene = <Battle />
  }


  return (
  <View style={styles.backSplash}>
    <View style={styles.container}>
      <View style={styles.title}>The Forest of Judithia, the Eternal Judge</View>
      {CScene}
      <StatusBar style="auto" />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    fontFamily: 'Arial',
    paddingBottom: 8,
  },
  backSplash: {
    width: '100%',
    height: '100%',
    backgroundColor: '#cbdbf1'
  }
});
