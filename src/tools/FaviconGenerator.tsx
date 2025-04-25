import { useRef, useState } from "react";

export default function FaviconGenerator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [emoji, setEmoji] = useState("🚀");

  const drawFavicon = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear & draw background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw emoji or text
    ctx.font = "96px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(emoji, canvas.width / 2, canvas.height / 2);
  };

  const downloadFavicon = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "favicon.png";
    link.href = canvas ? canvas.toDataURL("image/png") : "";
    link.click();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Favicon Generator</h2>
      <input
        type="text"
        value={emoji}
        onChange={(e) => setEmoji(e.target.value)}
        maxLength={2}
        className="border p-2 mr-2"
        placeholder="Enter emoji or letter"
      />
      <button onClick={drawFavicon} className="px-3 py-1 bg-blue-500 text-white rounded mr-2">
        Generate
      </button>
      <button onClick={downloadFavicon} className="px-3 py-1 bg-green-500 text-white rounded">
        Download
      </button>

      <div className="mt-4">
        <canvas ref={canvasRef} width="64" height="64" className="border" />
      </div>
    </div>
  );
}
