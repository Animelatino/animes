import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useStore } from '../store/StoreProvider';
import Loading from './Loading';
import Error from './Error';

export default (props) => {
    const { colors } = useTheme();
    return (
        <Layout {...props} colors={colors} store={useStore()}/>
    )
}

class Layout extends PureComponent {
    constructor(props) {
        super(props);
        this.timerCheckNetwork = React.createRef();
        this.state = {
            networkFetch: false,
            networkError: {}
        }
    }

    _checkNetwork = () => {
        const { loadData, store } = this.props;
        this.setState({
            networkFetch: true,
            networkError: {} 
        }, () => {
            if(this.timerCheckNetwork != null) {
                this.timerCheckNetwork.current = setTimeout(() => {
                    if(store.networkDetect){
                        loadData();
                        this.setState({
                            networkFetch: false
                        })
                    }else{
                        this._loadError(0);
                    }
                }, 500);
            }
        })
    }

    _loadError = (type) => {
        this.setState({
            networkError: {
                type
            },
            networkFetch: false,
        })
    }

    componentWillUnmount = () => {
        this.timerCheckNetwork.current = null;
    }

    render() {
        const { colors, fetching, error, children } = this.props;
        const { networkError, networkFetch } = this.state;
        if(fetching || networkFetch){
            return <Loading/>
        }else if( ( (error && Object.keys(error).length > 0) || (networkError && Object.keys(networkError).length > 0) ) && (!fetching || !networkFetch) ){
            return <Error data={error} reload={this._checkNetwork} />
        }
        return (
            children 
        )
    }
}