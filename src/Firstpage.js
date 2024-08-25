import React, { useState } from 'react';
import axios from 'axios';

function FirstPage() {
    const [jsonInput, setJsonInput] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        try {
            const parsedData = JSON.parse(jsonInput);
            const response = await axios.post('https://be-v8wz.onrender.com/bfhl', parsedData);
            setResponseData(response.data);
            setError(''); 
        } catch (error) {
            if (error.response) {
                setError(`Server Error: ${error.response.data.error}`);
            } else if (error.request) {
                setError('Network error: No response received from server');
            } else if (error instanceof SyntaxError) {
                setError('Invalid JSON format');
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    const handleOptionChange = (e) => {
        const value = e.target.value;
        setSelectedOptions((prev) => 
            prev.includes(value) 
                ? prev.filter((option) => option !== value) 
                : [...prev, value]
        );
    };

    return (
        <div>
            <h1>Enter JSON Input</h1>
            <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Enter JSON here"
                style={{ width: '100%', height: '100px' }}
            />
            <button onClick={handleSubmit} style={{ marginTop: '10px' }}>Submit</button>

            {error && (
                <p style={{ color: 'red' }}>{error}</p>
            )}

            {responseData && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Select what to display</h2>
                    <select multiple onChange={handleOptionChange} style={{ width: '100%', height: '100px' }}>
                        <option value="alphabets">Alphabets</option>
                        <option value="numbers">Numbers</option>
                        <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
                    </select>

                    <div style={{ marginTop: '20px' }}>
                        {selectedOptions.includes('alphabets') && (
                            <div>
                                <h3>Alphabets</h3>
                                <p>{JSON.stringify(responseData.alphabets)}</p>
                            </div>
                        )}
                        {selectedOptions.includes('numbers') && (
                            <div>
                                <h3>Numbers</h3>
                                <p>{JSON.stringify(responseData.numbers)}</p>
                            </div>
                        )}
                        {selectedOptions.includes('highest_lowercase_alphabet') && (
                            <div>
                                <h3>Highest Lowercase Alphabet</h3>
                                <p>{JSON.stringify(responseData.highest_lowercase_alphabet)}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default FirstPage;
