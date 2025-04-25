// General
import { useState, useEffect } from 'react';
import { HuePicker, AlphaPicker } from 'react-color';
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

    const [selectedColorType, setSelectedColorType] = useState<string>('RGB');
    const [pickedColor, setPickedColor] = useState<string | null>(null);
    const [colorPalette, setColorPalette] = useState<string[]>([]);

    // Set a random color on initial render
    useEffect(() => {
        setPickedColor(generateRandomColor());
    }, []);

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
    }

    const handleAlphaChange = (color: { hex: string }) => {
        // setPickedColor(color.hex);
        // console.log(color.hex);
    }

    const handlePreviousColor = () => {
        // Logic to handle previous color (if needed)
        // Color gotta be selected for 2 seconds to be saved as previous color
        console.log("Previous color functionality not implemented yet.");
    }

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

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setColorPalette((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <>
            <div className='color_types'>
                <button
                    className={`btn ${selectedColorType === 'RGB' ? 'btn-selected' : ''}`}
                    onClick={() => setSelectedColorType('RGB')}
                >
                    RGB
                </button>
                <button
                    className={`btn ${selectedColorType === 'HEX' ? 'btn-selected' : ''}`}
                    onClick={() => setSelectedColorType('HEX')}
                >
                    HEX
                </button>
                <button
                    className={`btn ${selectedColorType === 'HSL' ? 'btn-selected' : ''}`}
                    onClick={() => setSelectedColorType('HSL')}
                >
                    HSL
                </button>
                <button
                    className={`btn ${selectedColorType === 'CMYK' ? 'btn-selected' : ''}`}
                    onClick={() => setSelectedColorType('CMYK')}
                >
                    CMYK
                </button>
            </div>
            <div className='colorsection'>
                <div className='colorpicker' style={{ width: '80%' }}>
                    <h2>Color Picker</h2>
                    <div className="colorpicker_show" style={{ backgroundColor: pickedColor || '' }}></div>
                    <HuePicker width='100%' color={pickedColor || "#000000"} onChange={handleHueChange} />
                    <AlphaPicker width='100%' onChange={handleAlphaChange} />
                    <div className='colorpicker__output'>
                        <label htmlFor="hex">Hex:</label>
                        <CopyInput value={pickedColor || '#000000'} />
                    </div>
                    <div className='colorpicker__output'>
                        <label htmlFor="rgb">RGB:</label>
                        <CopyInput value={pickedColor || '#000000'} />
                    </div>
                    <div className='colorpicker__output'>
                        <label htmlFor="hsl">HSL:</label>
                        <CopyInput value={pickedColor || '#000000'} />
                    </div>
                    <div className='colorpicker__output'>
                        <label htmlFor="cmyk">CMYK:</label>
                        <CopyInput value={pickedColor || '#000000'} />
                    </div>
                    <div className='colorpicker_buttons'>
                        <button className="btn" title='Picker' onClick={handlePicker}><TbColorPicker /> Picker</button>    
                        <button className="btn" title='Random' onClick={handleRandomColor}><FaDice /> Random</button>
                        <button className='btn' title="Previous" onClick={handlePreviousColor}><FaBackspace /> Previous</button>
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
                                        <p className='colorpalette__empty'>Your palette is empty. Add some colors!</p>
                                    ) : (
                                        colorPalette.map((color, index) => (
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