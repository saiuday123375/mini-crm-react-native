import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if(email && password) {
      Alert.alert('Success', 'Logged in successfully');
      navigation.replace('CustomerList'); // safe navigation, prevents back to login
    } else {
      Alert.alert('Error', 'Enter email and password');
    }
  }

  return (
    <View style={styles.container}>
      <Title style={{marginBottom:20}}>Login</Title>
      <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button mode="contained" onPress={handleLogin}>Login</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', padding:20 },
  input: { marginBottom: 10 }
});
