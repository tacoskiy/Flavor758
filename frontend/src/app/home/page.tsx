import MapBox from "../components/elements/MapBox/MapBox";
import styles from './page.module.css'

function HomePage(){
    return(
        <section className={styles.mapSection}>
            <MapBox/>
        </section>
    );  
}

export default HomePage;