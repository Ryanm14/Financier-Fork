import React, {useEffect, useState} from "react";
// @ts-ignore
import Cookies from 'universal-cookie';

export const DbUrlEditor = () => {
    const [url, setUrl] = useState('Test')
    const cookies = new Cookies();

    useEffect(() => {
        const savedUrl = cookies.get('dbUrl')
        if(savedUrl != "undefined") {
            setUrl(savedUrl);
        }
    }, [])

    function saveUrl() {
        cookies.set('dbUrl', url, { path: '/' });
    }

    return <div>
        <label>DB URL:</label>
        <input type="text" id="dbUrl" name="dbUrl" onChange={event => setUrl(event.target.value)} value={url}/><br/><br/>
        <button onClick={() => saveUrl()}> Submit </button>
    </div>
}
