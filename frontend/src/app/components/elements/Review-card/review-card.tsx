import Image from 'next/image';
import styles from './review-card.module.css';

// 星評価を生成するヘルパーコンポーネント
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={styles.stars}>
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className={styles.star}>★</span>
      ))}
      {halfStar && <span className={styles.star}>½</span> /* 半星の表示例 */}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className={`${styles.star} ${styles.emptyStar}`}>★</span>
      ))}
    </div>
  );
};

// 個々のレビューカード
interface ReviewCardProps {
  imageSrc: string;
  title: string;
  description: string;
  rating: number;
  onBookmarkClick: () => void;
}

const ReviewCard = ({ imageSrc, title, description, rating, onBookmarkClick }: ReviewCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image src={imageSrc} alt={title} layout="fill" objectFit="cover" className={styles.image} />
        <button className={styles.bookmark} onClick={onBookmarkClick}>
          <span className={styles.bookmarkIcon}>&#9825;</span> {/* ブックマークアイコン */}
        </button>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.ratingContainer}>
          <StarRating rating={rating} />
          <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

// 縦に並べるリスト
interface ReviewListProps {
  items: {
    id: number;
    imageSrc: string;
    title: string;
    description: string;
    rating: number;
  }[];
  onBookmarkClick: (id: number) => void;
}

const ReviewList = ({ items, onBookmarkClick }: ReviewListProps) => {
  return (
    <div>
      {items.map((item) => (
        <ReviewCard
          key={item.id}
          imageSrc={item.imageSrc}
          title={item.title}
          description={item.description}
          rating={item.rating}
          onBookmarkClick={() => onBookmarkClick(item.id)}
        />
      ))}
    </div>
  );
};

export default ReviewList;