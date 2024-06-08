import Button from '../Button';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { useLayoutEffect, useRef, useState } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function Modal({ btnName = 'Open Modal', children, outline = false, primary = false, text = false, onlyIcon = false }) {
    const myModalRef = useRef();
    const [modal, setModal] = useState('');
    useLayoutEffect(() => {
        setModal(myModalRef.current);
    }, []);


    function displayModal() {
        modal.style.display = 'block';
    }

    function displayModalNone() {
        modal.style.display = 'none';
    }

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    const typeBtn = {
        outline,
        text,
        primary,
        onlyIcon,
    };

    return (
        <div>
            <Button {...typeBtn} onClick={displayModal}>{btnName}</Button>

            {/* <!-- The Modal --> */}
            <div ref={myModalRef} className={cx('modal')}>
                <div className={cx('modal-content')}>
                    <header>
                        <Button outline small onClick={displayModalNone}>
                            <FontAwesomeIcon icon={faXmark} />
                        </Button>
                    </header>
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
