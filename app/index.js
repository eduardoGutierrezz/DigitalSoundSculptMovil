import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, Pressable, Image, View } from 'react-native';
import Login from './src/components/Login';
import Register from './src/components/Register';
import Home from './src/components/Home';
import Perfil from './src/components/Perfil';
import EditProfile from './src/components/EditProfile';
import RecuperarContrasena from './src/components/RecuperarContrasena';

// Ruta correcta para la imagen
import logo from '../assets/images/digitalsoundsculptlogogrande.png';
import logo2 from '../assets/images/Fondogrislogin.jpg';

const Index = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [screen, setScreen] = useState('welcome'); // Estado para controlar la pantalla visible

  const renderScreen = () => {
    switch (screen) {
      case 'login':
        return <Login setModalVisible={setModalVisible} setScreen={setScreen} />;
      case 'register':
        return <Register setScreen={setScreen} />;
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
      <Image source={logo2} style={styles.backgroundImage} />
      <View style={styles.content}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.titulo}>Bienvenido</Text>
        <Pressable onPress={() => setScreen('login')} style={styles.btnComenzar}>
          <Text style={styles.btnTextoComenzar}>Comenzar</Text>
        </Pressable>
      </View>
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
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject, // Esto hace que la imagen cubra todo el contenedor
    resizeMode: 'cover', // Ajusta el tamaño de la imagen para cubrir todo el contenedor
  },
  logo2: {
    width: 50, // Ancho de la imagen
    height: 100,// Alto de la imagen
  
  },
  logo: {
    width: 230, // Ancho de la imagen
    height: 100, // Alto de la imagen
    marginBottom: 40, // Margen inferior para separar del título
    marginTop: 180,
    marginLeft:60,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#FFF',
    fontWeight: 'bold',
  },
  btnComenzar: {
    backgroundColor: '#1663B6', // #FF7B32
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
