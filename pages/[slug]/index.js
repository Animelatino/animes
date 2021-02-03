import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { api } from '../../lib/api';
import styles from '../../styles/Anime.module.css';
import Layout from '../../components/Layout';
import { bannerAnime, posterAnime, slugAnime, slugGenre, nFormatter } from '../../helpers/Functions';
import { getStatusAnime, getDateAiredAnime, getRatingAnime, getVoteAverageAnime } from '../../helpers/Strings';
import Comments from "../../components/Comments";
import AnimeEpisodeCard from '../../components/AnimeEpisodeCard';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    banner = () => {
        const { data } = this.props;
        return (
            <div className={styles.banner} style={{ backgroundImage: "url("+`${bannerAnime(data?.banner)}`+")"}}>
                <div className={styles.content} >
                    <div className={styles.column}>
                        <h1>{data?.name}</h1>
                        <div className={styles.genres}>
                            { data?.genres && data?.genres?.split(',')?.map((genre, idx) => (
                                <Link key={idx} href={slugGenre(genre)}>
                                    <a className={styles.item} title={genre.replace(/-/g,' ')}>{genre.replace(/-/g,' ')}</a>
                                </Link>
                            ))} 
                        </div>
                    </div>
                </div>
                <div className={styles.overlay}></div>
            </div>
        )
    }

    info = () => {
        const { data } = this.props;
        return(
            <div className={styles.info}>
                <div className={styles.cover}>
                    <Image
                        className="poster"
                        alt={data?.name}
                        height="auto"
                        width="auto"
                        layout="responsive"
                        loading={"lazy"}
                        src={posterAnime(data?.poster)}/>
                </div>
                <div className={styles.list}>
                    <div className={styles.item}>
                        <div className={styles.stats}>
                            <div title="Total view" className={styles.stat}>
                                <svg viewBox="0 0 24 24">
                                    <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"></path>
                                </svg>
                                { nFormatter(data?.totalviews,1) }
                            </div>
                            <div title="Total favorite" className={styles.stat}>
                                <svg viewBox="0 0 24 24">
                                    <path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"></path>
                                </svg>
                                {data?.popularity}
                            </div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <small>Avg. Score</small>
                        <svg viewBox="0 0 24 24" className={styles.gold}>
                            <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path>
                        </svg>
                        {getVoteAverageAnime(data?.vote_average)}
                    </div>
                    <div className={styles.item}>
                        <small>Estado</small> {getStatusAnime(data?.status)}
                    </div>
                    <div className={styles.item}>
                        <small>Clasificación</small> {getRatingAnime(data?.rating)}
                    </div>
                    <div className={styles.item}>
                        <small>Estreno</small> {getDateAiredAnime(data?.aired)}
                    </div>
                    <div className={styles.item}>
                        <small>Titulos Alternativos</small> {data?.name_alternative}
                    </div>
                </div>
            </div>
        );
    }

    details = () => {
        const { data } = this.props;
        return (
            <div className={styles.details}>
                <div className={styles.overview}>
                  <p>{data?.overview ? data?.overview : 'No hay sinopsis para este anime'}</p>
                </div>
                <div className={styles.listEpisodes}>
                    {data?.episodes?.map((episode, idx) => (
                        <AnimeEpisodeCard anime={data} episode={episode} key={idx} />
                    ))}
                </div>
                <Comments title={data?.name} url={`${process.env.URL}${slugAnime(data?.slug)}`} id={data?.slug}/>
            </div>
        );
    }

    render() {
        const { data } = this.props;
        return (
            <Layout>
                <Head>
                    <title>{`Ver ${data?.name} Sub Español Latino en HD Online • ${process.env.NAME}`}</title>
                    <meta name="description" content={`${(data?.overview?.length > 165 ? (data?.overview?.slice(0,165) + '...') : data?.overview)}`} />
                    <link rel="canonical" href={`${process.env.URL}${slugAnime(data?.slug)}`} />
                    <meta name="og:title" content={`Ver ${data?.name} Sub Español Latino en HD Online • ${process.env.NAME}`} />
                    <meta name="og:description" content={`${(data?.overview?.length > 165 ? (data?.overview?.slice(0,165) + '...') : data?.overview)}`} />
                    <meta name="og:url" content={`${process.env.URL}${slugAnime(data?.slug)}`} />
                    <meta name="og:locale" content="es_LA" />
                    <meta name="og:type" content="website" />
                    <meta name="og:image" content={bannerAnime(data?.banner)} />
                    <meta property="og:image:width" content="552" />
			        <meta property="og:image:height" content="310" />
                    <meta itemProp="image" content={bannerAnime(data?.banner)} />
                </Head>
                <main className={styles.container}>
                    { this.banner() }
                    <div className={styles.contentAnime}>
                        { this.info() }
                        { this.details() }
                    </div>
                </main>
            </Layout>
        );
    }
}

export async function getServerSideProps(context) {
    try {
        const res = await api.get(`anime/${context.params.slug}`);
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