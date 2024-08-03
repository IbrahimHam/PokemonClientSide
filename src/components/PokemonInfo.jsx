import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PokemonInfo = () => {
  const { id, info } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/pokemon/${id}/${info}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id, info]);

  const renderData = () => {
    if (data) {
      if (info === "name") {
        return (
          <div>
            <h1>Names</h1>
            {Object.entries(data).map(([language, name]) => (
              <p key={language}>
                {language.charAt(0).toUpperCase() + language.slice(1)}: {name}
              </p>
            ))}
          </div>
        );
      }

      if (info === "type") {
        return (
          <div>
            <h1>Types</h1>
            {data.map((type, index) => (
              <p key={index}>{type}</p>
            ))}
          </div>
        );
      }

      if (info === "base") {
        return (
          <div>
            <h1>Base Stats</h1>
            {Object.entries(data).map(([stat, value]) => (
              <p key={stat}>
                {stat}: {value}
              </p>
            ))}
          </div>
        );
      }
    }
    return <div>Unknown info type</div>;
  };

  return <div>{renderData()}</div>;
};

export default PokemonInfo;
