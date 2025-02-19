import { useState, useEffect } from "react";

function WeatherWidget() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const apiKey = "28a46ed081fa271f6e1f3b7415825368"; 

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("La géolocalisation n'est pas supportée par votre navigateur.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeather(latitude, longitude);
            },
            (err) => {
                setError("Impossible d'accéder à la localisation.");
                setLoading(false);
            }
        );
    }, []);

    const fetchWeather = (lat, lon) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=fr`)
            .then(res => res.json())
            .then(data => {
                if (data.cod !== 200) {
                    setError("Erreur lors de la récupération des données météo.");
                } else {
                    setWeather(data);
                }
                setLoading(false);
            })
            .catch(() => {
                setError("Erreur réseau.");
                setLoading(false);
            });
    };

    if (loading) return <p>Chargement...</p>;
    if (error) return <p> {error}</p>;

    return (
        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "10px", width: "250px", textAlign: "center" }}>
            <h3>{weather.name}, {weather.sys.country}</h3>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
            <p>{weather.weather[0].description}</p>
            <h2>{Math.round(weather.main.temp)}°C</h2>
        </div>
    );
}

export default WeatherWidget;
