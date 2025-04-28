
// General
import { useState, useRef } from 'react';
import JavaScriptObfuscator from 'javascript-obfuscator';

// MUI Components
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

// Icons
import { MdFormatAlignLeft, MdCopyAll, MdContentPasteGo, MdDownloading, MdClear } from "react-icons/md";
import { VscJson } from "react-icons/vsc";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
  
function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
}

function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function CodeMinifier() {

    const [activeTab, setActiveTab] = useState(0); // State for active tab
    
    const [toFormat, setToFormat] = useState("")
    const [formatted, setFormatted] = useState("")
    const toFormatRef = useRef<HTMLTextAreaElement | null>(null);
    // const formattedRef = useRef<HTMLTextAreaElement | null>(null);
    
    const [codeToObfuscate, setCodeToObfuscate] = useState('');
    const [obfuscatedCode, setObfuscatedCode] = useState('');

    // Function to obfuscate code
    const obfuscateCode = () => {
        try {
            const obfuscated = JavaScriptObfuscator.obfuscate(codeToObfuscate, {
                compact: true,
                controlFlowFlattening: true,
            });
            setObfuscatedCode(obfuscated.getObfuscatedCode());
        } catch (error) {
            setObfuscatedCode('Error obfuscating code');
            console.error('Obfuscation error:', error);
        }
    };

    // Function to copy obfuscated code to clipboard
    const copyObfuscatedCode = () => {
        navigator.clipboard.writeText(obfuscatedCode).then(() => {
            console.log('Copied to clipboard');
        }).catch((error) => {
            console.error('Error copying to clipboard:', error);
        });
    };

    const formatJSON = () => {
        try {
            const json = JSON.parse(toFormat); // Parse the input JSON
            setFormatted(JSON.stringify(json, null, 4)); // Format and update the state
        } catch {
            setFormatted('Invalid JSON'); // Handle invalid JSON
        }
    };

    const minifyJSON = () => {
        try {
            const json = JSON.parse(toFormat); // Parse the input JSON
            setFormatted(JSON.stringify(json)); // Minify and update the state
        } catch {
            setFormatted('Invalid JSON'); // Handle invalid JSON
        }
    };

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

    // Handle tab change
    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <>
            <h2>Code Minifier</h2>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeTab} onChange={handleTabChange} aria-label="basic tabs example">
                    <Tab label="Minifier" {...a11yProps(0)} />
                    <Tab label="Obfuscator" {...a11yProps(1)} />
                    <Tab label="Compressor" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={activeTab} index={0}>
                <div className='formatter'>
                    <textarea
                        className='input'
                        placeholder='Paste your JSON here...'
                        rows={25}
                        cols={50}
                        ref={toFormatRef}
                        value={toFormat}
                        onChange={(e) => setToFormat(e.target.value)}
                    ></textarea>
                    <textarea
                        className='output'
                        placeholder='Formatted or Minified JSON will appear here...'
                        rows={25}
                        cols={50}
                        value={formatted} // Bind to the `formatted` state
                        readOnly
                    ></textarea>
                    <div className='buttons'>
                        <button className='btn' onClick={pasteFromClipboard}><MdContentPasteGo />Paste</button>
                        <button className='btn' onClick={formatJSON} disabled={!toFormat.length}><MdFormatAlignLeft /> Format</button>
                        <button className='btn' onClick={minifyJSON} disabled={!toFormat.length}><VscJson />Minify</button>
                        <button className='btn' onClick={copyToClipboard} disabled={!formatted.length}><MdCopyAll />Copy</button>
                        <button className='btn' onClick={downloadJSON} disabled={!formatted.length}><MdDownloading />Download</button>
                        <button className='btn' onClick={clearTextAreas}><MdClear />Clear</button>
                    </div>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={activeTab} index={1}>
                <div className='formatter'>
                    <textarea
                        className='input'
                        placeholder='Paste your JavaScript code here...'
                        rows={25}
                        cols={50}
                        value={codeToObfuscate}
                        onChange={(e) => setCodeToObfuscate(e.target.value)}
                    ></textarea>
                    <textarea
                        className='output'
                        placeholder='Obfuscated code will appear here...'
                        rows={25}
                        cols={50}
                        value={obfuscatedCode}
                        readOnly
                    ></textarea>
                    <div className='buttons'>
                        <button className='btn' onClick={obfuscateCode} disabled={!codeToObfuscate.length}><MdFormatAlignLeft /> Obfuscate</button>
                        <button className='btn' onClick={copyObfuscatedCode} disabled={!obfuscatedCode.length}><MdCopyAll />Copy</button>
                    </div>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={activeTab} index={2}>
                Compressor
            </CustomTabPanel>
        </>
    );
}