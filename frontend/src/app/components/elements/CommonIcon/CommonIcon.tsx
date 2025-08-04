"use client";

import { ReactSVG } from "react-svg";
import styled from "styled-components";
import styles from "./CommonIcon.module.css";

interface CommonIconProps {
  type: string;
  color: string;
  size?: string;
}

const IconWrapper = styled.div<{ color: string }>`
    .icon svg path {
        fill: var(${(props) => props.color});
    }
`;

export default function CommonIcon({ type, color, size}: CommonIconProps) {
    // public/img/iconsに {アイコンの名前}Icon.svgを配置すると自動でコンポーネント化します
    // 使用する際はアイコンの名前と色を指定してくだい / また、サイズは指定しないと自動的に 20px * 20px になります
    return (
        <IconWrapper color={color} className={styles.iconWrapper} style={{width: size || "20px"}}>
            <ReactSVG className={`icon ${styles.icon}`} src={`/img/icons/${type}Icon.svg`}/>
        </IconWrapper>
    );
}