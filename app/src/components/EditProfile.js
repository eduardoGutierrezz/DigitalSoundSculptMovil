import React, { useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, Animated, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TextInput, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';

const paises = [
  { label: "Argentina", value: "Argentina" },
  { label: "Australia", value: "Australia" },
  { label: "Austria", value: "Austria" },
  { label: "Bélgica", value: "Belgium" },
  { label: "Brasil", value: "Brazil" },
  { label: "Canadá", value: "Canada" },
  { label: "Chile", value: "Chile" },
  { label: "China", value: "China" },
  { label: "Colombia", value: "Colombia" },
  { label: "Dinamarca", value: "Denmark" },
  { label: "Finlandia", value: "Finland" },
  { label: "Francia", value: "France" },
  { label: "Alemania", value: "Germany" },
  { label: "Grecia", value: "Greece" },
  { label: "Hong Kong", value: "Hong Kong" },
  { label: "Hungría", value: "Hungary" },
  { label: "India", value: "India" },
  { label: "Indonesia", value: "Indonesia" },
  { label: "Irlanda", value: "Ireland" },
  { label: "Israel", value: "Israel" },
  { label: "Italia", value: "Italy" },
  { label: "Japón", value: "Japan" },
  { label: "México", value: "Mexico" },
  { label: "Nigeria", value: "Nigeria" },
  { label: "Noruega", value: "Norway" },
  { label: "Perú", value: "Peru" },
  { label: "Filipinas", value: "Philippines" },
  { label: "Polonia", value: "Poland" },
  { label: "Portugal", value: "Portugal" },
  { label: "Rumania", value: "Romania" },
  { label: "Rusia", value: "Russia" },
  { label: "Singapur", value: "Singapore" },
  { label: "Sudáfrica", value: "South Africa" },
  { label: "Corea del Sur", value: "South Korea" },
  { label: "España", value: "Spain" },
  { label: "Suecia", value: "Sweden" },
  { label: "Suiza", value: "Switzerland" },
  { label: "Tailandia", value: "Thailand" },
  { label: "Turquía", value: "Turkey" },
  { label: "Reino Unido", value: "United Kingdom" },
  { label: "Estados Unidos", value: "United States" },
  { label: "Vietnam", value: "Vietnam" },
];

const generos = [
  
  { label: "Ambient", value: "ambient" },
  { label: "Blues", value: "blues" },
  { label: "Classical", value: "classical" },
  { label: "Country", value: "country" },
  { label: "Disco", value: "disco" },
  { label: "Electrónica", value: "electronic" },
  { label: "Folk", value: "folk" },
  { label: "Hip Hop", value: "hipHop" },
  { label: "Jazz", value: "jazz" },
  { label: "Ritmos latinos", value: "ritmosLatinos" },
  { label: "Metal", value: "metal" },
  { label: "Pop", value: "pop" },
  { label: "Punk", value: "punk" },
  { label: "Reggae", value: "reggae" },
  { label: "Rock", value: "rock" },
  { label: "Soul", value: "soul" },
  { label: "Urbano", value: "urbano" },
];

const EditProfile = ({ setScreen, userInfo }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-250)).current;

  const [nombre, setNombre] = useState(userInfo?.nombre || '');
  const [email, setEmail] = useState(userInfo?.email || '');
  const [selectedCountry, setSelectedCountry] = useState(userInfo?.country || '');
  const [selectedGenre, setSelectedGenre] = useState(userInfo?.genre || '');
  const [date, setDate] = useState(userInfo?.dateOfBirth ? new Date(userInfo.dateOfBirth) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isFocused, setIsFocused] = useState({
    nombre: false,
    email: false,
    pais: false,
    genero: false,
    fecha: false,
  });

  const handleFocus = (field) => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field) => {
    setIsFocused({ ...isFocused, [field]: false });
  };

  const toggleSidebar = () => {
    if (isSidebarVisible) {
      Animated.timing(slideAnim, {
        toValue: -250,
        duration: 600,
        useNativeDriver: true,
      }).start(() => setSidebarVisible(false));
    } else {
      setSidebarVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleUpdate = () => {
    // Update the user's profile information
    const updatedInfo = { nombre, email, selectedCountry, selectedGenre, date };
    // Call your update API or handle the data as needed
    Alert.alert('Profile Updated', 'Your profile information has been updated.');
    setScreen('perfil');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Información Personal</Text>

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
              <Pressable onPress={() => setScreen('EditProfile')} style={styles.sidebarItem}>
                <Text style={styles.sidebarItemText}>Editar perfil</Text>
              </Pressable>
              <Pressable onPress={() => setScreen('Login')} style={styles.sidebarItem}>
                <Text style={styles.sidebarItemText}>Cerrar sesión</Text>
              </Pressable>
            </Animated.View>
          </TouchableOpacity>
        </Modal>


  <View style={styles.campo}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={[styles.input, isFocused.nombre && styles.inputFocused]}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
          placeholderTextColor="#D2D2D2"
          onFocus={() => handleFocus('nombre')}
          onBlur={() => handleBlur('nombre')}
        />
  </View>

<View style={styles.campo}>
<Text style={styles.label}>Correo</Text>
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
           </View>

        <View style={styles.campo}>
          <Text style={styles.label}>País de origen</Text>
          <Dropdown
            data={paises}
            labelField="label"
            valueField="value"
            placeholder="Selecciona un país"
            value={selectedCountry}
            onChange={(item) => setSelectedCountry(item.value)}
            style={[styles.dropdown, isFocused.pais && styles.focusedDropdown]}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={styles.placeholderStyle}
            onFocus={() => handleFocus('pais')}
            onBlur={() => handleBlur('pais')}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Género musical</Text>
          <Dropdown
            data={generos}
            labelField="label"
            valueField="value"
            placeholder="Selecciona un género"
            value={selectedGenre}
            onChange={(item) => setSelectedGenre(item.value)}
            style={[styles.dropdown, isFocused.genero && styles.focusedDropdown]}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={styles.placeholderStyle}
            onFocus={() => handleFocus('genero')}
            onBlur={() => handleBlur('genero')}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Fecha de nacimiento</Text>
          <Pressable onPress={() => setShowDatePicker(true)} style={styles.focusedDateText}>
            <Text style={[styles.dateText, isFocused.fecha]}>{date.toLocaleDateString()}</Text>
          </Pressable>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date;
                setShowDatePicker(false);
                setDate(currentDate);
              }}
            />
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Pressable onPress={() => setScreen('home')}>
            <Text style={styles.txtBtnContainer}>Volver</Text>
          </Pressable>
          <Pressable onPress={handleUpdate} style={styles.btn}>
            <Text style={styles.btnText}>Actualizar</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: '#FAF5F1',
   },
   title: {
     fontWeight: 'bold',
     marginLeft:65,
     fontSize: 22,
     marginTop:130,
     marginBottom:5,
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
  sidebarItemText:{
    fontSize: 16,
    color: '#1663B6',
  },
  profileInfo:{
    marginTop: 20,
    marginLeft: 50,
    
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
  },
  buttonContainer: {
    alignItems:'center',
    padding:10,
  },
   campo: {
    width: '70%',
    alignSelf: 'center',
    marginTop: 10,
  },
  
label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666464',
  },
   textInput: {
     marginTop: 10,
     fontSize: 16,
     padding: 10,
     marginLeft:55,
   },
   input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
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
   dropdown: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor:'white'
  },
  selectedTextStyle: {
    fontSize: 16,
  
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#aaa',
  },

  focusedDropdown: {
    borderColor: '#FF7B32',
    borderWidth: 2,
  },
 
  dateText: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: '#666464',
    backgroundColor: 'white',
  },
  fechaContenedor: {
    alignItems: 'center', 
  },
  buttonContainer: {
    alignItems:'center',
    padding:10,
  },

  txtBtnContainer:{
    padding:10,
    fontSize: 16,
    color: '#1663B6',
  },

  btn: {
    backgroundColor: '#1663B6', //#FF7B32
    padding: 10,
    borderRadius: 10,
    paddingHorizontal:30,
    marginTop:10
  },
  btnText: {
    padding: 2,
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
