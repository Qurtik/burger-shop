/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import type React from 'react';

import './modal.css';

const modalRoot = document.getElementById('react-modals')!;

type TProps = {
	children?: string | React.JSX.Element | React.JSX.Element[];
	title?: string;
	onClose?: () => void;
};

const Modal = ({ onClose, children, title }: TProps): React.JSX.Element | null => {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent): void => {
			if (e.key === 'Escape') {
				if (typeof onClose === 'function') onClose();
			}
		};
		document.addEventListener('keydown', handleEscape);
		document.body.style.overflow = 'hidden'; // Блокировка скролла

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = 'unset';
		};
	}, [onClose]);

	return ReactDOM.createPortal(
		<div className="modal-overlay" onClick={onClose}>
			<div
				className="p-10 modal-content text text_type_main-default"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="modal-title">
					<h2 className=" text text_type_medium">{title}</h2>
					<CloseIcon type="primary" className="modal-close" onClick={onClose} />
				</div>
				{children}
			</div>
		</div>,
		modalRoot
	);
};

export default Modal;
