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
    <View style={styles.container}>
      {CScene}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
