import styles from './TabSwitch.module.css';
import classNames from 'classnames';
import CommonIcon from '../CommonIcon/CommonIcon';

function TabSwitch(){
    return(
        <div className={styles.tabSwitch}>
            <a href="###" className={classNames(styles.tabItem, styles.selected)}><CommonIcon type='map' size='18px' color='--white-color'/></a>
            <a href="###" className={styles.tabItem}><CommonIcon type='browse' size='18px' color='--gray-color'/></a>
        </div>
    );
}

export default TabSwitch;