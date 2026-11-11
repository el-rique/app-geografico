import React, { useEffect, useState } from 'react';
import { View, Text, Modal, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import dadosGeo from '../data/Dados';
import Icon from 'react-native-vector-icons/FontAwesome5';
import haversine from 'haversine';
import { getFeatureCoordinate } from '../utils/coordinates';

const Areas = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [area, setArea] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    //pegar os dados do GeoJSON
    requestLocation();
    setArea(dadosGeo.features);
  }, []);
  
  const requestLocation = async () => {
    //permissão para pegar geolocalização do usuário
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    } catch (error) {
      console.error('Error getting current location:', error);
      setErrorMsg('Error getting current location');
    }
  };
//função para atribuir evento ao clicar em algum ponto marcado no mapa
  const handleMarkerPress = (point) => {
    setSelectedPoint(point);
    calculateDistance(point);
    setModalVisible(true);
  };
//função para calcular a distância da localização do usuário até o ponto escolhido
  const calculateDistance = (point) => {
    if (location && point) {
      const userCoordinates = {
        latitude: location.latitude,
        longitude: location.longitude,
      };

      const pointCoordinates = getFeatureCoordinate(point);
      if (!pointCoordinates) {
        setDistance(null);
        return;
      }

      const distance = haversine(userCoordinates, pointCoordinates, { unit: 'km' });
      setDistance(distance);
    }
  };
//Função para direcionar ao google maps, já com o destino selecionado
  const openGoogleMaps = () => {
    const coordinates = getFeatureCoordinate(selectedPoint);
    if (coordinates) {
      const { latitude, longitude } = coordinates;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

      Linking.openURL(url);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: location ? location.latitude : 0,
          longitude: location ? location.longitude : 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          >
            <Icon name="walking" size={35} color="green"/>
          </Marker>
        )}
        {area.map((feature) => {
          const coordinate = getFeatureCoordinate(feature);
          if (!coordinate) return null;

          return (
            <Marker
              key={feature.properties.cdid}
              coordinate={coordinate}
              onPress={() => handleMarkerPress(feature)}
            />
          );
        })}
      </MapView>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalContent}>
          <Text style={styles.text}>{selectedPoint && selectedPoint.properties.cdzona_nom}</Text>
          {distance !== null && <Text style={styles.text}>Distância: {distance.toFixed(2)} km</Text>}
          <View style={styles.botaoContainer}>
            {selectedPoint && (
              <TouchableOpacity
                style={styles.botao}
                onPress={openGoogleMaps}
              >
                <Text style={styles.botaoTexto}>Abrir no Google Maps</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.botao}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.botaoTexto}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "#F8F8FF",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 2,
  },
  text: {
    fontSize: 17,
    color: "brown",
    marginBottom: 10,
  },
  botaoContainer: {
    marginTop: 20,
    gap: 10,
  },
  botao: {
    backgroundColor: 'green',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  botaoTexto: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Areas;