function Car() {
    
    let brand =  "audi"; 

function sayHello() {
    console.log("Hello! I am a car.")
}

    return ( 
        <>
        <h1>je suis une {brand}</h1>
        <button onClick={sayHello}>Say Hello</button>
        </>
     );
};

export default Car;
