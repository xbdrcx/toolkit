// General
import { useState } from 'react';

// Icons
import { MdCopyAll } from "react-icons/md";

export default function CopyInput({ value }: { value: string }) {
    const [showTooltip, setShowTooltip] = useState(false);

    const copyToClipboard = (value: string) => {
        navigator.clipboard.writeText(value).then(() => {
            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false), 2000); // Tooltip disappears after 2 seconds
        }).catch((error) => {
            console.error('Error copying to clipboard:', error);
        });
    };

    return (
        <div className="copyInputcontainer">
            <div
                className="copyInput"
                onClick={() => copyToClipboard(value)}
            >
                <MdCopyAll className="copyIcon" />
                {value}
            </div>
            {showTooltip && (
                <div className="tooltip">
                    Copied
                    <div className="tooltipArrow"></div>
                </div>
            )}
        </div>
    );
}