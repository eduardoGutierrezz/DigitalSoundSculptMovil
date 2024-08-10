import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Pressable, Alert } from 'react-native';
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

const Usuario = ({ setScreen }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [isFocused, setIsFocused] = useState({
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

  const handleUsuario = () => {
    if (!selectedCountry || !selectedGenre || !date) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    Alert.alert(
      'Confirmación',
      '¿Estás seguro de que deseas finalizar el registro?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            Alert.alert(
              'Registro Completo',
              'Te has registrado exitosamente.',
              [{ text: 'OK', onPress: () => setScreen('login') }],
              { cancelable: false }
            );
          },
        },
      ],
      { cancelable: false }
    );
  };


  return (
   
        <View style={styles.container}animationType='card'>
          <Text style={styles.title}>Información</Text>

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
        <Pressable onPress={() => setShowDatePicker(true)}style={styles.focusedDateText}>
          <Text style={[styles.dateText, isFocused.fecha]}>
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
              setShowDatePicker(Platform.OS === 'ios');
              setDate(currentDate);
            }}
          />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Pressable onPress={() => setScreen('login')}>
          <Text style={styles.txtBtnContainer}>Volver al Inicio de Sesión</Text>
        </Pressable>
        <Pressable onPress={handleUsuario} style={styles.btn}>
          <Text style={styles.btnText}>Finalizar registro</Text>
        </Pressable>
     </View>

        </View>

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
  dropdown: {
    height: 50,
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
    color: '#000',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: '#666464',
   backgroundColor:'white'
  },
  fechaContenedor: {
    alignItems: 'center', 
  },
  buttonContainer: {
    alignItems:'center',
  },

  txtBtnContainer:{
    padding:20,
    fontSize: 13,
    color: '#1663B6',
  },

  btn: {
    backgroundColor: '#1663B6', //#FF7B32
    padding: 10,
    borderRadius: 10,
  },
  btnText: {
    padding: 2,
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },


});

export default Usuario;
