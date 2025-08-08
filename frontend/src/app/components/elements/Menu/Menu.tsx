import Link from 'next/link';
import styles from './Menu.module.css'
import { useEffect, useState } from 'react';
import CommonButton from '../CommonButton/CommonButton';
import CommonIcon from '../CommonIcon/CommonIcon';
import classNames from 'classnames';

interface User {
  id: number;
  username: string;
  profilePic?: string;
}

interface MenuProps{
    isOpen: boolean;
    closeButtonClick: () => void;
}

function Menu({isOpen, closeButtonClick}:MenuProps){
    const [user, setUser] = useState<User|null>(null);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('http://localhost:8000/account/user/', {
                    method: 'GET',
                    credentials: 'include', // Cookie送信に必要
                });

                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        
        fetchUser();
    }, []);

    const logout = async () => {
            try {
                const res = await fetch('http://localhost:8000/account/logout/', {
                    method: 'POST',
                    credentials: 'include',
                });

                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
    };

    return(
        <div className={classNames(styles.menu, isOpen? styles.open : '')}>
            <CommonButton iconType='x' color='--main-color' bgColor={false} onClick={closeButtonClick}/>
            <Link className={styles.account} href='/account'>
                <img className={styles.profilePic} src={`http://localhost:8000${user?.profilePic}`} alt="pic" />
                <p>{user?.username}</p>
            </Link>
            <Link className={styles.account} href='/addshop'>
                <CommonIcon type='addshop' size='28px' color='--black-color'/>
                <p>Add Shop</p>
            </Link>
            <Link className={styles.account} href='/account'>
                <CommonIcon type='eatGuide' size='28px' color='--black-color'/>
                <p>Eat Guides</p>
            </Link>
            <Link className={styles.account} href='/account'>
                <CommonIcon type='setting' size='28px' color='--black-color'/>
                <p>{user?.username}</p>
            </Link>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Menu;