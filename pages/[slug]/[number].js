import React, { Component } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import Iframe from 'react-iframe';
import { api } from '../../lib/api';
import Layout from '../../components/Layout';
import Comments from "../../components/Comments";
import { slugEpisode, slugAnime, imageAnimeSearch, imageEpisode } from '../../helpers/Functions';
import { getLanguajePlayer, getUrlVideo, getCheckLatino } from '../../helpers/Strings';

import styles from '../../styles/Episode.module.css';

export default class number extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iframe: null,
            languaje: this.props.data?.players[0] == undefined ? 1 : 0,
            server: 0,
            random: 0,
            id: this.props.data.id
        };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        let defaultLang = prevState.languaje;
        if(nextProps.data.id !== prevState.id){
            defaultLang = nextProps.data?.players[defaultLang] == undefined ? 0 : defaultLang;
            return {
                iframe: nextProps.data?.players[defaultLang] ? getUrlVideo(nextProps.data?.players[defaultLang][0]) : null,
                languaje: defaultLang,
                server: 0,
                random: prevState.random + 1,
                id: nextProps.data.id
            }
        }else{
            if(prevState.iframe == null){
                return {
                    iframe: nextProps.data?.players[defaultLang] ? getUrlVideo(nextProps.data?.players[defaultLang][0]) : null
                }
            }else{
                return prevState;
            }
        }
        
    }

    handleChange = (e) => {
        const { data } = this.props;
        const { languaje } = this.state;
        if(e.target.name === 'languaje'){
            this.setState({
                languaje: e.target.value,
                iframe: getUrlVideo(data?.players[e.target.value][0])
            })
        }
        if(e.target.name === 'server'){
            this.setState({
                server: e.target.value,
                iframe: getUrlVideo(data?.players[languaje][e.target.value])
            })
        }
    }

    videoPlayer = () => {
        const { data } = this.props;
        const { iframe, languaje, random, server } = this.state;
        return(
            <div className={styles.videoPlayer}>
                { getCheckLatino(data?.players) && (
                    <div className={styles.msg}>
                        <span>Este capítulo está disponible en <b>Español Latino</b></span>
                    </div>
                )}
                { iframe && (
                    <>
                        <div className={styles.options}>
                            <div className={styles.type}>
                                <label htmlFor={"languaje"}>Idioma</label>
                                <select name={"languaje"} id={"languaje"} onChange={this.handleChange}>
                                    {Object.keys(data?.players)?.map((item, idx) => (
                                        <option value={item} key={idx}>{getLanguajePlayer(item)}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.type}>
                                <label htmlFor={"server"}>Servidor</label>
                                <select name={"server"} value={server} id={"server"} onChange={this.handleChange}>
                                    {data?.players[languaje]?.map((item, idx) => (
                                        <option value={idx} key={idx}>{item?.server?.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className={styles.video}>
                            <Iframe key={random} allow={"fullscreen"} url={iframe} display="initial"/>
                        </div>
                    </>
                )}
            </div>
        )
    }

    navCaps = () => {
        const { data } = this.props;
        return (
            <div className={styles.navCaps}>
                <div className={styles.column}>
                    <div className={styles.info}>
                        <Link href={slugAnime(data?.anime?.slug)}>
                        <a className={styles.cover}>
                            <Image 
                                className={styles.cover}
                                alt={`${data?.anime?.name} ${data?.number}`}
                                height="auto"
                                width="auto"
                                layout="responsive"
                                loading={"lazy"}
                                src={imageAnimeSearch(data?.anime?.poster) }/>
                        </a> 
                        </Link>
                        <div className={styles.details}>
                            <div className={styles.info}>
                                <h1>
                                    <Link href={slugAnime(data?.anime?.slug)}>
                                        <a>{data?.anime?.name}</a>
                                    </Link>
                                </h1>
                                <span className={styles.currentEp}>{`Episodio ${data?.number}`}</span>
                            </div>
                            <p className={styles.desc}>{data?.anime?.overview?.slice(0,50)}</p>
                        </div>
                    </div>
                    <div className={styles.actions}>
                        { data?.anterior && (
                            <Link href={slugEpisode(data?.anime?.slug, data?.anterior?.number)}>
                                <a className={styles.button}>
                                    <svg viewBox="0 0 24 24">
                                        <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
                                    </svg>
                                    Ep. Anterior
                                </a>
                            </Link>
                        )}
                        { data?.anime && (
                            <Link href={slugAnime(data?.anime?.slug)}>
                                <a className={styles.button}>
                                    <svg viewBox="0 0 24 24">
                                        <path d="M7,13H21V11H7M7,19H21V17H7M7,7H21V5H7M2,11H3.8L2,13.1V14H5V13H3.2L5,10.9V10H2M3,8H4V4H2V5H3M2,17H4V17.5H3V18.5H4V19H2V20H5V16H2V17Z"></path>
                                    </svg>
                                </a>
                            </Link>
                        )}
                        { data?.siguiente && (
                            <Link href={slugEpisode(data?.anime?.slug, data?.siguiente?.number)}>
                                <a className={styles.button}>
                                    Ep. Siguiente
                                    <svg viewBox="0 0 24 24">
                                        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                                    </svg>
                                </a>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const { data } = this.props;
        return (
            <Layout>
                <Head>
                    <title>{`Ver ${data?.anime?.name} Capítulo ${data?.number} Sub Español Latino en HD Online • ${process.env.NAME}`}</title>
                    <meta name="description" content={`Anime ${data?.anime?.name} capitulo ${data?.number} Sub Español Latino, ver online y descargar en hd 720p sin ninguna limitación`} />
                    <link rel="canonical" href={`${process.env.URL}${slugEpisode(data?.anime?.slug,data?.number)}`} />
                    <meta name="og:title" content={`Ver ${data?.anime?.name} Capítulo ${data?.number} Sub Español Latino en HD Online • ${process.env.NAME}`} />
                    <meta name="og:description" content={`Anime ${data?.anime?.name} capitulo ${data?.number} Sub Español Latino, ver online y descargar en hd 720p sin ninguna limitación`} />
                    <meta name="og:url" content={`${process.env.URL}${slugEpisode(data?.anime?.slug,data?.number)}`} />
                    <meta name="og:locale" content="es_LA" />
                    <meta name="og:type" content="video.episode" />
                    <meta name="og:image" content={imageEpisode(data?.anime?.banner)} />
                    <meta property="og:image:width" content="552" />
			        <meta property="og:image:height" content="310" />
                    <meta itemProp="image" content={imageEpisode(data?.anime?.banner)} />
                </Head>
                <main className={styles.container}>
                    { this.videoPlayer() }
                    { this.navCaps() }
                    <Comments title={`${data?.anime?.slug} Episodio ${data?.number}`} url={`${process.env.URL}${slugEpisode(data?.anime?.slug,data?.number)}`} id={`${data?.anime?.slug}-${data?.number}`}/>
                </main>
            </Layout>
        );
    }
}

export async function getServerSideProps(context) {
    try {
        const res = await api.get(`episodes/${context.params.slug}/${context.params.number.replace('capitulo-','')}`);
        return {
            props: { 
                data: res.data
            }
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
}
