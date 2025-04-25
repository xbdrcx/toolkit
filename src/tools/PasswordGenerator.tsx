export default function PasswordGenerator() {

    const generatePassword = () => {
        const length = parseInt((document.getElementById("length") as HTMLInputElement).value) || 12;
        const includeUppercase = (document.getElementById("uppercase") as HTMLInputElement).checked;
        const includeNumbers = (document.getElementById("numbers") as HTMLInputElement).checked;
        const includeSymbols = (document.getElementById("symbols") as HTMLInputElement).checked;

        const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
        const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numberChars = "0123456789";
        const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";
        
        let charSet = lowercaseChars;
        if (includeUppercase) charSet += uppercaseChars;
        if (includeNumbers) charSet += numberChars;
        if (includeSymbols) charSet += symbolChars;

        let password = "";
        for (let i = 0; i < length; i++) {
            password += charSet.charAt(Math.floor(Math.random() * charSet.length));
        }

        (document.querySelector(".password") as HTMLDivElement).innerText = password;
    }

    const copyToClipboard = () => {
        const password = (document.querySelector(".password") as HTMLDivElement).innerText;
        navigator.clipboard.writeText(password).then(() => {
            // alert("Copied to clipboard: " + password);
        }).catch((error) => {
            console.error('Error copying to clipboard:', error);
        });
    }

    return (
        <>
            <h1>Password Generator</h1>
            <div className="passgenerator">
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
                <button className="btn" onClick={generatePassword}>Generate</button>
                <div className="password" onClick={copyToClipboard}>Password</div>
            </div>
        </>
    )
}