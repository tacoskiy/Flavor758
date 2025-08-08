import styles from './card.module.css';

interface CardProps {
  id: string | number;
  text: string;
  onClick: (id: string | number) => void;
}

// 個々のカードコンポーネント
const Card = ({ id, text, onClick }: CardProps) => {
  return (
    <div className={styles.card} onClick={() => onClick(id)}>
      <span className={styles.text}>{text}</span>
    </div>
  );
};

interface CardListProps {
  items: {
    id: string | number;
    text: string;
  }[];
  onCardClick: (id: string | number) => void;
}

// 横スクロール可能なカードリストコンポーネント
const CardList = ({ items, onCardClick }: CardListProps) => {
  return (
    <div className={styles.container}>
      {items.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          text={item.text}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default CardList;