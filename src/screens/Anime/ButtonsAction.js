import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View, Text, ToastAndroid } from 'react-native';
import Touchable from '../../components/Touchable';
import { api } from '../../db/api';
import { useDispatch, useStore } from '../../store/StoreProvider';
import { types } from '../../store/StoreReducer';
import * as Icons from 'react-native-vector-icons';

function ButtonsAction(props) {
    const { has_favorited, has_subscribed, id } = props.data;
    const { colors, space } = useTheme();
    const [favoriteItem, setFavoriteItem] = useState(has_favorited);
    const [suscribeItem, setSuscribeItem] = useState(has_subscribed);
    const [fetching, setFetching] = useState(false);
    const { token, user, favorite, suscribe } = useStore();
    const dispacth = useDispatch();

    async function toogleFavorite() {
        try {
            const parameters = {
                user_id: user.id,
                anime_id: id,
            };
            const options = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            setFetching(true);
            const dataJson = await api.post(
                favoriteItem ? `auth/favorite/delete` : `auth/favorite/add`,
                parameters,
                options
            );
            if (dataJson.data.status) {
                const animeFav = (({ id, slug, name, poster }) => ({
                    id,
                    slug,
                    poster,
                }))(props.data);
                const animesFav = favorite.filter((anime) => anime.id != id);
                animesFav.unshift(animeFav);
                dispacth({ type: types.updateFavorite, data: animesFav });
            } else {
                const animesFav = favorite.filter((anime) => anime.id != id);
                dispacth({ type: types.updateFavorite, data: animesFav });
            }
            setFavoriteItem(dataJson.data.status);
            ToastAndroid.show(
                dataJson.data.status
                    ? 'Se agregó a Mis favoritos'
                    : 'Se eliminó de Mis favoritos',
                ToastAndroid.SHORT
            );
            setFetching(false);
        } catch (error) {
            setFetching(false);
        }
    }

    async function toogleSuscribe() {
        try {
            const parameters = {
                user_id: user.id,
                anime_id: id,
            };
            const options = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            setFetching(true);
            const dataJson = await api.post(
                suscribeItem ? `auth/suscribe/delete` : `auth/suscribe/add`,
                parameters,
                options
            );
            if (dataJson.data.status) {
                const animeSus = (({ id, slug, name, poster }) => ({
                    id,
                    slug,
                    poster,
                }))(props.data);
                const animesSus = suscribe.filter((anime) => anime.id != id);
                animesSus.unshift(animeSus);
                dispacth({ type: types.updateSuscribe, data: animesSus });
            } else {
                const animesSus = suscribe.filter((anime) => anime.id != id);
                dispacth({ type: types.updateSuscribe, data: animesSus });
            }
            setSuscribeItem(dataJson.data.status);
            ToastAndroid.show(
                dataJson.data.status
                    ? 'Marcado como Terminado'
                    : 'Eliminado de Terminados',
                ToastAndroid.SHORT
            );
            setFetching(false);
        } catch (error) {
            setFetching(false);
        }
    }

    if (!user.id) return null;

    return (
        <View style={[styles.container]}>
            <Touchable
                disabled={fetching}
                riple={false}
                onPress={toogleFavorite}
            >
                <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
                    <Icons.Ionicons
                        name={favoriteItem ? 'heart' : 'heart-outline'}
                        size={32}
                        color={favoriteItem ? 'red' : colors.white}
                    />
                    <Text style={[styles.typeText, { marginLeft: space.xs }]}>
                        Favoritos
                    </Text>
                </View>
            </Touchable>
            <View style={{ width: space.md }}></View>
            <Touchable
                disabled={fetching}
                riple={false}
                onPress={toogleSuscribe}
            >
                <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
                    <Icons.Ionicons
                        name={suscribeItem ? 'hourglass' : 'hourglass-outline'}
                        size={32}
                        color={suscribeItem ? 'orange' : colors.white}
                    />
                    <Text style={[styles.typeText, { marginLeft: space.xs }]}>
                        Terminado
                    </Text>
                </View>
            </Touchable>
        </View>
    );
}

export default ButtonsAction;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    typeText: {
        fontFamily: 'Regular',
    },
});
