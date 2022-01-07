import React, { useEffect, useState } from 'react';
import { api } from '../../db/api';
import { useTheme } from '@react-navigation/native';
import HeaderAnimated from '../../components/HeaderAnimated';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
import AnimeItem from './AnimeItem';
import LoadMore from './LoadMore';
import { getParametersUrl } from '../../functions/helpers';
import ListItems from '../../components/ListItems';
import { useStore } from '../../store/StoreProvider';

function Index(props) {
    const [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(false);
    const [data, setData] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(null);
    const { params } = props.route;
    const { token, user } = useStore();
    const { favorite, suscribe } = useStore();

    async function GetData() {
        try {
            const dataJson = await api.get(
                `anime/${params.type}?page=${page}&${getParametersUrl(
                    params.query
                )}`
            );
            const neWdata =
                dataJson.data.data ||
                dataJson.data.being_watched ||
                dataJson.data.being_watched ||
                dataJson.data.popular_today ||
                dataJson.data.popular_today ||
                dataJson.data;
            setFetching(false);
            setData(data.concat(neWdata));
            setNextPage(dataJson.data.next_page_url ? true : false);
        } catch (error) {
            setFetching(false);
            setError('Hubo un error inesperado.');
        }
    }

    useEffect(() => {
        return () => {
            setData([]);
            setFetching(true);
            setError(null);
            setPage(1);
            setNextPage(false);
        };
    }, []);

    useEffect(() => {
        if (!params.isAuth) {
            GetData();
        } else {
            setFetching(false);
        }
    }, [page]);

    function onReload() {
        setFetching(true);
        setError(null);
        setPage(1);
        GetData();
    }

    const renderItem = (props) => <AnimeItem {...props} />;

    const renderFooter = () => (
        <LoadMore nextPage={nextPage} page={page} setPage={setPage} />
    );

    if (error) return <ErrorMessage message={error} onReload={onReload} />;

    if (fetching) return <Loader />;

    return (
        <>
            <HeaderAnimated
                animated={false}
                title={params.title}
                subtitle={params.subtitle}
                genre={params.genre}
                animatedValue={0}
            />
            <ListItems
                data={
                    params.type == 'favorite'
                        ? favorite
                        : params.type == 'suscribe'
                        ? suscribe
                        : data
                }
                keyExtractor={(item, index) => `${params?.type}-${index}`}
                renderItem={renderItem}
                ListFooterComponent={renderFooter}
            />
        </>
    );
}

export default Index;
