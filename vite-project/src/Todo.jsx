// Créer une app de type TODO avec le Local Storage

// 1 - On voudra un input et un bouton de soumission 

// 2 - A chaque soumission d'une todo elle apparait en dessous de l'input 

// 3 - Cette todo sera aussi enregistrée en LS
// 
// Fonctionnalités principales :
//
// A chaque chargement initial de notre page de Todo on va vouloir récupérer celles qui existent en LS (useEffect ...)

// On doit pouvoir aussi supprimer une todo (à la fois dans l'app mais aussi dans le LS)

// On doit pouvoir modifier une todo : on a un bouton edit et le contenu de la todo devient un input dans lequel 
// on vient modifier celle-ci

// On doit pouvoir checker une todo : 
// - par exemple on peut barrer le contenu de le todo une fois qu'on a check
// - sinon on peut passer la todo en sous brillance (réduire son opacité)
// - ou encore changer de couleur (elle passerait par exemple de rouge à vert) 

// Les changements évoqués ci-dessus doivent aussi systématiquement se refléter dans le LS

// BONUS : rendre l'app un peu plus cool avec une librairie d'animation (cf animate css) et animer 
// des actions comme la suppression d'une todo, l'ajout de celle-ci etc

// TIPS : Il faudra bien faire gaffe lors de l'utilisation de setState() avec des tableaux ou des objets 
// car pour mettre à jour ce genre d'éléments il faut en créer une copie (cf spread operator {... copy-of-object})
// https://react.dev/learn/updating-objects-in-state 

import { useState, useEffect } from "react"
// import "./Todo.css"

function Todo() {
    //// DATA
    const [value, setValue] = useState("")
    const [todos, setTodos] = useState([])
    const [edit, setEdit] = useState(false)
    const [error, setError] = useState("")
    const [editInput, setEditInput] = useState("")

    //// OPERATIONS

    // Mes useEffect

    // Affichage des todos du LS lors du premier render
    useEffect(() => {
        if (localStorage.getItem("todos")) {
            const todosLS = JSON.parse(localStorage.getItem("todos"))
            setTodos(todosLS)
        }
    }, [])
            

    // Mis à jour du tableau des todos dans le LS lors du changement d'état de todos
    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem("todos", JSON.stringify(todos))
        } else {
            localStorage.removeItem("todos")
        }
    }, [todos])

    // Mes fonctions

    // Ajouter une todo 
    function handleAdd() {
        if (value != "") {
            let trimValue = value.trim()

            let todoObject = {
                id : Date.now(),
                content : trimValue,
                check : false
            }

            // setTodo(todoObject)
            setTodos([ ...todos, todoObject])
            setValue("")

        } else {
            setError("Veuillez remplir le champ") 
        }
    }

    // Gérer le check d'une todo 
    function handleCheck(item) {
        // On vient chercher dans todos l'élément que l'on veut check ou inverse
        let foundItem = todos.find(todo => item.id === todo.id)
        // Une fois trouvé on change la valeur de check
        foundItem.check = !item.check
        
        // On fait ensuite une copie de todos et on remplace au bon index l'élément modifié
        let newArray = [ ...todos]
        let index = newArray.indexOf(item)
        newArray[index] = foundItem

        // On met ensuite à jour le tableau des todos
        setTodos(newArray)
       
    }

    // Supprimer une todo
    function handleDelete(item) {
        // On vient filtrer l'item à supprimer
        let filter = todos.filter(elem => elem.id != item.id)

        // On met ensuite à jour le tableau des todos
        setTodos(filter)
    }

    // Fonction pour sauvegarder un edit de todo
    function saveEdit(item) {
        if (editInput != "" && item.content != editInput) {

            setEdit(false)

            let foundItem = todos.find(todo => todo.id === item.id)
            let index = todos.indexOf(foundItem)

            todos[index].content = editInput
        }
        
    }

    //// RENDU EN JSX
    return ( 
        <>
            <h1>Ma TODO en React</h1>

            <div className="container">
                {/* Partie avec input et bouton de soumission */}
                <div className="todo-input">
                    <input 
                        type="text" 
                        value={value} 
                        onChange={(e) => {
                            setValue(e.target.value) 
                        }} 
                        placeholder="Votre todo ici ..."/>
                    <button onClick={() => handleAdd()}>Envoyer</button>
                </div>

                {/* Partie d'affichage des todos  */}
                <div className="all-todos">

                    {/* Je viens boucler sur mon tableau de todos avec .map pour les afficher */}
                    {todos.map((item) => (
                        <div key={item.id} className="todo">
                            <input onClick={() => handleCheck(item)} type="checkbox" />
                            <button onClick={() => setEdit(true)}>Edit</button>
                            <button onClick={() => handleDelete(item)}>x</button>

                            {/* Si check est coché alors on barre le contenu de la todo sinon rien */}
                            {item.check ? <p><strike>{item.content}</strike></p> : <p>{item.content}</p>}
                            
                            {/* Modale pour editer une todo */}  
                            {edit && ( 
                                <div>
                                <h3>Modifier la todo</h3>
                                <input value={editInput} onChange={(e) => setEditInput(e.target.value)} placeholder={item.content} type="text" />
                                <button onClick={() => saveEdit(item)}>Enregistrer</button>
                                <button onClick={() => setEdit(false)}>Quitter</button>
                            </div> )}
                            
                        </div>
                    ))}
                </div>
            </div>
        </>
     );
}

export default Todo;