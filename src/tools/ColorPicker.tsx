// General
import { useState } from 'react';

// Icons
import { TbColorPicker } from "react-icons/tb";

export default function ColorPicker() {

    const [pickedColor, setPickedColor] = useState<string | null>(null);

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

    const copyToClipboard = (value: string) => {
        navigator.clipboard.writeText(value).then(() => {
            // alert("Copied to clipboard: " + value);
        }).catch((error) => {
            console.error('Error copying to clipboard:', error);
        });
    }

    return (
        <>
            <h2>Color-Picker & Palette Generator</h2>
            <div className='colorpicker'>
                <div className="colorpicker__show" style={{ backgroundColor: pickedColor || '' }}></div>
                <div className='colorpicker__input'>
                    <label htmlFor="color">Color:</label>
                    <input type="color" id="color" name="color" defaultValue="#000000" />
                </div>
                <div className='colorpicker__output'>
                    <label htmlFor="hex">Hex:</label>
                    <input type="text" id="hex" name="hex" defaultValue="#000000" />
                </div>
                <div className='colorpicker__output'>
                    <label htmlFor="rgb">RGB:</label>
                    <input type="text" id="rgb" name="rgb" defaultValue="0, 0, 0" />
                </div>
                <div className='colorpicker__output'>
                    <label htmlFor="hsl">HSL:</label>
                    <input type="text" id="hsl" name="hsl" defaultValue="0, 0%, 0%" />
                </div>
                <div className='colorpicker__output'>
                    <label htmlFor="cmyk">CMYK:</label>
                    <input onClick={(e: React.MouseEvent<HTMLInputElement>) => { copyToClipboard((e.target as HTMLInputElement).value) }} type="text" id="cmyk" name="cmyk" defaultValue="0%, 0%, 0%, 100%" />
                </div>
                <button className="btn" onClick={handlePicker}><TbColorPicker /></button>
            </div>
        </>
    )
}