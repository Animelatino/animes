import React, { useEffect, useState, useCallback } from 'react';
import Constants from 'expo-constants';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { api } from '../../db/api';
import Section from '../../components/Section';
import Listing from '../../components/Listing';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
import GenreItem from './GenreItem';
import AnimeItem from './AnimeItem';
import AnimePopularItem from './AnimePopularItem';
import EpisodeItem from './EpisodeItem';
import genres from '../../db/geners.json';
import { useStore } from '../../store/StoreProvider';

export default () => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);
    const [fetching, setFecthing] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { config } = useStore();

    async function getDataHome() {
        try {
            const dataJson = await api.get('app/home');
            setData(dataJson.data);
            setFecthing(false);
        } catch (error) {
            setFecthing(false);
            if (error.response) {
                if (error.response.status != 200) {
                    setError('Sin acceso a los servidores.');
                }
            } else {
                setError('Hubo un error inesperado.');
            }
        }
    }

    useEffect(() => {
        setFecthing(true);
        getDataHome();
        return () => {
            setData();
            setError(null);
            setFecthing(true);
        };
    }, []);

    const wait = (timeout) => {
        return new Promise((resolve) => setTimeout(resolve, timeout));
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getDataHome();
        wait(500).then(() => {
            setRefreshing(false);
        });
    }, []);

    function onReload() {
        setFecthing(true);
        setError(null);
        getDataHome();
    }

    if (error) {
        return <ErrorMessage message={error} onReload={onReload} />;
    }

    if (fetching && !data) {
        return <Loader />;
    } else {
        return (
            <ScrollView
                contentContainerStyle={styles.containter}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {config?.videos && (
                    <Section>
                        <Listing
                            data={data?.episodes}
                            keyExtractor={(item) =>
                                `${item?.anime?.slug}-${item?.number}`
                            }
                            renderItem={(props) => <EpisodeItem {...props} />}
                        />
                    </Section>
                )}
                <Section title="Animes populares">
                    <Listing
                        data={data?.animeP}
                        keyExtractor={(item) => `popular-${item?.slug}`}
                        renderItem={(props) => (
                            <AnimeItem
                                width={200}
                                aspectRatio={1 / 1}
                                {...props}
                            />
                        )}
                    />
                </Section>
                <Section title="Animes nuevos">
                    <Listing
                        data={data?.animeN?.data}
                        keyExtractor={(item) => `new-${item?.slug}`}
                        renderItem={(props) => (
                            <AnimeItem width={130} {...props} />
                        )}
                    />
                </Section>
                <Section title="Más vistos">
                    <Listing
                        data={data?.animeV}
                        keyExtractor={(item) => `more_view-${item?.slug}`}
                        renderItem={(props) => <AnimeItem {...props} />}
                    />
                </Section>
                <Section title="Generos">
                    <Listing
                        data={Object.keys(genres)}
                        keyExtractor={(item) => `${item}`}
                        renderItem={(props) => <GenreItem {...props} />}
                    />
                </Section>
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    containter: {
        paddingVertical: 16,
    },
});
