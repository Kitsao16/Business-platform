import * as React from 'react';
import { useState } from 'react';
import SearchBar from '../components/Search/SearchBar';
import SearchResults from '../components/Search/SearchResults';
import './SearchPage.css';

const SearchPage: React.FC = () => {
    const [results, setResults] = useState<any[]>([]);

    const handleSearch = async (query: string): Promise<void> => {
        console.log(`Search query: ${query}`);
        setResults([
            { id: 1, name: 'Business 1', description: 'Description of Business 1' },
            { id: 2, name: 'Business 2', description: 'Description of Business 2' },
        ]);
    };

    return (
        <div className="search-page">
            <SearchBar onSearch={handleSearch} />
            <SearchResults results={results} />
        </div>
    );
};

export default SearchPage;
