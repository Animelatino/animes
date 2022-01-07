import { useTheme } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { api } from '../../db/api';
import ListItems from '../../components/ListItems';
import AnimeItem from './AnimeItem';
import Header from './Header';
import NoData from './NoData';

function Index() {
    const [value, setValue] = useState(null);
    const [data, setData] = useState([]);
    const [fetching, setFetching] = useState(true);
    const { space } = useTheme();

    const source = axios.CancelToken.source();

    useEffect(() => {
        return () => {
            setFetching(true);
        };
    }, []);

    useEffect(() => {
        if (value?.length > 0) {
            api.get(`anime/search?search=${value}`, {
                cancelToken: source.token,
            })
                .then((response) => {
                    setData(response.data);
                    setFetching(false);
                })
                .catch((error) => {
                    if (axios.isCancel(error)) return;
                });
            return () => {
                setFetching(true);
                source.cancel();
            };
        }
    }, [value]);

    function onClear() {
        setFetching(true);
        setValue(null);
        setData([]);
    }

    const renderItem = (props) => <AnimeItem {...props} />;

    return (
        <>
            <Header value={value} onChangeText={setValue} onClear={onClear} />
            {value?.length > 0 && data?.length > 0 ? (
                <ListItems
                    data={data}
                    keyExtractor={(item, index) => `busqueda-${index}`}
                    renderItem={renderItem}
                />
            ) : value?.length > 0 && !fetching ? (
                <NoData />
            ) : null}
        </>
    );
}

export default Index;
