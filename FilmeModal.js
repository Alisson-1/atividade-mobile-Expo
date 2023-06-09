import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';

const FilmeModal = ({ filme, onClose }) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (filme) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [filme, translateY]);

  const handleClose = () => {
    Animated.timing(translateY, {
      toValue: 1000,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  if (!filme) {
    return null;
  }

  return (
    <Animated.View style={[styles.modalContainer, { transform: [{ translateY }] }]}>
      <View style={styles.modalContent}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${filme.poster_path}` }} style={styles.poster} />
        <Text style={styles.title}>{filme.title}</Text>
        <Text style={styles.overview}>{filme.overview}</Text>
        <TouchableOpacity style={styles.button} onPress={handleClose}>
          <Text style={styles.buttonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    maxWidth: '90%',
  },
  poster: {
    width: 150,
    height: 225,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  overview: {
    fontSize: 14,
    marginBottom: 10,
    color: '#FFFFFF',
    textAlign: 'center',
    maxWidth: '100%',
  },
  button: {
    backgroundColor: '#333333',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default FilmeModal;
