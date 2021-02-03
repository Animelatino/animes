import React, { Component } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { imageEpisode, posterAnime, slugEpisode, slugAnime } from '../helpers/Functions';
import { getFromNow } from '../helpers/Strings';

import styles from '../styles/EpisodeCard.module.css';

export default class EpisodeCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { episode } = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.holder}>
                    <div className={styles.overlay}>
                        <span className={styles.time}>{ getFromNow(episode?.created_at) }</span>
                        <Link href={slugEpisode(episode?.anime?.slug, episode?.number)}>
                            <a className={styles.play} alt={`${episode?.anime?.name} ${episode?.number}`} title={`${episode?.anime?.name} ${episode?.number}`}>
                                <svg viewBox="0 0 24 24"><path d="M8,5.14V19.14L19,12.14L8,5.14Z"></path></svg>
                            </a>
                        </Link>
                        <Link href={slugAnime(episode?.anime?.slug)}>
                            <a className={styles.cover} alt={episode?.anime?.name} title={episode?.anime?.name}>
                                <Image
                                    alt={episode?.anime?.name}
                                    height="auto"
                                    width="auto"
                                    layout="responsive"
                                    loading={"lazy"}
                                    style={"position:aboslute"}
                                    src={posterAnime(episode?.anime?.poster) }/>
                            </a>
                        </Link>
                    </div>
                    <Image 
                        className="poster"
                        alt={`${episode?.anime?.name} ${episode?.number}`}
                        height="auto"
                        width="auto"
                        layout="responsive"
                        loading={"lazy"}
                        src={imageEpisode(episode?.anime?.banner) }/>
                </div>
                <div className={styles.text}>
                    <Link href={slugEpisode(episode?.anime?.slug, episode?.number)}>
                        <a className={styles.title} alt={`${episode?.anime?.name} ${episode?.number}`} title={`${episode?.anime?.name} ${episode?.number}`}>
                            <div className={styles.limit}>{episode?.anime?.name}</div>
                            <span className={styles.episode}>{`Ep. ${episode?.number}`}</span>
                        </a>
                    </Link>
                </div>
            </div>
        );
    }
}
