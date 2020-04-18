import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './app/components/Button/Button.component';

export default function App() {
  return (
    <View style={styles.container}>
      <Button title="Press" onPress={() => alert("hello")}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131820',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
