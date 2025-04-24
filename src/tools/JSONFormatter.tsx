
// General
import { useState, useRef } from 'react';

// Icons
import { MdFormatAlignLeft, MdCopyAll, MdContentPasteGo, MdDownloading, MdClear } from "react-icons/md";
import { VscJson } from "react-icons/vsc";

export default function JSONFormatter() {

    const [toFormat, setToFormat] = useState("")
    const [formatted, setFormatted] = useState("")
    const toFormatRef = useRef<HTMLTextAreaElement | null>(null);
    const formattedRef = useRef<HTMLTextAreaElement | null>(null);
    
    // Function to format JSON
    const formatJSON = () => {
        try {
            const json = JSON.parse(toFormat);
            return JSON.stringify(json, null, 4); // 4 spaces for indentation
        } catch {
            return 'Invalid JSON';
        }
    }

    // Function to minify JSON
    const minifyJSON = () => {
        try {
            const json = JSON.parse(formatted);
            return JSON.stringify(json); // No spaces for minification
        } catch {
            return 'Invalid JSON';
        }
    }

    // Function to copy JSON to clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(formatted).then(() => {
        }).catch((error) => {
            console.error('Error copying JSON to clipboard:', error);
        });
    };

    // Function to download JSON as a file
    const downloadJSON = () => {
        const blob = new Blob([formatted], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'formatted.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Function to clear the text areas
    const clearTextAreas = () => {
        const inputArea = document.querySelector('.input') as HTMLTextAreaElement;
        const outputArea = document.querySelector('.output') as HTMLTextAreaElement;
        if (inputArea && outputArea) {
            inputArea.value = '';
            outputArea.value = '';
        }
    }

    const pasteFromClipboard = () => {
        navigator.clipboard.readText().then((text) => {
            if (toFormatRef.current) {
                toFormatRef.current.value = text;
                setToFormat(text);
            }
        }
        ).catch((error) => {
            console.error('Error pasting from clipboard:', error);
        });
    }

    return (
        <>
            <h2>JSON Formatter</h2>
            <div className='formatter'>
                <textarea
                    className='input'
                    placeholder='Paste your JSON here...'
                    rows={25}
                    cols={50}
                    ref={toFormatRef}
                    onChange={(e) => setToFormat(e.target.value)}
                ></textarea>
                <textarea
                    className='output'
                    placeholder='Formatted JSON will appear here...'
                    rows={25}
                    cols={50}
                    ref={formattedRef}
                    onChange={(e) => setFormatted(e.target.value)}
                    disabled
                ></textarea>
                <div className='buttons'>
                    <button className='btn' onClick={formatJSON} disabled={!toFormatRef.current?.value?.length}><MdFormatAlignLeft /> Format</button>
                    <button className='btn' onClick={minifyJSON} disabled={!toFormatRef.current?.value?.length}><VscJson />Minify</button>
                    <button className='btn' onClick={pasteFromClipboard}><MdContentPasteGo />Paste</button>
                    <button className='btn' onClick={copyToClipboard} disabled={!formattedRef.current?.value?.length}><MdCopyAll />Copy</button>
                    <button className='btn' onClick={downloadJSON} disabled={!formattedRef.current?.value?.length}><MdDownloading />Download</button>
                    <button className='btn' onClick={clearTextAreas}><MdClear />Clear</button>
                </div>
            </div>
        </>
    );
}