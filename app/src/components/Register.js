import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Importa FontAwesome

const Register = ({ setScreen }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [serialNumber, setSerialNumber] = useState(''); // Nuevo estado para el número de serie
  const [isSerialValid, setIsSerialValid] = useState(false); // Nuevo estado para validación del número de serie

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

  const handleSignup = () => {
    if (!nombre || !email|| !serialNumber || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (!isSerialValid) { // Verifica la validez del número de serie
      Alert.alert('Error', 'Número de serie inválido');
      return;
    }

    Alert.alert(
      'Registro Completo',
      'Te has registrado exitosamente.',
      [{ text: 'OK', onPress: () => setScreen('usuario') }],
      { cancelable: false }
    );
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
          onChangeText={validateSerialNumber} // Validar automáticamente al cambiar el texto
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
    backgroundColor: '#FAF5F1',
  },
  title: {
    fontWeight: 'bold',
    marginLeft:60,
    fontSize: 22,
    marginTop:135,
    marginBottom:20,
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
    backgroundColor:'white'
  },

  inputFocused: {
    borderColor: '#FF7B32',
    borderWidth: 2,
  },
  link: {
    color: 'blue',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%', // Ajusta el ancho según sea necesario
  },
  btn: {
    backgroundColor: '#1663B6', //#FF7B32
    padding: 10,
    marginLeft:45,
    borderRadius: 10,
  },
  btnText: {
    padding: 2,
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  txtBtnContainer:{
    color: '#1663B6',
    fontSize: 13,
    marginLeft:55,
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft:60,
   
  },
  successMessage: {
    marginLeft:10,
    fontSize: 16,
    color: 'green',
  },
});

export default Register;
