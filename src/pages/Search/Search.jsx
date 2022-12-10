import React from 'react';
import search from './Search.module.css';
import SearchForm from "../../components/SearchForm/SearchForm";

const Search = () => {
    return (
        <main className={search.content}>
            <h1>Search</h1>
            <SearchForm/>
            <div>
                <h2 className="searched-titles">Artist</h2>
                <ul className="searched-artists-list"/>
            </div>
            <div>
                <h2 className="searched-titles">Albums</h2>
                <ul className="searched-albums-list"/>
            </div>
            <div>
                <h2 className="searched-titles">Tracks</h2>
                <ul className="searched-tracks-list"/>
            </div>

        </main>
    );
};

export default Search;