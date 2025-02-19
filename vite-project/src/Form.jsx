import { useState } from "react";

function Form() {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    return ( 
        <>
            <input 
                type="text" 
                value={inputValue} 
                onChange={handleInputChange} 
                placeholder="Ecrivez"
            />
            <input type="button" />
            <p>Vous avez tapé : {inputValue}</p>
        </>
     );
}

export default Form;
