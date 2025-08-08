'use client';

import Image from 'next/image';
import styles from './Flame.module.css';

interface FrameProps {
  mustEatText: string;
  title: string;
  description: string;
  description2: string;
  imageUrl: string;
  exploreButtonText: string;
  onExploreClick: () => void;
}

const Frame = ({
  mustEatText,
  title,
  description,
  description2,
  imageUrl,
  exploreButtonText,
  onExploreClick,
}: FrameProps) => {
  return (
    <div className={styles.container}>
      <Image
        src={imageUrl}
        alt={title}
        fill
        className={styles.image}
      />
      <div className={styles.overlay}>
        <span className={styles.mustEat}>{mustEatText}</span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <p className={styles.description2}>{description2}</p>
        <button className={styles.button} onClick={onExploreClick}>
          {exploreButtonText}
        </button>
      </div>
    </div>
  );
};

export default Frame;