import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, TouchableWithoutFeedback, Keyboard,Alert } from 'react-native';

const RecuperarContrasena = ({ setScreen }) => {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState({
    email: false,
  });

  
  const handleRecuperar = async () => {
    if (!email) {
      Alert.alert('Error', 'Por favor ingresa tu correo electrónico');
      return;
    }

    // Aquí iría el código para enviar la solicitud de recuperación de contraseña

    Alert.alert('Solicitud enviada', 'Se ha enviado un correo para recuperar tu contraseña');
    setScreen('login'); // Redirige al usuario después de enviar la solicitud
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
        <Text style={styles.title}>Recuperación de contraseña</Text>
        <Text style={styles.textInput}>Escribe tu correo</Text>
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
    
    <View style={styles.buttonContainer}>
    <Pressable onPress={() => setScreen('login')}>
            <Text style={styles.txtBtnContainer}>Volver al Inicio de Sesión</Text>
          </Pressable>
          <Pressable onPress={handleRecuperar} style={styles.btn}>
          <Text style={styles.btnText}>Enviar solicitud</Text>
        </Pressable>
     
          </View>
        </View>
    </TouchableWithoutFeedback>
  );
};

export default RecuperarContrasena;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FAF5F1',
  },
  title: {
    fontWeight: 'bold',
    marginLeft:60,
    fontSize: 22,
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
    paddingHorizontal: 20,
    padding:5,
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
    fontSize: 14,
    marginLeft:55,
  },
});
