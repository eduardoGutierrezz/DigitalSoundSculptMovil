import React, { useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, Animated, TouchableOpacity, TextInput, Button, Switch, Alert, Image } from 'react-native';
import axios from 'axios';
import logo3 from '../../../assets/images/Aiudaaaa.jpg';

//Ejecutar el programa con npx expo start y en otra terminal node server.js

export default function HomeScreen({ setScreen }) {
  const [ip, setIp] = useState('');
  const [connected, setConnected] = useState(false);
  const [presets, setPresets] = useState({
    preset1: false,
    preset2: false,
    preset3: false,
    preset4: false,
    preset5: false,
  });
  const [selectedPreset, setSelectedPreset] = useState('');
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-250)).current; // Valor inicial fuera de la pantalla

  const connectDevice = () => {
    if (ip) {
      setConnected(true);
      Alert.alert("Conectado", `Conectado al dispositivo con IP ${ip}`);
    } else {
      Alert.alert("Error", "Por favor, ingrese una IP válida.");
    }
  };

  const disconnectDevice = () => {
    setConnected(false);
    Alert.alert("Desconectado", "Se ha desconectado del dispositivo");
  };

  const togglePreset = (presetName) => {
    if (connected) {
      axios.get(`http://${ip}/?preset=${presetName.slice(-1)}`)
        .then(response => {
          setPresets(prevPresets => ({
            ...prevPresets,
            [presetName]: !prevPresets[presetName],
          }));
          Alert.alert(`Preset ${presetName}`, `Se ha cambiado el preset ${presetName}`);
        })
        .catch(error => {
          console.error(error);
          Alert.alert("Error", "No se pudo enviar el comando al ESP32");
        });
    } else {
      Alert.alert("Error", "No estás conectado al ESP32");
    }
  };

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

  const handleAction = () => {
    if (selectedPreset) {
      // Aquí puedes agregar la lógica para activar el preset seleccionado
      console.log(`Activando ${selectedPreset}`);
    }
  };

  const dropdownData = Object.keys(presets).map(preset => ({
    label: preset.charAt(0).toUpperCase() + preset.slice(1),
    value: preset,
  }));

  return (
    <View style={styles.container}>
      <Image source={logo3} style={styles.backgroundImage} />
      <Text style={styles.title}>Bienvenido a DSS</Text>

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

      <View style={styles.inputContainer}>
        <Text style={styles.label}>IP Equipo:</Text>
        <TextInput
          style={[styles.input, styles.inputFocused]}
          placeholder="Ingrese la IP del equipo"
          value={ip}
          onChangeText={setIp}
        />
        <Button style={styles.btn} title="Conectar Equipo" onPress={connectDevice} disabled={connected} />
        <Button title="Desconectar Equipo" onPress={disconnectDevice} disabled={!connected} />
      </View>

      {Object.keys(presets).map((preset) => (
        <View key={preset} style={styles.switchContainer}>
          <Text>{preset.toUpperCase()}</Text>
          <Switch
            onValueChange={() => togglePreset(preset)}
            value={presets[preset]}
          />
        </View>
      ))}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#EBEAF0',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject, // Esto hace que la imagen cubra todo el contenedor
    resizeMode: 'cover', // Ajusta el tamaño de la imagen para cubrir todo el contenedor
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 20,
    color: '#666464',
    textAlign: 'center',
  },
  inputContainer: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 30,
    color: '#666464',
    
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666464',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: 'white',
    borderColor: '#ccc',
  },
  inputFocused: {
    borderColor: '#FF7B32',
    borderWidth: 2,
  },
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
  },
  selectedTextStyle: {
    color: '#666464',
  },
  placeholderStyle: {
    color: '#666464',
  },
  btn: {
    backgroundColor: '#1663B6',
    padding: 10,
    marginTop: 20,
    marginHorizontal: 60,
    borderRadius: 10,
  },
  btnText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    
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
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
