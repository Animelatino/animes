import React, { Component } from 'react';
import Head from 'next/head';
import { api } from '../../lib/api';
import Layout from '../../components/Layout';
import { simulCast } from '../../helpers/Functions';
import AnimeCalendar from "../../components/AnimeCalendar";

import styles from '../../styles/Calendario.module.css';

export default class calendario extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { simulcast } = this.props;
        return (
            <Layout>
                <Head>
                    <title>{`Calendario de animes • ${process.env.NAME}`}</title>
                    <meta name="description" content={`Anime Online Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion subtitulados al español latino en ${process.env.NAME}`} />
                    <link rel="canonical" href={`${process.env.URL}/animes/calendario`} />
                    <meta name="og:title" content={`Calendario de animes • ${process.env.NAME}`} />
                    <meta name="og:description" content={`Anime Online Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion subtitulados al español latino en ${process.env.NAME}`} />
                    <meta name="og:url" content={`${process.env.URL}/animes/calendario`} />
                    <meta name="og:locale" content="es_LA" />
                    <meta name="og:type" content="website" />
                    <meta name="og:image" content="https://i.imgur.com/Iof3uSm.jpg" />
                    <meta property="og:image:width" content="265" />
                    <meta property="og:image:height" content="265" />
                    <meta itemProp="image" content="https://i.imgur.com/Iof3uSm.jpg" />
                </Head>
                <main className={styles.container}>
                    <div className={styles.listCalendar}>
                        <h1 className={styles.title}>
                            <span className={styles.border}>Calendario Anime</span>
                        </h1>
                        {simulCast(simulcast)?.map((item, idx) => (
                            <div key={idx} className={styles.calendar}>
                                <div className={styles.date}>
                                    <h3 className={styles.day}>{item?.dayName}</h3>
                                    <span className={styles.split}></span>
                                </div>
                                <div className={styles.data}>
                                    {item?.data?.map((i, idx) => (
                                        <AnimeCalendar key={idx} data={i}/>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </Layout>
        );
    }
}

export async function getStaticProps() {
    const res = await api.get(`anime/simulcast`);
    return {
        props: {
            simulcast: res.data,
        },
        revalidate: 1
    }
}
