import React, { useState } from 'react';
import axios from 'axios';

function Firstpage() {
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
                //setError(Server Error: ${error.response.data.error});
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
        setSelectedOptions(prev =>
            prev.includes(value)
                ? prev.filter(option => option !== value)
                : [...prev, value]
        );
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Enter JSON Input</h1>
            <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder=''
                style={styles.textarea}
            />
            <button onClick={handleSubmit} style={styles.button}>Submit</button>

            {error && (
                <p style={styles.error}>{error}</p>
            )}

            {responseData && (
                <div style={styles.responseContainer}>
                    <h2>Select what to display</h2>
                    <select
                        multiple
                        onChange={handleOptionChange}
                        style={styles.select}
                    >
                        <option value="alphabets">Alphabets</option>
                        <option value="numbers">Numbers</option>
                        <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
                    </select>

                    <div style={styles.results}>
                        {selectedOptions.includes('alphabets') && (
                            <div style={styles.result}>
                                <h3>Alphabets</h3>
                                <p>{JSON.stringify(responseData.alphabets)}</p>
                            </div>
                        )}
                        {selectedOptions.includes('numbers') && (
                            <div style={styles.result}>
                                <h3>Numbers</h3>
                                <p>{JSON.stringify(responseData.numbers)}</p>
                            </div>
                        )}
                        {selectedOptions.includes('highest_lowercase_alphabet') && (
                            <div style={styles.result}>
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

const styles = {
    container: {
        width: '80%',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    textarea: {
        width: '100%',
        height: '100px',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
        marginBottom: '10px',
    },
    button: {
        display: 'block',
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
        marginBottom: '20px',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: '20px',
    },
    responseContainer: {
        marginTop: '20px',
    },
    select: {
        width: '100%',
        height: '100px',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
        marginBottom: '20px',
    },
    results: {
        marginTop: '20px',
    },
    result: {
        marginBottom: '20px',
    },
};

export default Firstpage;
