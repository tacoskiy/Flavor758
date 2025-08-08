import classNames from 'classnames';
import CommonIcon from '../CommonIcon/CommonIcon';
import styles from './CommonButton.module.css'

interface CommonButtonProps {
    iconType: string;
    content?: string;
    color: string;
    bgColor?: boolean;
    onClick?: () => void;
    width?: number;
    height?: number;
}

function CommonButton({iconType, content, color, bgColor = true, onClick, width = content ? 120 : 48, height = 48}:CommonButtonProps){
    return(
        <button
            className={classNames(styles.commonButton, bgColor ? styles.bgColor : '')}
            style={{
                width,
                height,
                color: bgColor ? `var(${color})` : 'var(--white-color)',
                backgroundColor: bgColor ? 'var(--lg-color)' : `var(${color})`
            }}
            onClick={onClick}
        >
            <CommonIcon type={iconType} size='18px' color={bgColor ? color : '--white-color'}/>
            {content && <span>{content}</span>}
        </button>
    );
}

export default CommonButton;