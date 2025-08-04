import styles from './Header.module.css';

import TabSwitch from '../../elements/TabSwitch/TabSwitch';
import CommonButton from '../../elements/CommonButton/CommonButton';

function Header(){
    return(
        <header className={styles.appHeader}>
            <div className={styles.mainHeader}>
                <TabSwitch/>
                <CommonButton iconType='browse' color='--main-color' bgColor={false} content='TITLE'/>
            </div>
        </header>
    );
}

export default Header;