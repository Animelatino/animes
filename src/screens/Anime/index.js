import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Animated, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { api } from '../../db/api';
import HeaderAnimated from '../../components/HeaderAnimated';
import Listing from '../../components/Listing';
import Loader from '../../components/Loader';
import Section from '../../components/Section';
import Banner from './Banner';
import GenreItem from './GenreItem';
import Information from './Information';
import Overview from './Overview';
import Points from './Points';
import RecommendationItem from './RecommendationItem';
import ErrorMessage from '../../components/ErrorMessage';
import { useStore } from '../../store/StoreProvider';
import ButtonsAction from './ButtonsAction';

export default (props) => {
    const offset = useRef(new Animated.Value(0)).current;

    const { slug } = props.route.params;
    const [data, setData] = useState();
    const [recommendations, setRecommendatios] = useState();
    const [error, setError] = useState(null);
    const [fetching, setFecthing] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { token, user } = useStore();

    async function getData() {
        try {
            let config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    user_id: user.id,
                },
            };
            const dataJson = await api.get(`anime/${slug}`, config);
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
        getData();
        return () => {
            setFecthing(true);
            setData();
            setRecommendatios();
            offset.setValue(0);
        };
    }, [slug]);

    const wait = (timeout) => {
        return new Promise((resolve) => setTimeout(resolve, timeout));
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getData();
        wait(500).then(() => {
            setRefreshing(false);
        });
    }, []);

    function onReload() {
        setFecthing(true);
        setError(null);
        getData();
    }

    if (error) {
        return <ErrorMessage message={error} onReload={onReload} />;
    }

    if (fetching) {
        return <Loader />;
    }

    if (!fetching && data) {
        return (
            <>
                <HeaderAnimated title={data?.name} animatedValue={offset} />
                <ScrollView
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: offset } } }],
                        { useNativeDriver: false }
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <Banner data={data} />
                    <Section isBorderBottom={true}>
                        <Overview data={data} />
                    </Section>
                    <Section isBorderBottom={true}>
                        <Points data={data} />
                    </Section>
                    <Section isBorderBottom={true} title="Información">
                        <Information data={data} />
                    </Section>
                    {/* <Section isBorderBottom={true} title="Generos">
                        <Listing
                            data={data?.genres?.split(',')}
                            keyExtractor={(item) => `${item}`}
                            renderItem={(props) => <GenreItem {...props} />}
                        />
                    </Section> */}
                    {recommendations && recommendations.length > 0 && (
                        <Section
                            isDarkBg={true}
                            isBorderBottom={true}
                            title="Recomendaciones"
                        >
                            <Listing
                                data={recommendations}
                                keyExtractor={(item) => item.slug}
                                renderItem={(props) => (
                                    <RecommendationItem {...props} />
                                )}
                            />
                        </Section>
                    )}
                </ScrollView>
            </>
        );
    } else {
        return null;
    }
};

const styles = StyleSheet.create({
    borderBottom: {
        borderWidth: 1,
    },
});
