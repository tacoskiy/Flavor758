import styles from './Header.module.css';

import TabSwitch from '../../elements/TabSwitch/TabSwitch';
import CommonButton from '../../elements/CommonButton/CommonButton';
import CommonIcon from '../../elements/CommonIcon/CommonIcon';
import SearchBar from '../../elements/SearchBar/SearchBar';

function Header(){
    return(
        <header className={styles.appHeader}>
            <div className={styles.mainHeader}>
                <div className={styles.appIcon}>
                    <CommonIcon type='app' color='--black-color' size='18px'/>
                </div>
                <CommonButton iconType='menu' color='--main-color'/>
            </div>
            <div className={styles.subHeader}>
                <div className={styles.search}>
                    <SearchBar/>
                </div>
                <div className={styles.tab}>
                    <TabSwitch/>
                </div>
            </div>
        </header>
    );
}

export default Header;