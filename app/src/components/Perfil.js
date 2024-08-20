import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, Animated, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import logo3 from '../../../assets/images/Aiudaaaa.jpg';

const Perfil = ({ setScreen }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const slideAnim = useRef(new Animated.Value(-250)).current; // Valor inicial fuera de la pantalla

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken'); // Obtener el token almacenado
        
        if (token) {
          const response = await axios.get('http://192.168.0.192:3000/api/profile', {//Cambiar la ruta segun la conexion de internet, entrar a CMD y poner ipConfig para conocer la ruta correcta.
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          // Verificar y ajustar la estructura de los datos según la respuesta
          console.log(response.data); // Verificar datos
          if (response.data) {
            setUserInfo(response.data);
          } else {
            console.warn('Datos del perfil no encontrados.');
          }
        } else {
          console.warn('No se encontró el token.');
        }
      } catch (error) {
        console.error('Error al obtener la información del perfil:', error);
      }
    };

    fetchProfile();
  }, []);

  const toggleSidebar = () => {
    if (isSidebarVisible) {
      Animated.timing(slideAnim, {
        toValue: -250, // Deslizar hacia afuera
        duration: 600,
        useNativeDriver: true,
      }).start(() => setSidebarVisible(false)); // Ocultar el sidebar después de la animación
    } else {
      setSidebarVisible(true); // Mostrar el sidebar
      Animated.timing(slideAnim, {
        toValue: 0, // Deslizar hacia adentro
        duration: 600,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo3} style={styles.backgroundImage} />
      <Pressable onPress={toggleSidebar} style={styles.sidebarButton}>
        <Text style={styles.sidebarButtonText}>☰</Text>
      </Pressable>

      <Modal visible={isSidebarVisible} transparent={true} animationType="none">
        <TouchableOpacity style={styles.overlay} onPress={toggleSidebar}>
          <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
            <Text style={styles.sidebarTitle}>Perfil</Text>
            <Pressable onPress={() => setScreen('perfil')} style={styles.sidebarItem}>
              <Text style={styles.sidebarItemText}>Ver perfil</Text>
            </Pressable>
            <Pressable onPress={() => setScreen('edit')} style={styles.sidebarItem}>
              <Text style={styles.sidebarItemText}>Editar perfil</Text>
            </Pressable>
            <Pressable onPress={() => setScreen('Login')} style={styles.sidebarItem}>
              <Text style={styles.sidebarItemText}>Cerrar sesión</Text>
            </Pressable>
          </Animated.View>
        </TouchableOpacity>
      </Modal>

      <Text style={styles.title}>Información Personal</Text>

      <View style={styles.profileInfo}>
        <Text style={styles.infoTitle}>Nombre:</Text>
        <Text style={styles.infoText}>{userInfo?.name || 'No disponible'}</Text>
        <Text style={styles.infoTitle}>Email:</Text>
        <Text style={styles.infoText}>{userInfo?.email || 'No disponible'}</Text>
        <Text style={styles.infoTitle}>País:</Text>
        <Text style={styles.infoText}>{userInfo?.location || 'No disponible'}</Text>
        <Text style={styles.infoTitle}>Género musical:</Text>
        <Text style={styles.infoText}>{userInfo?.generoMusical || 'No disponible'}</Text>
        <Text style={styles.infoTitle}>Fecha de Nacimiento:</Text>
        <Text style={styles.infoText}>{userInfo?.birthdate || 'No disponible'}</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => setScreen('home')}>
          <Text style={styles.txtBtnContainer}>Volver</Text>
        </Pressable>
        <Pressable onPress={() => setScreen('edit')} style={styles.btn}>
          <Text style={styles.btnText}>Actualizar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FAF5F1',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject, // Esto hace que la imagen cubra todo el contenedor
    resizeMode: 'cover', // Ajusta el tamaño de la imagen para cubrir todo el contenedor
  },
  title: {
    fontWeight: 'bold',
    marginLeft: 60,
    fontSize: 22,
    marginTop: 50,
    marginBottom: 20,
    color: '#666464',
  },
  sidebarButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#FAF5F1',
    borderRadius: 5,
    padding: 10,
  },
  sidebarButtonText: {
    color: '#666464',
    fontSize: 24,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    backgroundColor: '#FFF',
    width: 250,
    height: '100%',
    padding: 20,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  sidebarTitle: {
    paddingTop: 80,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sidebarItem: {
    marginBottom: 20,
  },
  sidebarItemText: {
    fontSize: 16,
    color: '#1663B6',
  },
  profileInfo: {
    marginLeft: 60,
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    marginTop: 5,
    color: '#666464',
  },
  infoText: {
    color: '#666464',
    paddingVertical: 10,
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: 'center',
    padding: 10,
  },
  txtBtnContainer: {
    padding: 10,
    fontSize: 16,
    color: '#1663B6',
  },
  btn: {
    backgroundColor: '#1663B6', //#FF7B32
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  btnText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Perfil;
