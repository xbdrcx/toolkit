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
                    title="JSON Formatter" 
                    description="Format and beautify your JSON data." 
                    onClick={() => navigate('/toolkit/json')} // Navigate to JSON Formatter
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
                    title="Favicon Generator" 
                    description="Create favicons for your website." 
                    onClick={() => navigate('/toolkit/favicon')} // Navigate to Color Picker
                />
            </div>
        </>
    )
}