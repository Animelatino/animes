import React, { Component } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { imageEpisode, slugEpisode } from '../helpers/Functions';

import styles from '../styles/EpisodeCard.module.css';

export default class AnimeEpisodeCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { anime, episode } = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.holder}>
                    <div className={styles.overlay}>
                        <Link href={slugEpisode(anime?.slug, episode?.number)}>
                            <a className={styles.play} alt={`${anime?.name} ${episode?.number}`} title={`${anime?.name} ${episode?.number}`}>
                                <svg viewBox="0 0 24 24"><path d="M8,5.14V19.14L19,12.14L8,5.14Z"></path></svg>
                            </a>
                        </Link>
                    </div>
                    <Image 
                        className="poster"
                        alt={`${anime?.name} ${episode?.number}`}
                        height="auto"
                        width="auto"
                        layout="responsive"
                        loading={"lazy"}
                        src={imageEpisode(anime?.banner) }/>
                </div>
                <div className={styles.text}>
                    <Link href={slugEpisode(anime?.slug, episode?.number)}>
                        <a className={styles.title} alt={`${anime?.name} ${episode?.number}`} title={`${anime?.name} ${episode?.number}`}>
                            <div className={styles.limit}>{anime?.name}</div>
                            <span className={styles.episode}>{`Ep. ${episode?.number}`}</span>
                        </a>
                    </Link>
                </div>
            </div>
        );
    }
}
