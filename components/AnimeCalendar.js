import React, { Component } from 'react';
import Link from 'next/link';
import { bannerAnimeCalendar, slugAnime, isNowEpisode } from '../helpers/Functions';
import { getFromNow } from '../helpers/Strings';

import styles from '../styles/AnimeCalendar.module.css';

export default class AnimeCalendar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { data } = this.props;
        return (
            <Link href={slugAnime(data?.slug)}>
                <a className={styles.item} title={data?.name} alt={data?.name}>
                    <div className={styles.content} style={{ backgroundImage: "url("+`${bannerAnimeCalendar(data?.banner)}`+")"}}>
                        <div className={styles.text}>
                            <p>{ isNowEpisode(data?.date) ? `Episodio ${data?.lastEpisode}` : `Episodio ${parseInt(data?.lastEpisode + 1)}` }
                                <b>{ isNowEpisode(data?.date) ? getFromNow(data?.date) : ''}</b>
                            </p>
                            <h1>
                                <div className={styles.limit}>{data?.name}</div>
                            </h1>
                        </div>
                        <div className={styles.overlay}></div>
                    </div>
                </a>
            </Link>
        );
    }
}
