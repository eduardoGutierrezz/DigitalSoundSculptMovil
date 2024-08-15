import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Register = ({ setScreen }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [isSerialValid, setIsSerialValid] = useState(false);

  const [isFocused, setIsFocused] = useState({
    nombre: false,
    email: false,
    password: false,
    confirmPassword: false,
    serialNumber: false,
  });

  const handleFocus = (field) => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field) => {
    setIsFocused({ ...isFocused, [field]: false });
  };

  const validateSerialNumber = (text) => {
    setSerialNumber(text);
    if (text.trim().length > 0) {
      if (text === '001') { // Número de serie de ejemplo
        setIsSerialValid(true);
      } else {
        setIsSerialValid(false);
      }
    } else {
      setIsSerialValid(false);
    }
  };

  const handleSignup = async () => {
    if (!nombre || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (!isSerialValid) {
      Alert.alert('Error', 'Número de serie inválido');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.70:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert(
          'Registro Completo',
          'Te has registrado exitosamente.',
          [{ text: 'OK', onPress: () => setScreen('usuario') }],
          { cancelable: false }
        );
      } else {
        Alert.alert('Error', data.message || 'Hubo un problema con el registro.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Error', 'Hubo un problema con la conexión. Por favor intenta nuevamente.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Registro</Text>

        <Text style={styles.textInput}>Nombre</Text>
        <TextInput
          style={[styles.input, isFocused.nombre && styles.inputFocused]}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
          placeholderTextColor="#D2D2D2"
          onFocus={() => handleFocus('nombre')}
          onBlur={() => handleBlur('nombre')}
        />

        <Text style={styles.textInput}>Correo</Text>
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
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#D2D2D2"
          onFocus={() => handleFocus('password')}
          onBlur={() => handleBlur('password')}
        />

        <Text style={styles.textInput}>Confirmar contraseña</Text>
        <TextInput
          style={[styles.input, isFocused.confirmPassword && styles.inputFocused]}
          placeholder="Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor="#D2D2D2"
          onFocus={() => handleFocus('confirmPassword')}
          onBlur={() => handleBlur('confirmPassword')}
        />

        <Text style={styles.textInput}>Serial</Text>
        <TextInput
          style={[styles.input, isFocused.serialNumber && styles.inputFocused]}
          placeholder="Número de Serie"
          placeholderTextColor="#D2D2D2"
          value={serialNumber}
          onChangeText={validateSerialNumber}
          keyboardType="numeric"
          onFocus={() => handleFocus('serialNumber')}
          onBlur={() => handleBlur('serialNumber')}
        />

        {isSerialValid && (
          <View style={styles.successContainer}>
            <FontAwesome name="check" size={24} color="green" />
            <Text style={styles.successMessage}>Número de serie válido.</Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Pressable onPress={() => setScreen('login')}>
            <Text style={styles.txtBtnContainer}>Volver al Inicio de Sesión</Text>
          </Pressable>
          <Pressable onPress={handleSignup} style={styles.btn}>
            <Text style={styles.btnText}>Continuar</Text>
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
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 60,
    marginTop: 10,
  },
  successMessage: {
    fontSize: 16,
    color: 'green',
    marginLeft: 10,
  },
});

export default Register;
