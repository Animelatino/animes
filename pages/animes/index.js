import React, { Component } from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { api } from '../../lib/api';
import ListAnimes from '../../components/ListAnimes';
import Layout from '../../components/Layout';

import styles from '../../styles/Animes.module.css';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: this.props.router.query
        };
    }

    handleChange = (e) => {
        const { router } = this.props;
        const { filter } = this.state;
        this.setState({
            filter: {
                ...filter,
                [e.target.name]: e.target.value,
            }
        }, () => router.push({
            query: {
                ...router.query,
                page: 1,
                [e.target.name]: e.target.value
            }
        }))
    }

    changePage = (type) => {
        const { data, router } = this.props;
        router.push({
            query: {
                ...router.query,
                page: type === 'next' ? parseInt(data?.current_page + 1) : parseInt(data?.current_page - 1)
            }
        })
    }

    filterAnimes = () => {
        const { filter, filterings } = this.props;
        return (
            <div className={styles.filter}>
                <div className={styles.ListTypes}>
                    <div className={styles.type}>
                        <label htmlFor={"type"}>Tipo</label>
                        <select name={"type"} value={filter?.type} id={"type"} onChange={this.handleChange}>
                            <option value="">Todos</option>
                            {filterings?.types?.map((item, idx) => (
                                <option value={item?.type?.toLowerCase()} key={idx}>{item?.type}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.type}>
                        <label htmlFor={"status"}>Estado</label>
                        <select name={"status"} value={filter?.status} id={"status"} onChange={this.handleChange}>
                            <option value="">Todos</option>
                            {filterings?.status?.map((item, idx) => (
                                <option value={item?.status} key={idx}>{item?.status === 0 ? "Finalizado" : "En emisión"}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.type}>
                        <label htmlFor={"year"}>Año</label>
                        <select name={"year"} value={filter?.year} id={"year"} onChange={this.handleChange}>
                            <option value="">Todos</option>
                            {filterings?.years?.map((item, idx) => (
                                <option value={item?.year} key={idx}>{item?.year}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.type}>
                        <label htmlFor={"genre"}>Genero</label>
                        <select name={"genre"} value={filter?.genre} id={"genre"} onChange={this.handleChange}>
                            <option value="">Todos</option>
                            {filterings?.genres?.map((item, idx) => (
                                <option value={item?.slug} key={idx}>{item?.title}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        );
    }

    paginationAnimes = () => {
        const { data } = this.props;
        return (
            <div className={styles.paginate}>
                { data?.prev_page_url && (
                <a className={styles.item} onClick={() => this.changePage('prev')}>
                    <svg viewBox="0 0 24 24">
                        <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
                    </svg>
                </a>
                )}
                { data?.current_page && (
                    <a className={`${styles.item} ${styles.active}`}>{data?.current_page}</a>
                )}
                { data?.next_page_url && (
                <a className={styles.item} onClick={() => this.changePage('next')}>
                    <svg viewBox="0 0 24 24">
                        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                    </svg>
                </a>
                )}
            </div>
        )
    }

    render() {
        const { data } = this.props;
        return (
            <Layout>
                <Head>
                    <title>{`Lista de animes • ${process.env.NAME}`}</title>
                    <meta name="description" content={`Anime Online Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion subtitulados al español latino en ${process.env.NAME}`} />
                    <link rel="canonical" href={`${process.env.URL}/animes`} />
                    <meta name="og:title" content={`Lista de animes • ${process.env.NAME}`} />
                    <meta name="og:description" content={`Anime Online Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion subtitulados al español latino en ${process.env.NAME}`} />
                    <meta name="og:url" content={`${process.env.URL}/animes`} />
                    <meta name="og:locale" content="es_LA" />
                    <meta name="og:type" content="website" />
                    <meta name="og:image" content="https://i.imgur.com/Iof3uSm.jpg" />
                    <meta property="og:image:width" content="265" />
			        <meta property="og:image:height" content="265" />
                    <meta itemProp="image" content="https://i.imgur.com/Iof3uSm.jpg" />
                </Head>
                <main className={styles.container}>
                    <ListAnimes paginate={this.paginationAnimes()} filters={this.filterAnimes()} animes={data?.data}/>
                </main>
            </Layout>
        );
    }
}

index.getInitialProps = async (context) => {
    const queryString = (obj) => {
        return Object.entries(obj)
            .map(([index, val]) => `${index}=${val}`)
            .join("&");
    };
    const res = await api.get(`anime/list?${queryString({ ...context?.query })}`);
    const filters = await api.get(`filterings`);
    return { 
        data: res.data,
        filterings: filters.data
    }
}

export default withRouter(index);