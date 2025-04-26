// General
import { useState, useEffect } from 'react';
import { HuePicker, AlphaPicker } from 'react-color';
// @ts-ignore
import ColorThief from 'colorthief';
import { CSS } from '@dnd-kit/utilities';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
} from '@dnd-kit/sortable';

// Components
import CopyInput from '../components/CopyInput';

// Icons
import { FaDice, FaBackspace, FaPalette, FaImage } from 'react-icons/fa';
import { TbColorPicker } from "react-icons/tb";
import { CgTrashEmpty } from "react-icons/cg";

export default function ColorPicker() {

    const [selectedColorType, setSelectedColorType] = useState<string>('HEX');
    const [pickedColor, setPickedColor] = useState<string | null>(null);
    const [colorPalette, setColorPalette] = useState<string[]>([]);
    const [previsousColors, setPreviousColors] = useState<string[]>([]);

    // Set a random color on initial render
    useEffect(() => {
        setPickedColor(generateRandomColor());
    }, []);

    useEffect(() => {
        if (pickedColor) {
            handleAddPreviousColor(pickedColor);
        }
    }, [pickedColor]);

    // Generate a random color
    const generateRandomColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    };

    const handlePicker = async () => {
        interface EyeDropperConstructor {
            new (): { open: () => Promise<{ sRGBHex: string }> };
        }
        const EyeDropper = (window as unknown as { EyeDropper: EyeDropperConstructor }).EyeDropper;
        if (EyeDropper) {
            const eyeDropper = new EyeDropper();
            const result = await eyeDropper.open();
            setPickedColor(result.sRGBHex);
            console.log(result.sRGBHex);
        } else {
            alert("EyeDropper not supported");
        }
    };

    const handleRandomColor = () => {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        setPickedColor(randomColor);
        console.log(randomColor);
    }

    const handleHueChange = (color: { hex: string }) => {
        setPickedColor(color.hex);
        console.log(color.hex);
    };
    
    const handleAlphaChange = (color: { rgb: { r: number; g: number; b: number; a?: number } }) => {
        const { r, g, b, a } = color.rgb;
        const alpha = a !== undefined ? a : 1; // Default alpha to 1 if undefined
        const updatedColor = convertColorBetweenTypes(`rgba(${r}, ${g}, ${b}, ${alpha})`, 'RGB', selectedColorType);
        setPickedColor(updatedColor);
    };

    const handlePreviousColor = () => {
        if (previsousColors.length > 0) {
            const lastColor = previsousColors[previsousColors.length - 1];
            setPickedColor(lastColor); // Set the picked color to the last color
            setPreviousColors(previsousColors.slice(0, -1)); // Remove the last color from the array
        }
    };

    const addToPalette = () => {
        if (pickedColor && !colorPalette.includes(pickedColor)) {
            if (colorPalette.length < 8) {
                setColorPalette([...colorPalette, pickedColor]);
            } else {
                alert("You can only have up to 8 colors in the palette.");
            }
        }
    };

    const removeFromPalette = (color: string) => {
        setColorPalette(colorPalette.filter((c) => c !== color));
    };

    // Handle image upload and extract dominant color
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imgUrl = URL.createObjectURL(file);
            // Extract the dominant color from the image
            const img = new Image();
            img.src = imgUrl;
            img.onload = () => {
                const colorThief = new ColorThief();
                const dominantColor = colorThief.getColor(img);
                setPickedColor(`rgb(${dominantColor.join(",")})`);
                console.log(dominantColor);
            };
        }
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: import('@dnd-kit/core').DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setColorPalette((items) => {
                const oldIndex = items.indexOf(active.id as string);
                const newIndex = items.indexOf(over.id as string);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleColorConversion = (toType: string) => {
        if (pickedColor) {
            const convertedColor = convertColorBetweenTypes(pickedColor, selectedColorType, toType);
            setPickedColor(convertedColor);
            setSelectedColorType(toType);
        }
    };

    const convertColorBetweenTypes = (color: string, fromType: string, toType: string): string => {
        const hexToRgb = (hex: string): [number, number, number, number] => {
            const bigint = parseInt(hex.slice(1), 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            const a = hex.length === 9 ? parseInt(hex.slice(7, 9), 16) / 255 : 1; // Handle alpha
            return [r, g, b, a];
        };
    
        const rgbToHex = (r: number, g: number, b: number, a: number): string => {
            const alphaHex = Math.round(a * 255).toString(16).padStart(2, '0');
            return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}${alphaHex}`;
        };
    
        const rgbToHsl = (r: number, g: number, b: number, a: number): string => {
            r /= 255;
            g /= 255;
            b /= 255;
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h = 0,
                s = 0;
            const l = (max + min) / 2;
    
            if (max !== min) {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }
                h /= 6;
            }
    
            return `hsla(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, ${a})`;
        };
    
        const hslToRgb = (h: number, s: number, l: number, a: number): [number, number, number, number] => {
            h /= 360;
            s /= 100;
            l /= 100;
            let r, g, b;
    
            if (s === 0) {
                r = g = b = l; // achromatic
            } else {
                const hue2rgb = (p: number, q: number, t: number) => {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1 / 6) return p + (q - p) * 6 * t;
                    if (t < 1 / 2) return q;
                    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                };
    
                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;
                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }
    
            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), a];
        };
    
        if (fromType === toType) return color;
    
        let r, g, b, a;
    
        if (fromType === 'HEX') {
            [r, g, b, a] = hexToRgb(color);
        } else if (fromType === 'RGB') {
            [r, g, b, a] = color
                .replace(/[^\d,.]/g, '')
                .split(',')
                .map(Number);
        } else if (fromType === 'HSL') {
            const [h, s, l, alpha] = color
                .replace(/[^\d,.]/g, '')
                .split(',')
                .map(Number);
            [r, g, b, a] = hslToRgb(h, s, l, alpha);
        }
    
        if (toType === 'HEX') {
            return rgbToHex(r ?? 0, g ?? 0, b ?? 0, a ?? 1);
        } else if (toType === 'RGB') {
            return `rgba(${r}, ${g}, ${b}, ${a})`;
        } else if (toType === 'HSL') {
            return rgbToHsl(r ?? 0, g ?? 0, b ?? 0, a ?? 1);
        }
    
        return color;
    };

    const handleAddPreviousColor = (color: string) => {
        if (!previsousColors.includes(color)) {
            setTimeout(() => {
                setPreviousColors((prevColors) => {
                    if (!prevColors.includes(color)) {
                        return [...prevColors, color];
                    }
                    return prevColors;
                });
            }, 2000); // Add the color after 2 seconds
        }
    };

    return (
        <>
            <div className='colorsection'>
                <div className='colorpicker' style={{ width: '80%' }}>
                    <div className='color_types'>
                        <h2>Color Picker</h2>
                        <button className={`btn ${selectedColorType === 'HEX' ? 'btn-selected' : ''}`} onClick={() => handleColorConversion('HEX')}>HEX</button>
                        <button className={`btn ${selectedColorType === 'RGB' ? 'btn-selected' : ''}`} onClick={() => handleColorConversion('RGB')}>RGB</button>
                        <button className={`btn ${selectedColorType === 'HSL' ? 'btn-selected' : ''}`} onClick={() => handleColorConversion('HSL')}>HSL</button>
                    </div>
                    <div className="colorpicker_show" style={{ backgroundColor: pickedColor || '' }}></div>
                    <HuePicker width='100%' color={pickedColor || "#000000"} onChange={handleHueChange} />
                    <AlphaPicker width='100%' color={pickedColor || "#000000"} onChange={handleAlphaChange} />
                    <CopyInput value={pickedColor || '#000000'} />
                    <div className='colorpicker_buttons'>
                        <button className="btn" title='Picker' onClick={handlePicker}><TbColorPicker /> Picker</button>    
                        <button className="btn" title='Random' onClick={handleRandomColor}><FaDice /> Random</button>
                        <button className='btn' title="Previous" disabled={previsousColors.length == 0 ? true : false} onClick={handlePreviousColor}><FaBackspace /> Previous</button>
                        <button className="btn" title="Add to Palette" onClick={addToPalette}><FaPalette /> Add to Palette</button>
                        <button className="btn" title='Upload Image' onClick={() => document.getElementById('file-upload')?.click()}><FaImage  /> Upload Image</button>
                        <input type="file" id="file-upload" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                    </div>
                </div>
                <div style={{ width: '20%' }}>
                    <div className='colorpalette'>
                        <h2>Color Palette</h2>
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext items={colorPalette}>
                                <div className='colorpalette_show'>
                                    {colorPalette.length === 0 ? (
                                        <p className='colorpalette__empty'>Palette is empty. Add some colors!</p>
                                    ) : (
                                        colorPalette.map((color) => (
                                            <SortableItem
                                                key={color}
                                                id={color}
                                                color={color}
                                                onRemove={removeFromPalette}
                                            />
                                        ))
                                    )}
                                </div>
                            </SortableContext>
                        </DndContext>
                        <div className='colorpalette_buttons'>
                            <button className="btn" title='Clear Palette' onClick={() => setColorPalette([])}><CgTrashEmpty /> Clear Palette</button>
                        </div>
                    </div>
                    <div className='colorgradient'>
                        <h2>Color Gradient</h2>
                        <div
                            className='colorgradient__preview'
                            style={{
                                background: `linear-gradient(to right, ${colorPalette.join(', ')})`,
                                height: '50px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        ></div>
                        <div className='colorgradient__output'>
                            <CopyInput value={`linear-gradient(to right, ${colorPalette.join(', ')})`} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function SortableItem({ id, color, onRemove }: { id: string; color: string; onRemove: (color: string) => void }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        backgroundColor: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px',
        borderRadius: '4px',
        color: '#fff',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className='colorpalette__item'
            title={color}
        >
            <span>{color}</span>
            <div style={{ display: 'flex', gap: '8px' }}>
                <button
                    className="colorpalette__drag"
                    {...listeners}
                    title="Drag"
                    style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'grab',
                        color: '#fff',
                        fontSize: '16px',
                    }}
                >
                    ☰
                </button>
                <button
                    className="colorpalette__remove"
                    onClick={() => onRemove(color)}
                    title="Delete"
                    style={{
                        background: '#ff4d4d',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#fff',
                        cursor: 'pointer',
                        padding: '4px 8px',
                    }}
                >
                    ×
                </button>
            </div>
        </div>
    );
}