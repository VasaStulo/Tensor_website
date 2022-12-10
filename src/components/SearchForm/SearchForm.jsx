import React, {useState} from 'react';
import form from './SearchForm.module.css';

const SearchForm = () => {
    const [value, setValue] = useState('');
    return (
        <form className={form.content}>
            <input
                className={form.input}
                type="search"
                placeholder="Search"
                onChange={e => setValue(e.target.value)}
            />
            <button onClick={e => e.preventDefault()} type="submit" className={form.button}/>
        </form>
    );
};

export default SearchForm;