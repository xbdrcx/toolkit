// Components
import Card from './components/Card';
import { useNavigate } from 'react-router-dom';

// icons
import { HiOutlineCodeBracketSquare } from "react-icons/hi2";
import { MdOutlinePassword } from "react-icons/md";
import { HiColorSwatch } from "react-icons/hi";
import { FaIcons } from "react-icons/fa6";

export default function Home() {
    const navigate = useNavigate(); // Hook to programmatically navigate

    return (
        <>
            <a href='https://xbdrcx.github.io' target='_blank' className='bc'>BC</a>
            <h1>Welcome to Toolkit</h1>
            <div className="cards">
                <Card 
                    icon={<HiOutlineCodeBracketSquare />}
                    title="Code Minifier" 
                    description="Format and beautify your JSON data." 
                    onClick={() => navigate('/toolkit/minifier')} // Navigate to JSON Formatter
                />
                <Card 
                    icon={<MdOutlinePassword />}
                    title="Password Generator" 
                    description="Generate secure passwords with ease." 
                    onClick={() => navigate('/toolkit/password')} // Navigate to Password Generator
                />
                <Card 
                    icon={<HiColorSwatch />}
                    title="Color Picker" 
                    description="Pick and generate color palettes." 
                    onClick={() => navigate('/toolkit/color')} // Navigate to Color Picker
                />
                <Card
                    icon={<FaIcons />}
                    title="Icon Generator" 
                    description="Create favicons for your website." 
                    onClick={() => navigate('/toolkit/icon')} // Navigate to Color Picker
                />
            </div>
        </>
    )
}