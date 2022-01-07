import React, { PureComponent } from 'react'
import { View, FlatList } from 'react-native'
import HeaderWithBack from '../../components/HeaderWithBack'
import LoaderItem from '../../components/LoaderItem'
import LoadMoreList from '../../components/LoadMoreList'
import { api } from '../../db/api'
import ItemAnime from './ItemAnime'

class Index extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            listAnimes: [],
            page: 1,
            fetching: true,
            nextPage: null,
            loading: false
        }
    }

    componentDidMount = async () => {
        this.loadData();
    }

    loadData = async () => {
        const { type = 'tv', page = 1 } = this.props.route.params;
        const responseJson = await api.get(`anime/list?type=${type}&page=${this.state.page}`);
        this.setState({
            listAnimes: this.state.listAnimes.concat(responseJson.data.data),
            fetching: false,
            nextPage: responseJson.data.next_page_url,
            loading: false
        });
    }

    loadMore = () => {
        const { nextPage } = this.state;
        if(nextPage)
            this.setState({
                page: this.state.page + 1,
                loading: true
            }, () => {
                this.loadData()
            })
            
    }

    render() {
        const { listAnimes, fetching, loading } = this.state;
        return (
            <>
                <HeaderWithBack title="Películas" subtitle="Lista" {...this.props}/>
                {   !fetching && listAnimes.length > 0
                ?  <FlatList
                        contentContainerStyle={{
                            paddingVertical: 10,
                            paddingHorizontal: 12
                        }}
                        data={listAnimes}
                        keyExtractor={item => item.slug }
                        numColumns={3}
                        renderItem={props => <ItemAnime numberOfColumns={3} {...props} />}
                        ListFooterComponent={() => loading ? <LoadMoreList/> : null}
                        showsVerticalScrollIndicator={false}
                        onEndReached={loading ? null : this.loadMore }
                        initialNumToRender={12}
                        maxToRenderPerBatch={12}
                        updateCellsBatchingPeriod={12}
                        windowSize={11}
                        onEndReachedThreshold={0.5}
                        />
                :    <FlatList
                        contentContainerStyle={{
                            paddingVertical: 10,
                            paddingHorizontal: 12
                        }}
                        data={[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]}
                        keyExtractor={item => `${item}`}
                        numColumns={3}
                        renderItem={props => <LoaderItem numberOfColumns={3} {...props} />}
                        showsVerticalScrollIndicator={false}
                    />
                }
            </>
        )
    }
}

export default Index