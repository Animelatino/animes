import React, { Component } from 'react';
import AnimeCard from './AnimeCard';

import styles from '../styles/ListAnimes.module.css';

export default class ListAnimes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { animes, title, filters, paginate } = this.props;
        return (
            <div className={styles.box}>
                {title && (
                    <h1>
                        <span className={styles.border}>{title}</span>
                    </h1>
                )}
                { filters }
                { animes?.length > 0 
                ?   <div className={styles.listAnimes}>
                        {animes?.map((item, idx) => (
                            <AnimeCard data={item} key={idx} />
                        ))}
                    </div>
                :   <div className={styles.message}>No se encontraron animes</div>
                }
                { paginate }
            </div>
        );
    }
}
