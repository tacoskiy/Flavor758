import styles from './TabSwitch.module.css';
import classNames from 'classnames';
import CommonIcon from '../CommonIcon/CommonIcon';
import Link from 'next/link';

function TabSwitch(){
    return(
        <div className={styles.tabSwitch}>
            <Link href="/home" className={classNames(styles.tabItem, styles.selected)}><CommonIcon type='map' size='18px' color='--white-color'/>Map</Link>
            <Link href="/mainmenu" className={styles.tabItem}><CommonIcon type='browse' size='18px' color='--gray-color'/>Browse</Link>
        </div>
    );
}

export default TabSwitch;