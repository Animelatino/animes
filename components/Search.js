import React, { Component } from 'react';
import axios from 'axios';
import styles from '../styles/Search.module.css';
import AnimeItemSearch from './AnimeItemSearch';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearch: false,
            animes: [],
            fetching: false,
            query: ''
        };
        this.cancel = '';
    }

    onSearchInput = (e) => {
        const query = e.target.value;
        this.setState({
            query: query,
            fetching: true
        }, () => {
            if(this.state.query.length >= 3){
                this.fetchAnimesApi(query);
            }else{
                this.setState({
                    fetching: false,
                    animes: []
                })
            }
        })
    }

    fetchAnimesApi = (q) => {
        if(this.cancel){
            this.cancel.cancel();
        }
        this.cancel = axios.CancelToken.source();
        axios.get(`${process.env.APIURL}anime/search?search=${q}`,{
            cancelToken: this.cancel.token
        }).then(res => {
            this.setState({
                animes: res.data,
                fetching: false,
            })
        }).catch(err => {
            if(axios.isCancel(err) || err){
                this.setState({
                    fetching: false,
                    message: 'Error al procesar la solicitud'
                })
            }
        })
    }

    SearchContainer = () => {
        const { animes, query, fetching } = this.state;
        return (
            <div className={styles.searchContainer}>
                <div className={styles.inputContainer} onChange={this.onSearchInput}>
                    <input autoFocus id="search" name="search" className={styles.input} type="text" placeholder="Buscar..."/>
                    <label htmlFor="search">Buscar</label>
                </div>
                <div className={styles.close} onClick={this.toggleSearch}>
                    <svg viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                    </svg>
                </div>
                <div className={styles.results}>
                    { fetching 
                        ?   <div className={styles.empty}><div className={styles.loader}></div></div>
                        :   
                            <>  { animes.length > 0 && (
                                    animes?.map((anime, i) => {
                                        return(
                                            <AnimeItemSearch key={i} data={anime}/>
                                        )   
                                    })
                                )}
                                <div className={styles.empty}>{ !query || query?.length < 3 ? `Min. 3 caracteres` : ( animes.length > 0 ? `Resultados para ${query}` : `No hay resultados`) }</div>
                            </>
                    }
                </div>
            </div>
        )
    }

    toggleSearch = () => {
        this.setState({
            showSearch: !this.state.showSearch,
            query: null,
            animes: []
        })
    }

    render() {
        const { showSearch } = this.state;
        return (
            <div className={styles.container}>
                {   showSearch 
                ?   this.SearchContainer()
                :   <svg viewBox="0 0 24 24" className={styles.n} onClick={this.toggleSearch}>
                        <path d="M13.262,14.868l2.479,2.478c-0.376,0.725-0.415,1.445-0.017,1.843l4.525,4.526 c0.571,0.571,1.812,0.257,2.768-0.7c0.956-0.955,1.269-2.195,0.697-2.766l-4.524-4.526c-0.399-0.398-1.119-0.36-1.842,0.016 l-2.48-2.478L13.262,14.868z M8.5,0C3.806,0,0,3.806,0,8.5C0,13.194,3.806,17,8.5,17S17,13.194,17,8.5C17,3.806,13.194,0,8.5,0z M8.5,15C4.91,15,2,12.09,2,8.5S4.91,2,8.5,2S15,4.91,15,8.5S12.09,15,8.5,15z"></path>
                    </svg>
                }
            </div>
        );
    }
}