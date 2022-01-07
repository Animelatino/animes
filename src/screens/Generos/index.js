import React, { useEffect, useRef, useState } from 'react';
import { api } from '../../db/api';
import { FlatList, Animated } from 'react-native';
import { useTheme } from '@react-navigation/native';
import HeaderAnimated from '../../components/HeaderAnimated';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
import AnimeItem from './AnimeItem';
import LoadMore from './LoadMore';
import { animeListColumns, getParametersUrl } from '../../functions/helpers';

function Index(props) {
    const [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(false);
    const [data, setData] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(null);
    const { params } = props.route;
    const { space } = useTheme();

    const offset = useRef(new Animated.Value(0)).current;

    async function GetData() {
        try {
            const dataJson = await api.get(
                `anime/${params.type}?page=${page}&${getParametersUrl(
                    params.query
                )}`
            );
            setFetching(false);
            setData(data.concat(dataJson.data.data));
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
        GetData();
    }, [page]);

    function onReload() {
        setFetching(true);
        setError(null);
        setPage(1);
        GetData();
    }

    const renderItem = (props) => (
        <AnimeItem numColumns={animeListColumns()} {...props} />
    );

    const renderFooter = () => (
        <LoadMore nextPage={nextPage} page={page} setPage={setPage} />
    );

    if (error) return <ErrorMessage message={error} onReload={onReload} />;

    if (fetching) return <Loader />;

    return (
        <>
            <HeaderAnimated
                title={'Genero'}
                genre={params.query.genre}
                animated={true}
                animatedValue={offset}
            />
            <FlatList
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }],
                    { useNativeDriver: false }
                )}
                contentContainerStyle={{
                    padding: space.md,
                }}
                columnWrapperStyle={{
                    marginVertical: space.sm,
                }}
                data={data}
                keyExtractor={(item, index) => `${params?.type}-${index}`}
                numColumns={animeListColumns()}
                renderItem={renderItem}
                ListFooterComponent={renderFooter}
                showsVerticalScrollIndicator={false}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                updateCellsBatchingPeriod={10}
                windowSize={10}
                onEndReachedThreshold={0.5}
            />
        </>
    );
}

export default Index;

// import React, { useEffect, useState, useRef } from 'react';
// import { Animated } from 'react-native';
// import HeaderAnimated from '../../components/HeaderAnimated';
// import Loader from '../../components/Loader';
// import { useAnimesGenres } from '../../db/genres';
// import ItemAnime from '../../components/ItemAnime';
// import Header from './Header';
// import AnimeItem from './AnimeItem';

// export default (props) => {
//     const { genre } = props.route.params.query;
//     const [data, setData] = useState([]);
//     const [page, setPage] = useState(1);
//     const getAnimesGenres = useAnimesGenres();

//     const offset = useRef(new Animated.Value(0)).current;

//     useEffect(() => {
//         getAnimesGenres(setData, 'list', [
//             { name: 'genre', value: genre },
//             { name: 'page', value: page },
//         ]);
//         return () => {
//             setData([]);
//             offset.setValue(0);
//         };
//     }, [genre]);

//     useEffect(() => {
//         getAnimesGenres(getNewPageData, 'list', [
//             { name: 'genre', value: genre },
//             { name: 'page', value: page },
//         ]);
//     }, [page]);

//     function getNewPageData(dataJson) {
//         setData(data?.concat(dataJson));
//     }

//     const renderItem = (props) => <AnimeItem numberOfColumns={3} {...props} />;

//     const renderHeader = () => <Header title={genre} />;

//     const loadMore = () => {
//         setPage(page + 1);
//     };

//     if (data?.length == 0) return <Loader />;
//     return (
//         <>
//             <HeaderAnimated genre={genre} animatedValue={offset} />
//             <Animated.FlatList
//                 onScroll={Animated.event(
//                     [{ nativeEvent: { contentOffset: { y: offset } } }],
//                     { useNativeDriver: false }
//                 )}
//                 contentContainerStyle={{
//                     marginBottom: 16,
//                 }}
//                 columnWrapperStyle={{
//                     marginTop: 10,
//                 }}
//                 data={data}
//                 keyExtractor={(item) => item.slug}
//                 numColumns={3}
//                 ListHeaderComponent={renderHeader}
//                 renderItem={renderItem}
//                 onEndReached={loadMore}
//                 showsVerticalScrollIndicator={false}
//                 initialNumToRender={12}
//                 maxToRenderPerBatch={12}
//                 updateCellsBatchingPeriod={12}
//                 windowSize={11}
//                 onEndReachedThreshold={0.5}
//             />
//         </>
//     );
// };
