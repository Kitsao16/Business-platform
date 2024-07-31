import * as React from 'react';
import { useState, useCallback, useRef } from 'react';
import './SearchBar.css';

interface SearchBarProps {
    onSearch: (query: string) => Promise<void>;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleSearch = useCallback(
        (searchQuery: string) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(async () => {
                setLoading(true);
                try {
                    await onSearch(searchQuery);
                    setError(null);
                } catch (err) {
                    setError('An error occurred while searching.');
                } finally {
                    setLoading(false);
                }
            }, 500);
        },
        [onSearch]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        handleSearch(value);
    };

    return (
        <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search-input" className="visually-hidden">Search</label>
            <input
                id="search-input"
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search..."
                aria-label="Search"
            />
            <button type="submit" aria-label="Submit search">Search</button>
            {loading && <div className="loading-indicator">Loading...</div>}
            {error && <div className="error-message">{error}</div>}
        </form>
    );
};

export default SearchBar;
