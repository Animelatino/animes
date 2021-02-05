import React, { Component } from 'react';
import Head from 'next/head';
import { api } from '../lib/api';
import Layout from '../components/Layout';
import ListEpisodes from '../components/ListEpisodes';

import styles from '../styles/Home.module.css';

export default class index extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { releases } = this.props;
        return (
            <Layout>
                <Head>
                    <title>{`Ver Anime Online en HD Sub Español Latino Gratis • ${process.env.NAME}`}</title>
                    <meta name="description" content={`Anime Online Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion subtitulados al español latino en ${process.env.NAME}`} />
                    <link rel="canonical" href={`${process.env.URL}`} />
                    <meta name="og:title" content={`Ver Anime Online en HD Sub Español Latino Gratis • ${process.env.NAME}`} />
                    <meta name="og:description" content={`Anime Online Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion subtitulados al español latino en ${process.env.NAME}`} />
                    <meta name="og:url" content={`${process.env.URL}`} />
                    <meta name="og:locale" content="es_LA" />
                    <meta name="og:type" content="website" />
                    <meta name="og:image" content="https://i.imgur.com/Iof3uSm.jpg" />
                    <meta property="og:image:width" content="265" />
			        <meta property="og:image:height" content="265" />
                    <meta itemProp="image" content="https://i.imgur.com/Iof3uSm.jpg" />
                </Head>
                <main className={styles.container}>
                    <ListEpisodes episodes={releases}/>
                </main>
            </Layout>
        );
    }
}

export async function getStaticProps() {
    const res = await api.get(`releases`);
    return {
        props: {
            releases: res.data,
        },
        revalidate: 1
    }
}
