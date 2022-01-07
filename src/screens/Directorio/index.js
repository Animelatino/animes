import React from 'react';
import { ScrollView, Text, Dimensions, StyleSheet } from 'react-native';
import ItemDirectorio from './ItemDirectorio';
import { useTheme } from '@react-navigation/native';

function Index(props) {
    const { navigation } = props;
    const { space } = useTheme();
    return (
        <ScrollView
            contentContainerStyle={[
                styles.container,
                { paddingVertical: space.xxs },
            ]}
        >
            <ItemDirectorio
                title="Animes"
                subtitle="Lista"
                backgroundColor={'rgb(25,60,85)'}
                image={require('../../../assets/images/otaku.png')}
                onPress={() =>
                    navigation.push('Animes', {
                        type: 'list',
                        title: 'Animes',
                        subtitle: 'Lista',
                        query: { type: 'tv' },
                    })
                }
            />
            <ItemDirectorio
                title="Películas"
                subtitle="Lista"
                backgroundColor={'rgb(90,125,90)'}
                image={require('../../../assets/images/movie-reel.png')}
                onPress={() =>
                    navigation.push('Animes', {
                        type: 'list',
                        title: 'Películas',
                        subtitle: 'Lista',
                        query: { type: 'movie' },
                    })
                }
            />
            <ItemDirectorio
                title="Populares"
                subtitle="Todos"
                backgroundColor={'rgb(200,125,10)'}
                image={require('../../../assets/images/podium.png')}
                onPress={() =>
                    navigation.push('Animes', {
                        type: 'trending',
                        title: 'Animes y Películas',
                        subtitle: 'Más populares',
                    })
                }
            />
            <ItemDirectorio
                title="Recientes"
                subtitle="Lista"
                backgroundColor={'rgb(50,160,50)'}
                image={require('../../../assets/images/plus.png')}
                onPress={() =>
                    navigation.push('Animes', {
                        type: 'list',
                        title: 'Animes y Películas',
                        subtitle: 'Añadidos recientemente',
                    })
                }
            />
            <ItemDirectorio
                title="Más Vistos"
                subtitle="Todos"
                backgroundColor={'rgb(160,50,160)'}
                image={require('../../../assets/images/views.png')}
                onPress={() =>
                    navigation.push('Animes', {
                        type: 'more-view',
                        title: 'Animes y Películas',
                        subtitle: 'Más vistos',
                    })
                }
            />
            <ItemDirectorio
                title="Animes"
                subtitle="Español Latino"
                backgroundColor={'rgb(70,70,150)'}
                image={require('../../../assets/images/mexico.png')}
                onPress={() =>
                    navigation.push('Animes', {
                        type: 'latino',
                        title: 'Animes y Películas',
                        subtitle: 'Español latino',
                    })
                }
            />
            <ItemDirectorio
                title="Genero"
                subtitle="Artes Marciales"
                backgroundColor={'rgb(150,70,70)'}
                image={require('../../../assets/images/artes-marciales.png')}
                onPress={() =>
                    navigation.push('Animes', {
                        type: 'list',
                        query: {
                            genre: 'artes-marciales',
                        },
                        title: 'Genero',
                        genre: 'Artes marciales',
                    })
                }
            />
            <ItemDirectorio
                title="Genero"
                subtitle="Romance"
                backgroundColor={'rgb(200,20,20)'}
                image={require('../../../assets/images/love.png')}
                onPress={() =>
                    navigation.push('Animes', {
                        type: 'list',
                        query: {
                            genre: 'romance',
                        },
                        title: 'Genero',
                        genre: 'romance',
                    })
                }
            />
        </ScrollView>
    );
}

export default Index;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});
