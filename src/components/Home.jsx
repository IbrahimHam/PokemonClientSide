import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, List, ListItem } from "@mui/material";

function Home() {
  const [pokemon, setPokemon] = useState([]);

  const linkStyle = {
    color: "inherit",
    textDecoration: "none",
    display: "block",
    width: "100%"
  };

  const ulStyle = {
    listStyleType: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%"
  };

  const liStyle = {
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "#f9f9f9",
    // width: "80%",
    boxSizing: "border-box",
    textAlign: "center"
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/pokemon`)
      .then((response) => {
        setPokemon(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <h1>
        Pokemon List
      </h1>
      {pokemon && (
        <List style={ulStyle}>
          {pokemon.map((p) => (
            <ListItem key={p.id} style={liStyle}>
              <Link to={`/pokemon/${p.id}`} style={linkStyle}>
                {p.name.english}
              </Link>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}

export default Home;
