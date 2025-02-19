// Afficher les articles d'un BLOG
// Vous allez faire une permière requete API (https://jsonplaceholder.typicode.com/posts)
// Vous allez devoir récupérer une série d'articles avec fetch API (dans un useEffect)
// Vous devrez ajouter ces articles à un state et les afficher comme un vrai blog dans le JSX

import { useEffect, useState } from "react"

function Blog() {
    // Vos données de state 
    const [articles, setArticles] = useState([])

    // Votre useEffect pour la requete API
    useEffect(() => {
        // Ici votre requete de type GET vers le fake store API
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(data => {
            setArticles(data.slice(0, 5))
        })
        .catch(err => console.log(err))
    }, []) 

    // Vos fonctions 

    // Le JSX ou vous devrez afficher correctement les articles 
    // Pour faire des listes en React (et donc lister les articles récuperés) on utilise la fonction .map
    return ( 
        <>
            <h1>Bienvenue sur la partie Blog</h1>

            {/* Ci-dessous lister les articles depuis l'API */}

            {/* // If .. else en JSX cad opérateur ternaire */}
            {articles ? console.log(articles) : console.log("ya pas d'articles")}

            {/* // If simple en JSX avec les ?? */}
            {articles ?? console.log(articles)}

            {/* Liste non ordonnée destinées à afficher les articles */}
            <ul className="blog-articles">
                {/* Avec .map on va créer une liste (à partir d'un tableau), depuis ce qu'on recupe de l'API */}
                {/* Chaque élément de la liste doit avoir une key unique (on peut utiliser un id déjà fourni ou l'index) */}
                {articles ?? articles.map((article) => (
                    <li key={article.id}>
                        <h2>{article.title}</h2>
                        <p>{article.body}</p>
                    </li>
                ))}
            </ul>
        </>
     );
}

export default Blog;