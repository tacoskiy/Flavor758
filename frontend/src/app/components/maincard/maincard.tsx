import React from "react";
import styles from "./maincard.module.css"; // CSS Module を読み込み

const MainCard = () => {
return (
    <div className={styles.card}>
      {/* 背景画像 or メイン画像 */}
    <img src="/images/eel.jpg" alt="Hitumabushi" className={styles.image} />

      {/* キャッチコピー部分 */}
    <div className={styles.titleBox}>
        <h2 className={styles.subTitle}>Must Eat</h2>
        <h1 className={styles.mainTitle}>Hitumabushi</h1>
    </div>

      {/* 説明文 */}
    <div className={styles.description}>
        <p>
        Eel dishes characterized by <br />
        their sweet and spicy flavor
        </p>
    </div>

      {/* Exploreボタン */}
    <div className={styles.buttonWrapper}>
        <button className={styles.button}>Explore</button>
    </div>
    </div>
);
};

export default Mrd;ainCa