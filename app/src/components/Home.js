import React, { useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, Animated, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const presets = [
    { label: "Preset 1", value: "preset1" },
    { label: "Preset 2", value: "preset2" },
    { label: "Preset 3", value: "preset3" },
    { label: "Preset 4", value: "preset4" },
  ];

const HomeScreen = ({ setScreen }) => {

    const [selectedPreset, setSelectedPreset] = useState('');
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-250)).current; // Valor inicial fuera de la pantalla

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido Madafaker</Text>

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

      <View style={styles.campo}>
        <Text style={styles.label}>Presets</Text>
        <Dropdown
          data={presets}
          labelField="label"
          valueField="value"
          placeholder="Selecciona un preset"
          value={selectedPreset}
          onChange={(item) => setSelectedPreset(item.value)}
          style={styles.dropdown}
          selectedTextStyle={styles.selectedTextStyle}
          placeholderStyle={styles.placeholderStyle}
        />
      </View>

      <Pressable onPress={handleAction} style={styles.btn}>
        <Text style={styles.btnText}>Activar preset</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FAF5F1',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 20,
    color: '#666464',
    textAlign: 'center',
  },
  campo: {
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
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor:'white'
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
    paddingTop:80,
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
});
