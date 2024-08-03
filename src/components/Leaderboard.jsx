import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, List, ListItem } from "@mui/material";

const Leaderboard = () => {
  const [games, setGames] = useState([]);

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
    // textAlign: "center"
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/game/leaderboard`)
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <h1>
        Leaderboard
      </h1>
      <List style={ulStyle}>
        {games.map((game) => (
          <ListItem key={game._id} style={liStyle}>
            <Typography variant="h6">
              {game.pokemon1} vs {game.pokemon2} - Winner: {game.winner} - Rounds: {game.rounds}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Leaderboard;
