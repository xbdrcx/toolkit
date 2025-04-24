export default function PasswordGenerator() {
    return (
        <>
            <h1>Password Generator</h1>
            <div className="passgenerator">
                <p>Generate a random password</p>
                <div className="password-options">
                    <label htmlFor="length">Length:</label>
                    <input type="number" id="length" min="1" max="128" defaultValue="12" />
                    <label htmlFor="uppercase">Include Uppercase:</label>
                    <input type="checkbox" id="uppercase" defaultChecked />
                    <label htmlFor="numbers">Include Numbers:</label>
                    <input type="checkbox" id="numbers" defaultChecked />
                    <label htmlFor="symbols">Include Symbols:</label>
                    <input type="checkbox" id="symbols" defaultChecked />
                </div>
                <button className="btn">Generate Password</button>
                <div className="password">Generated Password</div>
                <button className="btn">Copy to Clipboard</button>
                <button className="btn">Save Password</button>
                <button className="btn">Clear</button>
            </div>
        </>
    )
}