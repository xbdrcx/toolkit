// Components
import Card from './components/Card';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate(); // Hook to programmatically navigate

    return (
        <>
            <h1>Welcome to Toolkit</h1>
            <div className="cards">
                <Card 
                    title="Code Minifier" 
                    description="Format and beautify your JSON data." 
                    onClick={() => navigate('/toolkit/minifier')} // Navigate to JSON Formatter
                />
                <Card 
                    title="Password Generator" 
                    description="Generate secure passwords with ease." 
                    onClick={() => navigate('/toolkit/password')} // Navigate to Password Generator
                />
                <Card 
                    title="Color Picker" 
                    description="Pick and generate color palettes." 
                    onClick={() => navigate('/toolkit/color')} // Navigate to Color Picker
                />
                <Card 
                    title="Icon Generator" 
                    description="Create favicons for your website." 
                    onClick={() => navigate('/toolkit/icon')} // Navigate to Color Picker
                />
                <Card 
                    title="Code Editor" 
                    description="Write and edit code in a powerful editor." 
                    onClick={() => navigate('/toolkit/editor')} // Navigate to Code Editor
                />
            </div>
        </>
    )
}