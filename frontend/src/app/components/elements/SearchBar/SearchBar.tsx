import styles from './SearchBar.module.css';
import CommonIcon from '../CommonIcon/CommonIcon';

function SearchBar(){
    return(
        <div className={styles.searchBar}>
            <CommonIcon type='search' size='18px' color='--gray-color' />
            <p>Search for lunch</p>
        </div>
    );
}

export default SearchBar;