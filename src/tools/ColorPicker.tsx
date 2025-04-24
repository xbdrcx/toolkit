// Icons
import { TbColorPicker } from "react-icons/tb";

interface EyeDropperResult {
    sRGBHex: string;
} 
interface EyeDropper {
  open(): Promise<EyeDropperResult>;
}
interface Window {
  EyeDropper?: new () => EyeDropper;
}

export default function ColorPicker() {

    const handlePicker = async () => {
        const EyeDropper = (window as any).EyeDropper;
        if (EyeDropper) {
          const eyeDropper = new EyeDropper();
          const result = await eyeDropper.open();
          console.log(result.sRGBHex);
        } else {
          alert("EyeDropper not supported");
        }
    };

    return (
        <>
            <h2>Color-Picker & Pallette Generator</h2>
            <div className='colorpicker'>
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
                    <input type="text" id="cmyk" name="cmyk" defaultValue="0%, 0%, 0%, 100%" />
                </div>
                <button className="btn" onClick={handlePicker}><TbColorPicker /></button>
            </div>
        </>
    )
}