import React, { useEffect, useState } from 'react';
import { api } from '../../db/api';
import HeaderAnimated from '../../components/HeaderAnimated';
import Loader from '../../components/Loader';
import EpisodeItem from './EpisodeItem';
import { useStore } from '../../store/StoreProvider';
import { FlatList as FlatListNative, ToastAndroid } from 'react-native';
import Ordering from './Ordering';

function Index(props) {
    const [data, setData] = useState();
    const [limit, setLimit] = useState(24);
    const [fetching, setFetching] = useState(true);
    const [desc, setDesc] = useState(false);
    const [page, setPage] = useState(1);
    const { params } = props.route;
    const { token, user } = useStore();

    const getData = async () => {
        try {
            let config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    user_id: user.id,
                },
            };
            const dataJson = await api.get(
                `anime/${params.slug}/episodes`,
                config
            );
            setData(dataJson.data);
            setFetching(false);
        } catch (error) {
            ToastAndroid.show(
                'Ha ocurrido un error inesperado',
                ToastAndroid.SHORT
            );
            setFetching(false);
        }
    };

    useEffect(() => {
        getData();
        return () => {
            setDesc(false);
            setFetching(true);
        };
    }, []);

    useEffect(() => {
        if (page > 1) {
            setLimit(page * 24);
        }
    }, [page]);

    const onEndReached = () => {
        setPage(page + 1);
    };

    const pressOrder = () => {
        setDesc(!desc);
        data?.episodes?.reverse();
    };

    const renderItem = (props) => (
        <EpisodeItem banner={data?.banner} slug={data?.slug} {...props} />
    );

    if (fetching) return <Loader />;

    return (
        <>
            <HeaderAnimated
                animated={false}
                title={data?.name}
                subtitle={'Lista de episodios'}
                animatedValue={0}
            />
            <FlatListNative
                data={data?.episodes?.slice(0, limit)}
                keyExtractor={(item, index) => `episode-${item.id}`}
                renderItem={renderItem}
                onEndReachedThreshold={1}
                onEndReached={onEndReached}
                showsVerticalScrollIndicator={false}
                initialNumToRender={5}
                maxToRenderPerBatch={10}
                updateCellsBatchingPeriod={10}
                windowSize={10}
                onEndReachedThreshold={0.5}
            />
            <Ordering desc={desc} pressOrder={pressOrder} />
        </>
    );
}

export default Index;
