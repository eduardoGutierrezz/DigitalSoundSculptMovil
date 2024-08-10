import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, Pressable, Image, View } from 'react-native';
import Login from './src/components/Login';
import Register from './src/components/Register';
import Usuario from './src/components/Usuario';
import Home from './src/components/Home';
import Perfil from './src/components/Perfil';
import EditProfile from './src/components/EditProfile';
import RecuperarContrasena from './src/components/RecuperarContrasena';

const Index = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [screen, setScreen] = useState('welcome'); // Estado para controlar la pantalla visible

  const renderScreen = () => {
    switch (screen) {
      case 'login':
        return <Login setModalVisible={setModalVisible} setScreen={setScreen} />;
      case 'register':
        return <Register setScreen={setScreen} />;
      case 'usuario':
        return <Usuario setScreen={setScreen} />;
      case 'home':
        return <Home setScreen={setScreen} />;
        case 'perfil':
        return <Perfil setScreen={setScreen} />;
        case 'edit':
          return <EditProfile setScreen={setScreen} />;
          case 'recuperacion':
            return <RecuperarContrasena setScreen={setScreen} />;
      
      default:
        return (
          <SafeAreaView style={styles.container}>
            <Image source={'../assets/images/minilogo-sNegro.png'} style={styles.logo} />
            <Text style={styles.titulo}>Bienvenido</Text>
            <Pressable onPress={() => setScreen('login')} style={styles.btnComenzar}>
              <Text style={styles.btnTextoComenzar}>Comenzar</Text>
            </Pressable>
          </SafeAreaView>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',

  },
  logo: {
    width: 150, // Ancho de la imagen
    height: 150, // Alto de la imagen
    marginBottom: 20, // Margen inferior para separar del título
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#FFF',
    fontWeight: 'bold',
  },
  btnComenzar: {
    backgroundColor: '#1663B6', //#FF7B32
    padding: 10,
    marginTop: 20,
    marginHorizontal: 100,
    borderRadius: 10,
  },
  btnTextoComenzar: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default Index;
