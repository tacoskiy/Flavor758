import styles from './MarkerContent.module.css';
import { useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import Image from 'next/image';

interface MarkerContentProps{
    name: string;
    discription: string;
    imgSrc: string;
}

export type MarkerContentHandle = {
    setShrink: (value: boolean) => void;
    shrink: boolean;
}

const MarkerContent = forwardRef<MarkerContentHandle, MarkerContentProps>(({name, discription, imgSrc}, ref) => {
    const [shrink, setShrink] = useState(false);

    useImperativeHandle(ref, () => ({
        setShrink,
        shrink,
    }));

    return(
        <div className={classNames(styles.markerContent, shrink ? styles.shrink : '')}>
            <div className={styles.card}>
                <div className={styles.content}>
                    <h3 className={styles.shopName}>{name}</h3>
                    <p className={styles.shopDescription}>{discription}</p>
                </div>
                <div className={styles.dim}/>
                <img className={styles.image} src={imgSrc} alt="coverImg"/>
            </div>
        </div>
    );
});

export default MarkerContent;