import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/pokemon/${id}`)
      .then((response) => {
        setPokemon(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  return (
    <>
      {pokemon && (
        <div>
          <h1>{pokemon?.name?.english}</h1>

          <Link to={`/pokemon/${id}/name`}>Name</Link>
          {Object.entries(pokemon.name).map(([language, name]) => (
            <p key={language}>
              {language}: {name}
            </p>
          ))}

          <Link to={`/pokemon/${id}/type`}>Type</Link>
          {pokemon.type.map((type, index) => (
            <p key={index}>{type}</p>
          ))}

          <Link to={`/pokemon/${id}/base`}>Base</Link>
          {Object.entries(pokemon.base).map(([stat, value]) => (
            <p key={stat}>
              {stat}: {value}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default PokemonDetail;
