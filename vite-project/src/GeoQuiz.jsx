import { useState, useEffect } from 'react';
// import globe from './assets/globe.svg';
import "./GeoQuiz.css";

// Jeu de type Quiz avec API GEO : https://restcountries.com/v3.1/all"

// le principe : 
//  - Afficher depuis l'API un drapeau de pays aléatoire 
//  - Sous ce drapeau un Input ou il faudra renseigner le nom du pays 
//  - Si c'est correct +1 au niveau du score, si c'est incorrect 0
//  - Le jeu s'arrete au bout de 10 pays, moment ou le score est affiché et un bouton de refresh permet de recommencer

// Il faudra des states pour chaque donnée amenée à changer (drapeau, valeur de l'input, score etc)
// Il faudra un useEffect au moins pour effecture la requete API +
// Il faudra utiliser les affichages conditionnels selon les situations 
// (ex: si le nombre de rounds atteint 10 alors on affiche le score et le btn de refresh)


function GeoQuiz() {
    // Données (States et autres)
    const [country, setCountry] = useState(null)
    const [inputValue, setInputValue] = useState("")
    const [score, setScore] = useState(0)
    const [message, setMessage] = useState(null)
    const [rounds, setRounds] = useState(1)
    const [response, setResponse] = useState(null)

    let url = "https://restcountries.com/v3.1/all"

    // Opérations
    useEffect(() => {
        // Le call vers l'API
        fetchRandomCountry()
    }, [rounds])

    // On vient recup un pays aleatoire
    function fetchRandomCountry() {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            let random = Math.floor(Math.random() * data.length)
            let randomCountry = data[random]
            
            // On change le state de country en lui donnant le nouveau random country
            setCountry(randomCountry)
            // On vide l'input de la réponse
            setInputValue("")
            // Vider le state de la réponse 
            setResponse(null)

        })
    }

    // Fonctino de soumission
    function handleSubmit() {
        // Assainir la réponse (trim, lowerCases, etc)
        let response = inputValue.trim().toLowerCase()

        // On recup les solutions en FR et ENG et on les assainit
        let answerEn = country.name.common.trim().toLowerCase()
        let answerFr = country.translations.fra.common.trim().toLowerCase()

        // Recuperation de la bonne réponse et de la réponse du user puis comparaison
        // On a également un message d'erreur qui apparait si besoin
        if (response === answerEn || response === answerFr) {
            setResponse(response)
            setMessage("Bonne réponse !")
            setScore(prevScore => prevScore + 1)

        } else if (response === "") {
            setMessage("Veuillez indiquer une réponse")
        } else {
            setResponse(response)
            setMessage("Mauvaise réponse ...")
        }
    }

    // On passe ayu tour suivant en augmentant le state des rounds
    function handleNext() {
        setRounds(rounds + 1)
    }

    // On "rafraichit" (re-render pluto) la page en remettant les states à leur valeur initiale
    function handleRefresh() {
        setRounds(1)
        setScore(0)
        setMessage(null)
    }

    // Le rendu en JSX
    return ( 
        <>
            <h1>Bienvenue sur le Quiz Geo !</h1>
            <img className='globe' src={globe} alt="" />

            {/* Condition générale: si on est à plus de 10 rounds alors partie finie et on affiche les score, 
            sinon on affiche un nouveau pays */}
            { rounds <= 10 ? (
                <div className="container">

                    <p>Rounds : {rounds} / 10</p>
                    <p>Score : {score} / 10</p>

                    {/* Si on a bien un pays dans le state on l'affiche (son drapeau et si une réponse a été fournie
                    on affiche la solution ) */}
                    {country ? (
                        <>
                            {<img src={country.flags.png} />}
                            {response && (<h3>{country.name.common}</h3>)}
                        </>
                    ) : <p>Chargement ...</p>}

                    {/* Input pour le user et sa réponse, avec bouton de submiit qui devient de manière conditionnelle le btn next */}
                    <div className="input-block">
                        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" />
                        {response ? (<button onClick={() => handleNext()}>Suivant</button>) : 
                        <button onClick={() => handleSubmit()}>Valider</button>}
                    </div>

                    {/* On affiche les potentiels messages (erreur, le résultat victoire ou non) */}
                    {message && (<p className="message">{message}</p>)}
                </div>
            ) : 
                // Si on dépasse les 10 rounds on affiche l'écran de fin avec le score et un bouton recommencer
                <div className="replay">
                    <h2>Partie terminée !</h2>
                    <p>Score : {score} / 10</p>
                    <button onClick={() => handleRefresh()}>Recommencer</button>
                </div>
            }

        </>
     );
}

export default GeoQuiz;