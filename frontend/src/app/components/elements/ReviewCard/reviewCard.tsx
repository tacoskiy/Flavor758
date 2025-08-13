import Image from 'next/image';
import styles from './reviewCard.module.css';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import CommonIcon from '../CommonIcon/CommonIcon';
import classNames from 'classnames';

async function checkShopSaved(shopId: number): Promise<boolean> {
  const res = await fetch(`http://localhost:8000/api/savedShops?shop_id=${shopId}`, {
    credentials: 'include',
  });
  if (!res.ok) {
    console.error('Failed to fetch saved status');
    return false;
  }
  const data = await res.json();
  return data.saved;
}


// 個々のレビューカード
interface ReviewCardProps {
  imageSrc: string;
  imageAlt: string; // 追加
  title: string;
  description: string;
  rating: number;
  id: number;
}

function ReviewCard({ imageSrc, imageAlt, title, description, rating, id }: ReviewCardProps){
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    checkShopSaved(id).then((saved) => {setIsSaved(saved)});
  }, [id]);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // リンクのクリックイベントを防ぐ
    fetch((`http://localhost:8000/api/savedShops/`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ id }),
    }).then(response => {
        if (!response.ok) {
          throw new Error('response is not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('response:', data);
        checkShopSaved(id).then((saved) => {setIsSaved(saved)});
      })
      .catch(error => {
        console.error('response is ok:', error);
    });
  };
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imageSrc} alt={imageAlt} className={styles.image} />
        <button className={classNames(styles.bookmark, isSaved ? styles.saved : '')} onClick={handleBookmarkClick}>
          {isSaved ? <CommonIcon type='bookmarkActive' size='18px' color='--white-color'/>: <CommonIcon type='bookmark' size='18px' color='--black-color'/>}
        </button>
      </div>
      <Link href={`/shop/${id}`} className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.ratingContainer}>
          <CommonIcon type='star' size='18px' color='--main-color' />
          <span className={styles.ratingValue}>{rating || 0}</span>
        </div>
      </Link>
    </div>
  );
};

export default ReviewCard;