// src/UrlShortener.jsx
import React, { useState } from 'react';
import axios from 'axios';

const UrlShortener = () => {
    const [url, setUrl] = useState('');
    const [urlLogo, setUrlLogo] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');

    const handleSubmit = async (e) => {
        getDomain(url)
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/url', { url });
            console.log(respo);
            setShortenedUrl(`http://localhost:8000/${response.data.id}`);
        } catch (error) {
            console.error('Error shortening the URL:', error);
        }
    };
    function getDomain(url) {
        // Create a URL object from the string
        const parsedUrl = new URL(url);
        // Extract the hostname
        const hostname = parsedUrl.hostname;
        // Remove the 'www.' prefix if it exists
        setUrlLogo(hostname.replace(/^www\./, ''))
    }

    return (
        <div>
            <h1>URL Shortener</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="url"
                    value={url}
                    onChange={(e) => { setUrl(e.target.value) }}
                    placeholder="Enter your URL"
                    required
                />
                <button type="submit">Shorten URL</button>
            </form>
            {shortenedUrl && (
                <div>
                    <h2>Shortened URL:</h2>
                    <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
                        {shortenedUrl}
                    </a>
                    <img src={`https://img.logo.dev/${urlLogo}?token=pk_VsYS4xnxRVmiRWtcxByHog`} alt="logo" />
                </div>
            )}
        </div>
    );
};

export default UrlShortener;
