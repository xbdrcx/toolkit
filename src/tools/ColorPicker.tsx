export default function ColorPicker() {
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
            </div>
        </>
    )
}