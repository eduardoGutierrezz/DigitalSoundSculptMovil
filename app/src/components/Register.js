import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, TouchableWithoutFeedback, Keyboard, Alert, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';

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
  { label: "Ambient", value: "Ambient" },
  { label: "Blues", value: "Blues" },
  { label: "Classical", value: "Classical" },
  { label: "Country", value: "Country" },
  { label: "Disco", value: "Disco" },
  { label: "Electrónica", value: "Electronic" },
  { label: "Folk", value: "Folk" },
  { label: "Hip Hop", value: "HipHop" },
  { label: "Jazz", value: "Jazz" },
  { label: "Ritmos latinos", value: "RitmosLatinos" },
  { label: "Metal", value: "Metal" },
  { label: "Pop", value: "Pop" },
  { label: "Punk", value: "Punk" },
  { label: "Reggae", value: "Reggae" },
  { label: "Rock", value: "Rock" },
  { label: "Soul", value: "Soul" },
  { label: "Urbano", value: "Urbano" },
];

const presets = [
  {label: "Preset 1", value: "Preset 1"},
  {label: "Preset 2", value: "Preset 2"},
  {label: "Preset 3", value: "Preset 3"},
  {label: "Preset 4", value: "Preset 4"},
  {label: "Preset 5", value: "Preset 5"},
];

const Register = ({ setScreen }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [isSerialValid, setIsSerialValid] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('');
  const [isFocused, setIsFocused] = useState({
    nombre: false,
    email: false,
    password: false,
    confirmPassword: false,
    serialNumber: false,
    pais: false,
    genero: false,
    fecha: false,
    preset: false,
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
    if (!nombre || !email || !password || !confirmPassword || !selectedCountry || !selectedGenre || !date || !selectedPreset) {
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
      const response = await fetch('http://192.168.0.192:3000/api/register', {//Cambiar la ruta segun la conexion de internet, entrar a CMD y poner ipConfig para conocer la ruta correcta.
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre,
          email: email,
          password: password,
          birthdate: date,
          location: selectedCountry,
          generoMusical: selectedGenre,
          preset: selectedPreset,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert(
          'Registro Completo',
          'Te has registrado exitosamente.',
          [{ text: 'OK', onPress: () => setScreen('home') }],
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
      <ScrollView contentContainerStyle={styles.container}>
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
          placeholder="Número de serie"
          value={serialNumber}
          onChangeText={validateSerialNumber}
          placeholderTextColor="#D2D2D2"
          onFocus={() => handleFocus('serialNumber')}
          onBlur={() => handleBlur('serialNumber')}
        />
        {serialNumber.length > 0 && (
          <Text style={isSerialValid ? styles.validText : styles.invalidText}>
            {isSerialValid ? 'Número de serie válido' : 'Número de serie inválido'}
          </Text>
        )}

        <Text style={styles.textInput}>País</Text>
        <Dropdown
          style={[styles.dropdown, isFocused.pais && styles.inputFocused]}
          data={paises}
          labelField="label"
          valueField="value"
          placeholder={!isFocused.pais ? "Selecciona un país" : "..."}
          value={selectedCountry}
          onFocus={() => handleFocus('pais')}
          onBlur={() => handleBlur('pais')}
          onChange={item => setSelectedCountry(item.value)}
        />

        <Text style={styles.textInput}>Género Musical</Text>
        <Dropdown
          style={[styles.dropdown, isFocused.genero && styles.inputFocused]}
          data={generos}
          labelField="label"
          valueField="value"
          placeholder={!isFocused.genero ? "Selecciona un género" : "..."}
          value={selectedGenre}
          onFocus={() => handleFocus('genero')}
          onBlur={() => handleBlur('genero')}
          onChange={item => setSelectedGenre(item.value)}
        />

        <View style={styles.campo}>
          <Text style={styles.label}>Fecha de nacimiento</Text>
          <Pressable onPress={() => setShowDatePicker(true)} style={styles.focusedDateText}>
            <Text style={[styles.dateText, isFocused.fecha && styles.inputFocused]}>
              {date.toLocaleDateString()}
            </Text>
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

      <Text style={styles.textInput}>Preset</Text>
        <Dropdown
          style={[styles.dropdown, isFocused.preset && styles.inputFocused]}
          data={presets}
          labelField="label"
          valueField="value"
          placeholder={!isFocused.preset ? "Selecciona un preset" : "..."}
          value={selectedPreset}
          onFocus={() => handleFocus('preset')}
          onBlur={() => handleBlur('preset')}
          onChange={item => setSelectedPreset(item.value)}
        />

        <Pressable style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Registrar</Text>
          <FontAwesome name="arrow-right" size={20} color="white" />
        </Pressable>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FAF5F1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666464',
    marginBottom: 20,
  },
  textInput: {
    alignSelf: 'flex-start',
    color: '#666464',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    color: 'black',
    borderColor: '#ccc',
    backgroundColor: 'white'
  },
  inputFocused: {
    borderColor: '#FF7B32',
    borderWidth: 2,
  },
  dropdown: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    color: '#D2D2D2',
    backgroundColor: 'white'
  },
  validText: {
    color: '#25A24B',
    fontWeight: 'bold',
    marginBottom: 10,
    borderColor: '#ccc'
  },
  invalidText: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#1663B6',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  campo: {
    marginTop: 10,   
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    color: '#D2D2D2',
    backgroundColor: 'white'
  },
});

export default Register;
