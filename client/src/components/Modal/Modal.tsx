import styles from './Modal.module.css';
import { Close } from '@/components';
import { ReactNode } from 'react';
import { modalState } from '@/states';
import { useRecoilState } from 'recoil';

interface ModalProps {
  children: ReactNode;
  onClick: () => void;
  [key: string]: unknown;
}

export const Modal = ({ children, onClick }: ModalProps) => {
  return (
    <div role="alertdialog" aria-modal="true" className={styles.modal}>
      <div className={styles.wrapper}>
        <div className={styles.close}>
          <button onClick={onClick}>
            <Close />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
