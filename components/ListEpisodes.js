import React, { Component } from 'react';
import EpisodeCard from './EpisodeCard';

import styles from '../styles/ListEpisodes.module.css';

export default class ListEpisodes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { episodes } = this.props;
        return (
            <div className={styles.box}>
                <h1>
                    <span className={styles.border}>Episodios recientes</span>
                </h1>
                <div className={styles.listEpisodes}>
                {episodes?.map((episode, idx) => (
                    <EpisodeCard episode={episode} key={idx} />
                ))}
                </div>
            </div>
        );
    }
}
