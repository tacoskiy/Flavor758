'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import CategoryChip from '../components/elements/CategoryChip/CategoryChip';
import ReviewCard from '../components/elements/ReviewCard/reviewCard';

type Shop = {
  id: number;
  shopName: string;
  description: string;
  coverImage: string;
  get_average_rating: number;
  isSaved: boolean;
};

export default function Page() {
  const [shops, setShops] = useState<Shop[]>([]);

  // 3グループで状態を分ける
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedLang, setSelectedLang] = useState<string[]>([]);
  const [selectedRestriction, setSelectedRestriction] = useState<string[]>([]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        // AND条件: セミコロン ; でつなぐ
        // OR条件: カンマ , でつなぐ
        // 例: "Tenmusu,Onigiri;English,中文;Halal,Vegan"

        const groups = [
          selectedCategory,
          selectedLang,
          selectedRestriction,
        ];

        // 空のグループは除外
        const filteredGroups = groups.filter(g => g.length > 0);

        // 文字列に変換
        const categoryParam = filteredGroups
          .map(group => group.join(','))
          .join(';');

        const url = new URL('http://localhost:8000/api/shops');
        if (categoryParam) {
          url.searchParams.append('categories', categoryParam);
        }

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error('Failed to fetch shops');
        const data = await res.json();
        setShops(data);
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    };

    fetchShops();
  }, [selectedCategory, selectedLang, selectedRestriction]);

  // グループごとのChipクリックハンドラ
  const toggleSelected = (selected: string[], setSelected: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setSelected(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const categoryItems = [
    { id: 1, text: 'Tenmusu' },
    { id: 2, text: 'Onigiri' },
    { id: 3, text: 'Osushi' },
    { id: 4, text: 'Pasta' },
    { id: 5, text: 'meat' },
  ];

  const langItems = [
    { id: 1, text: 'English' },
    { id: 2, text: '中文' },
    { id: 3, text: '日本語' },
    { id: 4, text: '한국어' },
    { id: 5, text: 'Français' },
    { id: 6, text: 'Español' },
    { id: 7, text: 'Deutsch' },
  ];

  const restrictionItems = [
    { id: 1, text: 'Halal' },
    { id: 2, text: 'Kosher' },
    { id: 3, text: 'Vegan' },
    { id: 4, text: 'Gluten-Free' },
  ];

  return (
    <section className={styles.container}>
      <div className={styles.chipWrapper}>
        {categoryItems.map(item => (
          <CategoryChip
            key={item.id}
            id={item.id}
            text={item.text}
            selected={selectedCategory.includes(item.text)}
            onClick={() => toggleSelected(selectedCategory, setSelectedCategory, item.text)}
          />
        ))}
      </div>
      <div className={styles.chipWrapper}>
        {langItems.map(item => (
          <CategoryChip
            key={item.id}
            id={item.id}
            text={item.text}
            selected={selectedLang.includes(item.text)}
            onClick={() => toggleSelected(selectedLang, setSelectedLang, item.text)}
          />
        ))}
      </div>
      <div className={styles.chipWrapper}>
        {restrictionItems.map(item => (
          <CategoryChip
            key={item.id}
            id={item.id}
            text={item.text}
            selected={selectedRestriction.includes(item.text)}
            onClick={() => toggleSelected(selectedRestriction, setSelectedRestriction, item.text)}
          />
        ))}
      </div>
      <div className={styles.cards}>
        {shops.map(shop => (
          <ReviewCard
            key={shop.id}
            id={shop.id}
            imageSrc= {shop.coverImage || '/images/default.jpg'}
            imageAlt= {shop.shopName || 'Shop image'}
            title= {shop.shopName}
            description= {shop.description}
            rating= {shop.get_average_rating}/>
        ))}
      </div>
    </section>
  );
}
