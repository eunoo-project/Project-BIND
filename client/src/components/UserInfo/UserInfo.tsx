import styles from './UserInfo.module.css';

interface UserInfoProps {
  binderCnt?: string;
  bindingCnt?: string;
  postCnt?: string;
  [key: string]: unknown;
}

// cnt 값이 4자리를 초과할 경우 축소 표현을 유틸 함수로 만들어 사용할까?

export const UserInfo = ({ binderCnt, bindingCnt, postCnt }: UserInfoProps) => (
  <dl className={styles.container}>
    <dt className={styles.dt}>포스트</dt>
    <dd className={styles.dd}>{postCnt}</dd>
    <dt className={styles.dt}>바인딩</dt>
    <dd className={styles.dd}>{bindingCnt}</dd>
    <dt className={styles.dt}>바인더</dt>
    <dd className={styles.dd}>{binderCnt}</dd>
  </dl>
);
