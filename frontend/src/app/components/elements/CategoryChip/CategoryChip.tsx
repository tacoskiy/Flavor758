import classNames from 'classnames';
import styles from './CategoryChip.module.css';

interface CardProps {
  id: string | number;
  text: string;
  onClick: (id: string | number) => void;
  selected?: boolean;
}

// 個々のカードコンポーネント
function CategoryChip({ id, text, onClick, selected}: CardProps){
  return (
    <div className={classNames(styles.card, selected ? styles.selected : '')} onClick={() => onClick(id)}>
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default CategoryChip;