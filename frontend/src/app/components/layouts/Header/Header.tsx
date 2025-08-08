'use client';

import styles from './Header.module.css';

import TabSwitch from '../../elements/TabSwitch/TabSwitch';
import CommonButton from '../../elements/CommonButton/CommonButton';
import CommonIcon from '../../elements/CommonIcon/CommonIcon';
import SearchBar from '../../elements/SearchBar/SearchBar';
import { usePathname } from 'next/navigation';
import Menu from '../../elements/Menu/Menu';
import { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';

function Header(){
    const pathname = usePathname();
    const headerHiddenPaths = ['/signup', '/login'];
    const headerFixedPaths = ['/home']
    const showHeader = !headerHiddenPaths.includes(pathname);
    const headerSticky = !headerFixedPaths.includes(pathname)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return(
        <header className={classNames(styles.appHeader, headerSticky ? styles.sticky : '')}>
            {showHeader && 
                <>
                    <div className={styles.mainHeader}>
                        <Link href={'/home'} className={styles.appIcon}>
                            <CommonIcon type='app' color='--black-color' size='18px' />
                        </Link>
                        <CommonButton iconType='menu' color='--main-color' onClick={() => setIsMenuOpen(true)}/>
                    </div>
                    <div className={styles.subHeader}>
                        <div className={styles.search}>
                            <SearchBar />
                        </div>
                        <div className={styles.tab}>
                            <TabSwitch />
                        </div>
                    </div>
                    <div className={classNames(styles.dim, isMenuOpen ? styles.active : '')} onClick={() => setIsMenuOpen(false)}/>
                    <Menu isOpen={isMenuOpen} closeButtonClick={() => setIsMenuOpen(false)}/>
                </>
            }
        </header>
    );
}

export default Header;