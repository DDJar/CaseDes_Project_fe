import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateRight,
  faBold,
  faBroom,
  faCartShopping,
  faCircle,
  faCircleChevronDown,
  faCircleChevronUp,
  faCloudArrowUp,
  faFloppyDisk,
  faImage,
  faItalic,
  faLinesLeaning,
  faObjectGroup,
  faPencil,
  faRotateLeft,
  faSquareFull,
  faTextWidth,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faMeetup } from "@fortawesome/free-brands-svg-icons";

import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import rough from "roughjs/bundled/rough.esm";
import classNames from "classnames/bind";

import backgroundImageSamsung from "../../images/phoneCaseSamsung.jpg";
import backgroundImageIphone from "../../images/phoneCase_1.jpg";
import useHistory from "../../hooks/useHistory";
import {
  adjustElementCoordinates,
  adjustmentRequired,
  createElement,
  cursorForPosition,
  drawElement,
  getElementAtPosition,
  resizedCoordinates,
} from "../../helpers";
import textFonts from "../../data/textFonts";
import tools from "../../attitude/tools";
import actions from "../../attitude/actions";
import positions from "../../attitude/positions";
import {
  phoneCaseDesignGetById,
  phoneCaseDesignPost,
} from "../../fetchData/phoneCaseDesign";

import Button from "../Button";
import Label from "../Label";
import Modal from "../Modal";
import ImageCustom from "../Image";
import styles from "./ExodDraw.module.scss";

