'use client';

import { use, useEffect, useState } from 'react';
import styles from './page.module.css';
import CommonIcon from '@/app/components/elements/CommonIcon/CommonIcon';

type Shop = {
  id: number;
  shopName: string;
  description: string;
  coverImage: string;
  ratingStar: number;
  categories: string;
  get_average_rating: number;
};

type Review = {
  id: number;
  ratingStar: number;
  comment: string;
  shop: number;
};

type Params = Promise<{ id: string }>;

type ShopDetailPageProps = {
  params: Params;
};

type RatingStarProps = {
  rating: number;
  onClick: () => void;
};

function RatingStar({ rating, onClick }: RatingStarProps) {
  return (
    <div className={styles.star}>
      {[...Array(5)].map((_, i) => (
        <button
          key={i}
          type="button"
          className={i < rating ? styles.filledStar : styles.emptyStar}
          onClick={() => onClick()}
        >
          <CommonIcon type='star' color='--main-color'></CommonIcon>
        </button>
      ))}
    </div>
  );
}

export default function ShopDetailPage({ params }: ShopDetailPageProps) {
  const [shop, setShop] = useState<Shop | null>(null);
  const [reviews, setReviews] = useState<(Review | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const { id } = use(params);

  useEffect(() => {
    async function fetchShop() {
      try {
        const res = await fetch(`http://localhost:8000/api/shops/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch shop');
        }
        const data = await res.json();
        setShop(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchReviews() {
      try {
        const res = await fetch(`http://localhost:8000/api/shops/${id}/reviews/`);
        if (!res.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const reviews = await res.json();
        setReviews(reviews);
        console.log(reviews);
      } catch (error) {
        console.error(error);
      }
    }
    fetchShop();
    fetchReviews()
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!shop) return <p>Shop not found.</p>;

  async function handleReview(event: React.FormEvent) {
      event.preventDefault();
      const reviewData = {
        ratingStar: rating,
        comment: comment,
      };

      try {
        const res = await fetch(`http://localhost:8000/api/shops/${id}/reviews/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(reviewData),
        });

        if (!res.ok) {
          throw new Error('Failed to submit review');
        }
        const newReview = await res.json();
        setReviews((prevReviews) => [...prevReviews, newReview]);
        setRating(0);
        setComment('');
      } catch (error) {
        console.error(error);
      }
  }

  return (
    <section className={styles.shopDetailSection}>
      <div className={styles.shopDetail}>
        <div className={styles.shopImage}>
          <img src={shop.coverImage || '/img/no-image.png'} alt={shop.shopName} />
        </div>
        <div className={styles.shopInfo}>
          <h1 className={styles.shopTitle}>{shop.shopName}</h1>
          <p className={styles.shopDescription}>{shop.description}</p>
          <p className={styles.shopCategories}>{shop.categories}</p>
          <p className={styles.shopRating}>Rating: {shop.get_average_rating}</p>
        </div>
      </div>
      <form onSubmit={handleReview} className={styles.reviewForm}>
        <input
          type="number"
          value={rating}
          onChange={e => setRating(Number(e.target.value))}
          className={styles.inputNumber}
        />
        <input
          type="text"
          value={comment}
          onChange={e => setComment(e.target.value)}
          className={styles.inputText}
        />
        <button type="submit" className={styles.submitButton}>comment</button>
      </form>
      {reviews.map((review) => (
        <div key={review?.id} className={styles.review}>
          <h3 className={styles.reviewRating}>Rating: {review?.ratingStar}</h3>
          <p className={styles.reviewComment}>{review?.comment}</p>
        </div>
      ))}
    </section>
  );
}
