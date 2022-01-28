import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState('Hello React!');

    useEffect(() => {
        axios.get('/api').then(({data}) => setMessage(data.message));
    },[]);

    return (<h1>{message}</h1>);
}

ReactDOM.render(<App/>, document.getElementById('root'));