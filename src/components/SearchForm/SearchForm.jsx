import React, {useState} from 'react';
import form from './SearchForm.module.css';

const SearchForm = (props) => {
    const [value, setValue] = useState('');
    return (
        <form className={form.content}>
            <input
                className={form.input}
                type="search"
                placeholder="Search"
                onChange={e => setValue(e.target.value)}
            />
            <button onClick={e => {
                e.preventDefault();
                props.search(value)
            }} type="submit" className={form.button}/>
        </form>
    );
};

export default SearchForm;