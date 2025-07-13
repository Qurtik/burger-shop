/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import type React from 'react';

import './modal.css';

const modalRoot = document.getElementById('react-modals')!;

type TProps = {
  children?: React.JSX.Element | React.JSX.Element[];
  isOpen: boolean;
  header?: string;
  onClose?: () => void;
};

const Modal = ({ isOpen, onClose, children }: TProps): React.JSX.Element | null => {
  // Обработка нажатия Esc

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        if (typeof onClose === 'function') onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Блокировка скролла
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Создание портала в элемент #modal-root
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content text text_type_main-default"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
