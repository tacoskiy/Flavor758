'use client';

import styles from './page.module.css';
import Frame from '../components/elements/Flame/Flame';
import CardList from '../components/elements/Card/card';
import ReviewList from '../components/elements//Review-card/review-card';

type Post ={
    id : number;
    title:string;
    content:string;
    image:string;
    ratingStar:number;
}

export default function Page() {
  const handleExploreClick = () => {
    alert('Explore clicked!');
  };

  const cardItems = [
    { id: 1, text: '🦐 Tenmusu' },
    { id: 2, text: '🍙 Onigiri' },
    { id: 3, text: '🍣 Osushi' },
    { id: 4, text: '🍝 Pasta' },
    { id: 5, text: '🍖 meat' },
  ];

  const handleCardClick = (id: string | number) => {
    alert(`Card ${id} clicked!`);
  };


  const reviewItems = [
    {
      id: 1,
      imageSrc: '/img/icons/サイゼリヤ.jpg',
      title: 'Delicious Eel',
      description: 'Very tasty and well cooked eel dish.',
      rating: 4.5,
    },
    {
      id: 2,
      imageSrc: '/img/icons/お寿司.webp',
      title: 'Great Service',
      description: 'Friendly staff and cozy atmosphere.',
      rating: 4.0,
    },
    {
      id: 3,
      imageSrc: '/img/icons/パスタ.jpeg',
      title: 'Excellent Ambiance',
      description: 'Lovely decor and relaxing environment.',
      rating: 4.8,
    },
    {
      id: 4,
      imageSrc: '/img/icons/ひつまぶし.jpg',
      title: 'Fresh Ingredients',
      description: 'The freshest ingredients used in dishes.',
      rating: 4.3,
    },
    {
      id: 5,
      imageSrc: '/img/icons/サイゼリヤ２.jpg',
      title: 'Highly Recommended',
      description: 'Would definitely recommend to friends.',
      rating: 5.0,
    },
  ];
  
    
  const handleBookmarkClick = (id: number) => {
    alert(`Bookmark clicked for review ID: ${id}`);
  };

  return (
    <div className={styles.container}>
      <Frame
        mustEatText="Must EAT"
        title="Hitsumabushi"
        description="Eel dishes characterized by"
        description2="their sweet and spicy flavor"
        imageUrl="/img/ひつまぶし.jpg"
        exploreButtonText="Explore"
        onExploreClick={handleExploreClick}
      />

      <CardList items={cardItems} onCardClick={handleCardClick} />

      <ReviewList items={reviewItems} onBookmarkClick={handleBookmarkClick} />
    </div>
  );
}