//test Json API
import phoneModels from "../../constants/phoneModels";
function ExodDraw() {
  const cx = classNames.bind(styles);

  const [initElements, setInitElements] = useState(null);
  const [elements, setElements, undo, redo] = useHistory([]);
  const [action, setAction] = useState("none");
  const [tool, setTool] = useState(tools.text);
  const [client, setClient] = useState({ x: 0, y: 0 });
  const [onImgOffset, setOnImgOffset] = useState({ x: 0, y: 0 });
  const [selectedElement, setSelectedElement] = useState("null");
  const [imagesUpload, setImagesUpload] = useState([]);
  const sizeRef = useRef(3);
  const canvasRef = useRef();
  const textAreaRef = useRef();
  const imagesUploadRef = useRef();
  const [sizeCanvas, setSizeCanvas] = useState({ width: 0, height: 0 });
  const [phoneModelImage, setPhoneModelImage] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState(backgroundImageIphone);
  const [textStyle, setTextStyle] = useState({
    font: textFonts[0],
    bold: false,
    underline: false,
    italic: false,
  });
  const [size, setSize] = useState(sizeRef.current);
  const [color, setColor] = useState("#000000");
  const maxSize = 160;
  const minSize = 0;
  const pramas = useParams();
  const inforPhoneCase = {
    phoneBrand: "Iphone",
    phoneModel: "Iphone15",
    price: 15,
    style: "bo góc",
    material: "Nhựa dẻo",
    color: "Cam",
  };
  const phoneBrands = ["Iphone", "Samsung"];
  const [phoneBrand, setPhoneBrand] = useState(phoneBrands[0]);

  async function getPhoneCaseDesignById(id) {
    try {
      const res = await phoneCaseDesignGetById(id);
      if (res.status === 200) {
        setInitElements(res.data.elements);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (pramas.id) {
      getPhoneCaseDesignById(pramas.id);
    }
  }, [pramas.id]);
  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
    const ratio = img.width / 300;
    img.width = 300;
    img.height = img.height / ratio;
    setSizeCanvas({ width: img.width, height: img.height });
    img.onload = () => {
      setPhoneModelImage(img);
    };
  }, [backgroundImage]);
  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    const roughCanvas = rough.canvas(canvas);
    if (phoneModelImage) {
      context.drawImage(
        phoneModelImage,
        0,
        0,
        phoneModelImage.width,
        phoneModelImage.height
      );
    }
    if (initElements !== null) {
      setElements(initElements);
      setInitElements(null);
    }

    elements.forEach((element) => {
      if (action === actions.writing && selectedElement.id === element.id)
        return;
      drawElement(roughCanvas, context, element);
    });
  }, [
    elements,
    selectedElement.id,
    action,
    phoneModelImage,
    initElements,
    setElements,
  ]);

  useEffect(() => {
    const undoRedoFunction = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "z") {
        if (event.shiftkey) {
          redo();
        } else {
          undo();
        }
      }
    };
    document.addEventListener("keydown", undoRedoFunction);
    return () => {
      document.addEventListener("keydown", undoRedoFunction);
    };
  }, [undo, redo]);

  useEffect(() => {
    if (action === actions.writing) {
      textAreaRef.current.focus();
      textAreaRef.current.value = selectedElement.options.text;
    }
  }, [action, selectedElement]);
  const updateElement = (id, x1, y1, x2, y2, type, options) => {
    const elementsCopy = [...elements];
    switch (type) {
      case tools.line:
      case tools.rectangle:
        elementsCopy[id] = createElement(id, x1, y1, x2, y2, type, options);
        break;
      case tools.pencil:
        elementsCopy[id].points = [
          ...elementsCopy[id].points,
          { x: x2, y: y2 },
        ];
        break;
      case tools.text:
        const textWidth = document
          .getElementById("canvas")
          .getContext("2d")
          .measureText(options.text).width;
        const textHeight = 24;
        elementsCopy[id] = createElement(
          id,
          x1,
          y1,
          x1 + textWidth,
          y1 + textHeight,
          type,
          options
        );
        break;
      case tools.image:
        elementsCopy[id] = createElement(id, x1, y1, x2, y2, type, options);
        break;
      default:
        throw new Error(`Type not recognised: ${type}`);
    }
    setElements(elementsCopy, true);
  };
  function handleMouseDown(event) {
    const { offsetX, offsetY } = event.nativeEvent;
    setClient({ x: event.clientX, y: event.clientY });
    if (tool === tools.selection) {
      const element = getElementAtPosition(offsetX, offsetY, elements);
      if (element) {
        if (element.type === tools.pencil) {
          const xOffsets = element.points.map((point) => offsetX - point.x);
          const yOffsets = element.points.map((point) => offsetY - point.y);
          setSelectedElement({ ...element, xOffsets, yOffsets });
        } else {
          const offsetX_ = offsetX - element.x1;
          const offsetY_ = offsetY - element.y1;
          setSelectedElement({ ...element, offsetX_, offsetY_ });
        }
        setElements((prevState) => prevState);

        if (element.position === positions.inside) {
          setAction(actions.moving);
        } else {
          setAction(actions.resizing);
        }
      }
    } else {
      const id = elements.length;
      const element = createElement(
        id,
        offsetX,
        offsetY,
        offsetX,
        offsetY,
        tool,
        {
          size: size,
          color: color,
          text: "",
          textStyle,
        }
      );
      setElements((preElements) => [...preElements, element]);
      setSelectedElement(element);

      setAction(tool === tools.text ? actions.writing : actions.drawing);
    }
  }
  function handleMouseMove(event) {
    const { offsetX, offsetY } = event.nativeEvent;
    if (tool === tools.selection) {
      const element = getElementAtPosition(offsetX, offsetY, elements);
      event.target.style.cursor = element
        ? cursorForPosition(element.position)
        : "default";
    }

    switch (action) {
      case actions.drawing: {
        const index = elements.length - 1;
        const { x1, y1, options } = elements[index];
        updateElement(index, x1, y1, offsetX, offsetY, tool, options);
        break;
      }
      case actions.moving: {
        if (selectedElement.type === tools.pencil) {
          const newPoints = selectedElement.points.map((_, index) => ({
            x: offsetX - selectedElement.xOffsets[index],
            y: offsetY - selectedElement.yOffsets[index],
          }));
          const elementsCopy = [...elements];
          elementsCopy[selectedElement.id].points = newPoints;
          setElements(elementsCopy, true);
        } else {
          const { id, x1, x2, y1, y2, type, offsetX_, offsetY_, options } =
            selectedElement;
          const width = x2 - x1;
          const height = y2 - y1;
          const nexX1 = offsetX - offsetX_;
          const nexY1 = offsetY - offsetY_;
          updateElement(
            id,
            nexX1,
            nexY1,
            nexX1 + width,
            nexY1 + height,
            type,
            options
          );
        }
        break;
      }
      case actions.resizing: {
        const { id, type, position, options, ...coordinates } = selectedElement;
        const { x1, x2, y1, y2 } = resizedCoordinates(
          offsetX,
          offsetY,
          position,
          coordinates
        );
        updateElement(id, x1, y1, x2, y2, type, options);
        break;
      }
      default:
        break;
    }
  }
  function handleMouseUp(event) {
    const { offsetX, offsetY } = event.nativeEvent;
    if (selectedElement) {
      if (
        selectedElement.type === tools.text &&
        offsetX - selectedElement.offsetX_ === selectedElement.x1 &&
        offsetY - selectedElement.offsetY_ === selectedElement.y1
      ) {
        setSize(selectedElement.options.size);
        setColor(selectedElement.options.color);

        const x = event.clientX - (offsetX - selectedElement.x1);
        const y = event.clientY - (offsetY - selectedElement.y1);
        setClient({ x: x, y: y });
        setAction(actions.writing);
        return;
      }
      const index = selectedElement.id;
      const { id, type, options } = elements[index]
        ? elements[index]
        : { id: 0, type: actions.resizing };
      if (
        (action === actions.drawing || action === actions.resizing) &&
        adjustmentRequired(type)
      ) {
        const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
        updateElement(id, x1, y1, x2, y2, type, options);
      }
    }
    if (action === actions.writing) {
      return;
    }
    setAction(actions.none);
    setSelectedElement("null");
  }
  function clear() {
    setElements([]);
  }
  function save() {
    // console.log(elements);
  }
  const storedUsername = Cookies.get("info");

  async function handleSubmit() {
    var dataURL = canvasRef.current.toDataURL("image/jpg", 1.0);
    var userData = null;
    if (storedUsername) {
      userData = JSON.parse(storedUsername);
    }
    const data = {
      userId: "12345678",
      name: userData ? userData.firstName + " " + userData.lastName : "Default",
      description: inforPhoneCase.description,
      image: JSON.stringify(dataURL),
      phoneBrand: inforPhoneCase.phoneBrand,
      phoneModel: inforPhoneCase.phoneModel,
      elements: elements,
      price: inforPhoneCase.price,
    };
    try {
      const res = await phoneCaseDesignPost(data);
    } catch (error) {
      console.log(error);
    }
  }
  function handleDownload() {
    // downloadImage(dataURL, "my-canvas.jpg");
    // function downloadImage(data, filename = "untitled.jpg") {
    //   var a = document.createElement("a");
    //   a.href = data;
    //   a.download = filename;
    //   document.body.appendChild(a);
    //   a.click();
    //   document.body.removeChild(a);
    // }
  }
  function handleSize(condition) {
    switch (condition) {
      case "-":
        if (size >= minSize) {
          setSize((preSize) => preSize - 1);
        }
        break;
      case "+":
        if (size < maxSize) {
          setSize((preSize) => preSize + 1);
        }
        break;

      default:
        break;
    }
  }
  function handleOnChangeSize(value) {
    if (value > maxSize) {
      setSize(maxSize);
    } else {
      if (value <= minSize) {
        setSize(1);
      } else {
        setSize(value);
      }
    }
  }
  function handleOnChangeColor(value) {
    setColor(value);
  }

  function handleBlur(event) {
    const { id, x1, y1, type, options } = selectedElement;

    setAction(actions.none);
    setSelectedElement("null");
    options.text = event.target.value;
    options.size = size;
    options.color = color;
    options.textStyle = textStyle;
    updateElement(id, x1, y1, null, null, type, options);
  }
  function handleOnChangeTextFont(event) {
    setTextStyle((preStyle) => ({ ...preStyle, font: event.target.value }));
  }

  function handleOnChangeImage(event) {
    const files = event.target.files;
    if (files && files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        if (!imagesUpload.includes(e.target.result)) {
          setImagesUpload((prevState) => [...prevState, e.target.result]);
        }
      };

      reader.readAsDataURL(files[0]);
    }
  }
  function handleDragStart(event) {
    const { offsetX, offsetY } = event.nativeEvent;
    setOnImgOffset({ x: offsetX, y: offsetY });
    setTool(tools.image);
  }

  function handleDragEnd(event) {
    const { clientX, clientY } = event;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    setTool(tools.image);

    const topLeftImg = {
      x: clientX - onImgOffset.x,
      y: clientY - onImgOffset.y,
    };

    const xPositionOnCanvas = topLeftImg.x - rect.x;
    const yPositionOnCanvas = topLeftImg.y - rect.y;

    // check image in canvas
    if (
      !(
        xPositionOnCanvas >= 0 &&
        xPositionOnCanvas <= canvas.width &&
        yPositionOnCanvas >= 0 &&
        yPositionOnCanvas <= canvas.height
      )
    ) {
      return;
    }
    const img = new Image();
    img.src = event.target.src;
    img.onload = function () {
      const element = createElement(
        elements.length,
        xPositionOnCanvas,
        yPositionOnCanvas,
        xPositionOnCanvas + event.target.width,
        yPositionOnCanvas + event.target.height,
        tools.image,
        { size: size, color: color, text: "", textStyle, image: img.src }
      );
      setElements((prevElements) => [...prevElements, element]);
      setSelectedElement(element);
    };

    setTool(tools.selection);
  }

  function handleRemoveImageUpload(index) {
    setImagesUpload((prevImagesUpload) =>
      prevImagesUpload.filter((_, i) => i !== index)
    );
  }
  function handleChangeBrand(brand) {
    setPhoneBrand(brand);
    if(brand === "Iphone"){
    console.log("iphone")
      setBackgroundImage(backgroundImageIphone)
    } else {
      setBackgroundImage(backgroundImageSamsung)
    }
  }
  return (
    <div className={cx("wrapper")}>
      <div className={cx("toolsBar")}>
        <div className={cx("toolsDraw")}>
          <div>
            <input
              type="radio"
              id="selection"
              checked={tool === tools.selection}
              onChange={() => setTool(tools.selection)}
              hidden
            />
            <Label
              {...(tool === tools.selection
                ? { primary: true }
                : { outline: true })}
              small
              htmlFor="selection"
              leftIcon={<FontAwesomeIcon icon={faObjectGroup} />}
            >
              Selection
            </Label>

            <input
              type="radio"
              id="line"
              checked={tool === tools.line}
              onChange={() => setTool(tools.line)}
              hidden
            />

            <Label
              {...(tool === tools.line ? { primary: true } : { outline: true })}
              small
              htmlFor="line"
              leftIcon={<FontAwesomeIcon icon={faLinesLeaning} />}
            >
              Line
            </Label>

            <input
              type="radio"
              id="rectangle"
              checked={tool === tools.rectangle}
              onChange={() => setTool(tools.rectangle)}
              hidden
            />

            <Label
              {...(tool === tools.rectangle
                ? { primary: true }
                : { outline: true })}
              small
              htmlFor="rectangle"
              leftIcon={<FontAwesomeIcon icon={faSquareFull} />}
            >
              Rectangle
            </Label>
            <input
              type="radio"
              id="pencil"
              checked={tool === tools.pencil}
              onChange={() => setTool(tools.pencil)}
              hidden
            />

            <Label
              {...(tool === tools.pencil
                ? { primary: true }
                : { outline: true })}
              small
              htmlFor="pencil"
              leftIcon={<FontAwesomeIcon icon={faPencil} />}
            >
              Pencil
            </Label>

            <input
              type="radio"
              id="text"
              checked={tool === tools.text}
              onChange={() => setTool(tools.text)}
              hidden
            />
            <Label
              {...(tool === tools.text ? { primary: true } : { outline: true })}
              small
              htmlFor="text"
              leftIcon={<FontAwesomeIcon icon={faTextWidth} />}
            >
              Text
            </Label>
          </div>
        </div>
        <div className={cx("toolsStyle")}>
          <input
            type="color"
            onChange={(e) => handleOnChangeColor(e.target.value)}
            id="color"
            hidden
          />
          <Label
            text
            circle
            onlyIcon
            htmlFor="color"
            style={{ color: `${color}`, fontSize: "25px" }}
          >
            <FontAwesomeIcon icon={faCircle} />
          </Label>
          <input
            type="checkbox"
            id="bold"
            checked={textStyle.bold}
            onChange={() =>
              setTextStyle((preStyle) => ({
                ...preStyle,
                bold: !textStyle.bold,
              }))
            }
            hidden
          />
          <Label
            {...(textStyle.bold ? { primary: true } : { outline: true })}
            small
            htmlFor="bold"
            leftIcon={<FontAwesomeIcon icon={faBold} />}
          >
            Bold
          </Label>
          <input
            type="checkbox"
            id="italic"
            checked={textStyle.italic}
            onChange={() =>
              setTextStyle((preStyle) => ({
                ...preStyle,
                italic: !textStyle.italic,
              }))
            }
            hidden
          />
          <Label
            {...(textStyle.italic ? { primary: true } : { outline: true })}
            small
            htmlFor="italic"
            leftIcon={<FontAwesomeIcon icon={faItalic} />}
          >
            Italic
          </Label>
          <select
            className=""
            value={textStyle.font}
            onChange={handleOnChangeTextFont}
            style={{ height: "34px" }}
          >
            {textFonts.map((textFont, index) => (
              <option value={textFont} key={index}>
                {textFont}
              </option>
            ))}
          </select>
          <Button text small onClick={() => handleSize("-")}>
            <FontAwesomeIcon icon={faCircleChevronDown} />
          </Button>
          <input
            className=""
            type="number"
            ref={sizeRef}
            value={size}
            onChange={(e) => handleOnChangeSize(e.target.value)}
            style={{ width: "70px" }}
          />
          <Button text small onClick={() => handleSize("+")}>
            <FontAwesomeIcon icon={faCircleChevronUp} />
          </Button>
        </div>
        <div className={cx("image")}>
          <input
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
            multiple={true}
            id="imagesUpload"
            ref={imagesUploadRef}
            onChange={handleOnChangeImage}
            hidden
          />
          <Label
            outline
            large
            htmlFor="imagesUpload"
            leftIcon={<FontAwesomeIcon icon={faCloudArrowUp} />}
          >
            Upload
          </Label>

          {imagesUpload.map((imgSrc, index) => (
            <span key={index} style={{ width: "20px" }}>
              <ImageCustom
                src={imgSrc}
                width={100}
                onClick={() => handleRemoveImageUpload(index)}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              ></ImageCustom>
            </span>
          ))}
        </div>
      </div>

      {action === actions.writing ? (
        <textarea
          ref={textAreaRef}
          onDoubleClick={handleBlur}
          rows="1"
          style={{
            position: "fixed",
            top: client.y - 5,
            left: client.x,
            fontSize: `${size}px`,
            fontFamily: `${textStyle.font}`,
            color: `${color}`,
            margin: 0,
            padding: 0,
            // border: 0,
            outline: 0,
            resize: "auto",
            overflow: "hidden",
            whiteSpace: "pre",
            background: "transparent",
            minWidth: "100px",
            maxWidth: "200px",
            fontWeight: `${textStyle.bold ? "bold" : ""}`,
            textDecoration: `${textStyle.underline ? "underline" : ""}`,
            fontStyle: `${textStyle.italic ? "italic" : ""}`,
          }}
          spellCheck="false"
        />
      ) : null}
      <div className="draw">
        <div className={cx("toolsEdit")}>
          <div>
            <Button outline onlyIcon onClick={undo}>
              <FontAwesomeIcon icon={faRotateLeft} />
            </Button>
            <Button outline onlyIcon onClick={redo}>
              <FontAwesomeIcon icon={faArrowRotateRight} />
            </Button>
            <Button outline onlyIcon onClick={save}>
              <FontAwesomeIcon icon={faFloppyDisk} />
            </Button>
            <Button outline onlyIcon onClick={clear}>
              <FontAwesomeIcon icon={faBroom} />
            </Button>
          </div>
          <Modal btnName="Preview and Buy" outline>
            <div className={cx("card__image__btn_Modal")}>
              <div>
                <img
                  //   src={JSON.parse(template.image)}
                  alt="Person"
                  className={cx("card__image_Modal")}
                />
              </div>
              <div>
                <ul className={cx("details")}>
                  <li>phoneModel: {inforPhoneCase.phoneModel}</li>
                  <li>style: {inforPhoneCase.style}</li>
                  <li>material: {inforPhoneCase.material}</li>
                  <li>color: {inforPhoneCase.color}</li>
                  <li>price: {inforPhoneCase.price}</li>
                </ul>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="isPublicCheck"
                  checked={isPublic}
                  onChange={() => setIsPublic(!isPublic)}
                  hidden
                />
                <Label
                  {...(isPublic ? { primary: true } : { outline: true })}
                  small
                  htmlFor="isPublicCheck"
                  leftIcon={<FontAwesomeIcon icon={faBold} />}
                >
                  Public
                </Label>{" "}
                Do you want to publish your design? You will receive a
                commission!
              </div>
            </div>
            <div>
              <Button outline onClick={handleDownload}>
                Download
              </Button>
              <Button primary onClick={handleSubmit}>
                BUY
              </Button>
            </div>
          </Modal>
          <Modal btnName="Select Phone Model" outline>
            <div className={cx("card__image__btn_Modal")}>
              <div className={cx("imagephoneCase")}>
                {phoneBrand === "Iphone" ? (
                  <img
                    src={backgroundImage}
                    alt="Person"
                    className={cx("card__image_Modal")}
                  />
                ) : (
                  <img
                    src={backgroundImageSamsung}
                    alt="Person"
                    className={cx("card__image_Modal")}
                  />
                )}
              </div>

              <div className={cx("selectPhoneCase")}>
                <div>
                  {phoneBrands.map((brand, index) => (
                    <span key={index}>
                      <input
                        type="radio"
                        id={`selectIphone${index}`}
                        checked={phoneBrand === brand}
                        onChange={() => handleChangeBrand(brand)}
                        hidden
                      />
                      <Label
                        {...(phoneBrand === brand
                          ? { primary: true }
                          : { outline: true })}
                        small
                        htmlFor={`selectIphone${index}`}
                        leftIcon={<FontAwesomeIcon icon={faObjectGroup} />}
                      >
                        {brand}
                      </Label>
                    </span>
                  ))}
                </div>
                {phoneBrand === "Iphone"
                  ? phoneModels.iphone.map((phoneCase) => (
                      <Button text key={phoneCase._id}>
                        {phoneCase.phoneModel}
                      </Button>
                    ))
                  : phoneModels.samsung.map((phoneCase) => (
                      <Button text key={phoneCase._id}>
                        {phoneCase.phoneModel}
                      </Button>
                    ))}
              </div>
            </div>
          </Modal>
        </div>
        <div className={cx("canvas")}>
          <canvas
            id="canvas"
            style={{
              border: "1px solid red",
              // backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
            width={sizeCanvas.width}
            height={sizeCanvas.height}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            ref={canvasRef}
          ></canvas>
        </div>
      </div>
    </div>
  );
}

export default ExodDraw;
