import styles from './MarkerContent.module.css';
import { useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import classNames from 'classnames';

interface MarkerContentProps{
    name: string;
}

export type MarkerContentHandle = {
    setShrink: (value: boolean) => void;
    shrink: boolean;
}

const MarkerContent = forwardRef<MarkerContentHandle, MarkerContentProps>(({name}, ref) => {

    const [shrink, setShrink] = useState(false);

    useImperativeHandle(ref, () => ({
        setShrink,
        shrink,
    }));

    return(
        <div className={classNames(styles.markerContent, shrink ? styles.shrink : '')}>
            <h3 className="restaurant-name">{name}</h3>
            <p>texttexttexttexttexttexttexttexttext</p>
        </div>
    );
});

export default MarkerContent;