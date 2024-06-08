import classNames from 'classnames/bind';

import Button from '../Button';
import Modal from '../Modal';
import styles from './TemplatePhoneCase.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Templates({ data }) {
    return (
        <div className={cx('wrapper')}>
            {data.map((template, index) => (
                <div key={index} className={cx('card')}>
                    <div className={cx('card__image__btn')}>
                        <div className={cx('img')}>
                            <img src={JSON.parse(template.image)} alt="Person" className={cx('card__image')} />
                        </div>
                        <div className={cx('btn')}>
                            <Button primary to={`/design-phone-case/${template._id}`}>
                                Use
                            </Button>
                            <Modal btnName="Preview" outline>
                                <div className={cx('card__image__btn_Modal')}>
                                    <div>
                                        <img src={JSON.parse(template.image)} alt="Person" className={cx('card__image_Modal')} />
                                    </div>
                                    <div>
                                        <h1>{template.name}</h1>
                                        <ul className={cx('details')}>
                                            <li>Điện thoại: {template.phoneModel}</li>
                                            <li>Kiểu ốp lưng: bo góc</li>
                                            <li>Chất liệu: Nhựa dẻo</li>
                                            <li>Màu sắc: Cam</li>
                                            <li>Giá: 150.000 VNĐ</li>
                                            <li>Số lượng đã dùng mẫu: 170</li>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <Button primary to={`/design-phone-case/${template._id}`}>
                                        Use
                                    </Button>
                                </div>
                            </Modal>
                        </div>
                    </div>
                    <p className={cx('card__name')}>{template.name}</p>
                    <p className={cx('card__phone_model')}>{template.phoneModel}</p>
                    <div className={cx('grid-container')}>
                        <div className={cx('grid-child-posts')}>156 Use</div>
                        <div className={cx('grid-child-followers')}>
                            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon> 1012 Likes
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Templates;
