import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ setScreen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa tu correo electrónico y contraseña.');
      return;
    }

    try {
      console.log('Enviando datos:', { email, password });

      const response = await fetch('http://192.168.1.70:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      console.log('Response status:', response.status);

      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        await AsyncStorage.setItem('userToken', data.token);
        setScreen('home');
      } else {
        Alert.alert('Error', data.message || 'Credenciales incorrectas.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Error', 'Hubo un problema con la conexión. Por favor intenta nuevamente.');
    }
  };

  const handleFocus = (field) => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field) => {
    setIsFocused({ ...isFocused, [field]: false });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Accede a tu cuenta</Text>
        <Text style={styles.textInput}>Correo electrónico</Text>
        <TextInput
          style={[styles.input, isFocused.email && styles.inputFocused]}
          placeholder="Email"
          placeholderTextColor="#D2D2D2"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={() => handleFocus('email')}
          onBlur={() => handleBlur('email')}
        />
        <Text style={styles.textInput}>Contraseña</Text>
        <TextInput
          style={[styles.input, isFocused.password && styles.inputFocused]}
          placeholder="Contraseña"
          placeholderTextColor="#D2D2D2"
          selectionColor="#FF7B32"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          onFocus={() => handleFocus('password')}
          onBlur={() => handleBlur('password')}
        />
        <Pressable onPress={handleLogin} style={styles.btn}>
          <Text style={styles.btnText}>Iniciar sesión</Text>
        </Pressable>
        <View style={styles.buttonContainer}>
          <Pressable onPress={() => setScreen('recuperacion')}>
            <Text style={styles.txtBtnContainer}>Olvidé mi contraseña</Text>
          </Pressable>
          <Pressable onPress={() => setScreen('register')}>
            <Text style={styles.txtBtnContainer}>Registrarse</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FAF5F1',
  },
  title: {
    fontWeight: 'bold',
    marginLeft: 60,
    fontSize: 22,
    marginBottom: 20,
    color: '#666464',
  },
  textInput: {
    fontSize: 16,
    marginLeft: 60,
    color: '#666464',
  },
  input: {
    alignSelf: 'center',
    width: '70%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  inputFocused: {
    borderColor: '#FF7B32',
    borderWidth: 2,
  },
  btn: {
    backgroundColor: '#1663B6',
    padding: 10,
    marginTop: 20,
    marginLeft: 70,
    marginRight: 70,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    alignSelf: 'center',
  },
  txtBtnContainer: {
    fontSize: 13,
    color: '#1663B6',
  },
});

export default Login;
