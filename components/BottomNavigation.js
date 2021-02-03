import React, { Component } from 'react';
import Link from 'next/link';
import { menuItems } from '../helpers/Functions';

import styles from '../styles/BottomNavigation.module.css';

export default class BottomNavigation extends Component {
    constructor(props) {
        super(props);
    }

    menu = () => {
        return(
            <div className={styles.menu}>
            {menuItems()?.map((item, i) => {
                return (
                    <Link key={i} href={item?.link}>
                        <a alt={item?.name} className={styles.item}>
                            <svg viewBox="0 0 24 24" className={styles.n} dangerouslySetInnerHTML={{ __html: item?.icon }}></svg>
                        </a>
                    </Link>
                )})
            }
            </div> 
        )
    }

    render() {
        return (
            <div className={styles.container}>
                {this.menu()}
            </div>
        );
    }
}
