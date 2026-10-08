import React, { useRef, useState, useEffect } from 'react';
import { Eraser, RotateCcw, Volume2, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { playJapaneseSpeech, playChime } from '../utils/audio';

interface StrokeCanvasProps {
  character: string;
  reading?: string;
  meaning?: string;
  strokeCount?: number;
  className?: string;
}

export const StrokeCanvas: React.FC<StrokeCanvasProps> = ({
  character,
  reading,
  meaning,
  strokeCount,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showWatermark, setShowWatermark] = useState(true);
  const [strokeHistory, setStrokeHistory] = useState<ImageData[]>([]);
  const [drawnCount, setDrawnCount] = useState(0);
  const [brushType, setBrushType] = useState<'brush' | 'pen'>('brush');

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset canvas dimensions to match display size for crisp resolution
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    clearCanvas();
  }, [character]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    setStrokeHistory([]);
    setDrawnCount(0);
  };

  const undoLastStroke = () => {
    const canvas = canvasRef.current;
    if (!canvas || strokeHistory.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    playChime('click');
    const newHistory = [...strokeHistory];
    newHistory.pop(); // Remove current
    setStrokeHistory(newHistory);
    setDrawnCount(Math.max(0, drawnCount - 1));

    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    if (newHistory.length > 0) {
      ctx.putImageData(newHistory[newHistory.length - 1], 0, 0);
    }
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else if ('clientX' in e) {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
    return { x: 0, y: 0 };
  };

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setStrokeHistory(prev => [...prev, imgData]);
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveState();
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#1c1917'; // stone-900
    ctx.lineWidth = brushType === 'brush' ? 14 : 7;
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    setDrawnCount(prev => prev + 1);
  };

  const handlePlayAudio = () => {
    playChime('click');
    playJapaneseSpeech(character);
  };

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Top Header info */}
      <div className="w-full flex items-center justify-between mb-3 text-stone-700">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg text-stone-900">{character}</span>
            {reading && <span className="text-sm text-stone-600 font-jp">{reading}</span>}
            <button
              onClick={handlePlayAudio}
              title="Pronounce character"
              className="p-1 rounded text-stone-500 hover:text-amber-700 hover:bg-stone-200 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          {meaning && <p className="text-xs text-stone-500 mt-0.5">{meaning}</p>}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-stone-500">
          {strokeCount && (
            <span>Target: {strokeCount} strokes</span>
          )}
          {drawnCount > 0 && (
            <span className="font-mono text-stone-800 font-medium">({drawnCount} drawn)</span>
          )}
        </div>
      </div>

      {/* Canvas Drawing Container */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 bg-stone-50 border-2 border-stone-300 rounded-xl shadow-inner overflow-hidden flex items-center justify-center">
        {/* Genkō yōshi grid background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Vertical dashed center line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0 border-l border-dashed border-stone-300 -translate-x-1/2" />
          {/* Horizontal dashed center line */}
          <div className="absolute left-0 right-0 top-1/2 h-0 border-t border-dashed border-stone-300 -translate-y-1/2" />
          {/* Diagonal guidelines */}
          <svg className="absolute inset-0 w-full h-full stroke-stone-200" strokeDasharray="3 3">
            <line x1="0" y1="0" x2="100%" y2="100%" />
            <line x1="100%" y1="0" x2="0" y2="100%" />
          </svg>
        </div>

        {/* Faint character watermark guide */}
        {showWatermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="text-[140px] sm:text-[160px] font-jp font-light text-stone-200/90 leading-none">
              {character}
            </span>
          </div>
        )}

        {/* User interactive drawing canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      {/* Control Actions */}
      <div className="w-full flex items-center justify-between mt-3.5 pt-2 border-t border-stone-200">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setBrushType('brush')}
            className={`px-2.5 py-1 text-xs rounded transition-colors ${
              brushType === 'brush'
                ? 'bg-stone-800 text-white font-medium'
                : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            Brush
          </button>
          <button
            onClick={() => setBrushType('pen')}
            className={`px-2.5 py-1 text-xs rounded transition-colors ${
              brushType === 'pen'
                ? 'bg-stone-800 text-white font-medium'
                : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            Pen
          </button>
          <button
            onClick={() => setShowWatermark(!showWatermark)}
            title={showWatermark ? 'Hide guide watermark' : 'Show guide watermark'}
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-stone-600 hover:bg-stone-200 rounded transition-colors"
          >
            {showWatermark ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>Guide</span>
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={undoLastStroke}
            disabled={strokeHistory.length === 0}
            title="Undo stroke"
            className="p-1.5 text-stone-600 hover:bg-stone-200 rounded disabled:opacity-40 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={clearCanvas}
            title="Clear canvas"
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-stone-700 hover:bg-rose-50 hover:text-rose-700 rounded transition-colors"
          >
            <Eraser className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>
    </div>
  );
};
