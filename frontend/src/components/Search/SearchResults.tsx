import * as React from 'react';
import './SearchResults.css';

interface SearchResult {
    id: number;
    name: string;
    description: string;
}

const SearchResults: React.FC<{ results: SearchResult[] }> = ({ results }) => {
    return (
        <div className="search-results">
            {results.map((result) => (
                <div key={result.id} className="search-result">
                    <h3>{result.name}</h3>
                    <p>{result.description}</p>
                </div>
            ))}
        </div>
    );
};

export default SearchResults;
