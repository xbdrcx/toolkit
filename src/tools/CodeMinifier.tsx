
// General
import { useState, useRef } from 'react';

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
                    <Tab label="Item Three" {...a11yProps(2)} />
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
                        <button className='btn' onClick={pasteFromClipboard}><MdContentPasteGo />Paste</button>
                        <button className='btn' onClick={formatJSON} disabled={!toFormatRef.current?.value?.length}><MdFormatAlignLeft /> Format</button>
                        <button className='btn' onClick={minifyJSON} disabled={!toFormatRef.current?.value?.length}><VscJson />Minify</button>
                        <button className='btn' onClick={copyToClipboard} disabled={!formattedRef.current?.value?.length}><MdCopyAll />Copy</button>
                        <button className='btn' onClick={downloadJSON} disabled={!formattedRef.current?.value?.length}><MdDownloading />Download</button>
                        <button className='btn' onClick={clearTextAreas}><MdClear />Clear</button>
                    </div>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={activeTab} index={1}>
                Item Two
            </CustomTabPanel>
            <CustomTabPanel value={activeTab} index={2}>
                Item Three
            </CustomTabPanel>
        </>
    );
}