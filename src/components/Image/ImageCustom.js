import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button";
import styles from "./Image.module.scss";
import classNames from "classnames/bind";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function ImageCustom({
  src,
  alt = "image",
  position = "betweenBottom",
  onClick,
  width = 100,
  height,
  onDragEnd,
  onDragStart,
}) {
  const cx = classNames.bind(styles);
  return (
    <div className={cx("wrapper")}>
      <img
        src={src}
        alt={alt}
        draggable={true}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      />
      <Button primary onlyIcon onClick={onClick} className={cx("topRight")}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </div>
  );
}

export default ImageCustom;
