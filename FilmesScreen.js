import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import FilmeModal from './FilmeModal';

const FilmesScreen = () => {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilme, setSelectedFilme] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchFilmes();
  }, []);

  const fetchFilmes = async () => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/now_playing',
        {
          params: {
            api_key: 'ec006d4ad57ed8159618d8796ae1fb98',
            language: 'pt-BR',
            region: 'BR',
          },
        }
      );
      setFilmes(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const openModal = (filme) => {
    setSelectedFilme(filme);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedFilme(null);
    setModalVisible(false);
  };

  const renderCategoria = ({ item }) => (
    <View style={styles.categoriaContainer}>
      <Text style={styles.categoriaTitle}>{item.categoria}</Text>
      <FlatList
        data={item.filmes}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)}>
            <View style={styles.card}>
              <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.poster} />
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const categorias = [
    { id: 28, categoria: 'Ação' },
    { id: 35, categoria: 'Comédia' },
    { id: 18, categoria: 'Drama' },
    { id: 27, categoria: 'Terror' },
    { id: 10749, categoria: 'Romance' },
    { id: 878, categoria: 'Ficção Científica' },
  ];

  const categoriasFilmes = categorias.map((categoria) => {
    const filmesCategoria = filmes.filter((filme) => filme.genre_ids.includes(categoria.id));
    return {
      ...categoria,
      filmes: filmesCategoria,
    };
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={categoriasFilmes}
        renderItem={renderCategoria}
        keyExtractor={(item) => item.id.toString()}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <FilmeModal filme={selectedFilme} onClose={closeModal} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  categoriaContainer: {
    marginBottom: 20,
  },
  categoriaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    color: '#FFFFFF',
  },
  card: {
    marginRight: 10,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 300,
    elevation: 2,
  },
  poster: {
    width: 130,
    height: 195,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
});

export default FilmesScreen;
