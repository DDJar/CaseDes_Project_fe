import { useEffect, useRef, useState } from "react";

function Draw() {
  const posStart = useRef({ x: 0, y: 0 });

  const posEnd = useRef({ x: 0, y: 0 });
  const isDraw = useRef(false);
  useEffect(() => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    canvas.addEventListener("mousedown", (e) => {
      posStart.current = {
        x: e.offsetX,
        y: e.offsetY,
      };
      isDraw.current = true;
    });
    canvas.addEventListener("mouseup", (e) => {
      isDraw.current = false;
    });

    canvas.addEventListener("mousemove", (e) => {
      if (isDraw.current) {
        posEnd.current = {
          x: e.offsetX,
          y: e.offsetY,
        };
        var sizeSet = size / 2;
        ctx.beginPath();
        ctx.arc(
          posStart.current.x,
          posStart.current.y,
          sizeSet,
          0,
          2 * Math.PI
        );
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(posStart.current.x, posStart.current.y);
        ctx.lineTo(posEnd.current.x, posEnd.current.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
        ctx.stroke();

        posStart.current.x = posEnd.current.x;
        posStart.current.y = posEnd.current.y;
      }
    });
  });

  const sizeRef = useRef(20);
  const canvasRef = useRef();

  const [size, setSize] = useState(sizeRef.current);
  const [color, setColor] = useState("#000000");

  function handleSize(condition) {
    switch (condition) {
      case "-":
        if (size >= 0) {
          setSize((preSize) => preSize - 1);
        }
        break;
      case "+":
        if (size < 30) {
          setSize((preSize) => preSize + 1);
        }
        break;

      default:
        break;
    }
  }
  function handleOnChangeSize(value) {
    if (value > 30) {
      setSize(30);
    } else {
      if (value <= 0) {
        setSize(1);
      } else {
        setSize(value);
      }
    }
  }
  function handleOnChangeColor(value) {
    setColor(value);
  }
  return (
    <>
      <div className="header">
        <input
          type="color"
          onChange={(e) => handleOnChangeColor(e.target.value)}
        />
        <div>
          <button onClick={() => handleSize("-")}>-</button>
          <input
            type="number"
            ref={sizeRef}
            value={size}
            onChange={(e) => handleOnChangeSize(e.target.value)}
          />
          <button onClick={() => handleSize("+")}>+</button>
        </div>
        <button>Save</button>
        <button>Clear</button>
      </div>

      <canvas
        id="myCanvas"
        width="400"
        height="500"
        style={{ border: "1px solid grey" }}
        ref={canvasRef}
      ></canvas>
    </>
  );
}

export default Draw;
