import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";

function GeoGame() {
  const [position, setPosition] = useState(null);
  const [targetCountry, setTargetCountry] = useState(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(10);
  const maxRounds = 5;

  // Charger un pays aléatoire à chaque round
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then(res => res.json())
      .then(data => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const country = data[randomIndex];
        setTargetCountry({
          name: country.name.common,
          latlng: country.latlng
        });
      });
  }, [round]);

  // Timer du round
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      nextRound();
    }
  }, [timeLeft]);

  // Composant pour capturer le clic sur la carte
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      }
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>Votre choix</Popup>
      </Marker>
    );
  }

  // Calculer la distance entre la réponse et la vraie position
  function calculateDistance() {
    if (!position || !targetCountry) return 0;
    const [lat1, lon1] = targetCountry.latlng;
    const [lat2, lon2] = position;
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Gérer le passage au round suivant
  function nextRound() {
    if (round < maxRounds) {
      const distance = calculateDistance();
      setScore(score + Math.max(0, 1000 - distance));
      setRound(round + 1);
      setPosition(null);
      setTimeLeft(10);
    } else {
      alert(`Partie terminée ! Score final : ${score.toFixed(2)}`);
      setRound(1);
      setScore(0);
    }
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>GeoGame - Trouve {targetCountry?.name}</h1>
      <h2>Score : {score.toFixed(2)}</h2>
      <h2>Temps restant : {timeLeft}s</h2>

      <MapContainer center={[20, 0]} zoom={2} style={{ height: "500px", width: "80%", margin: "0 auto" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapContainer>

      <button onClick={nextRound} disabled={!position} style={{ marginTop: "20px", padding: "10px", fontSize: "16px" }}>
        Valider
      </button>
    </div>
  );
}

export default GeoGame;
