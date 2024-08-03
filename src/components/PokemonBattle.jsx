import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const PokemonBattle = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [winner, setWinner] = useState(null);
  const [pokemon1Details, setPokemon1Details] = useState(null);
  const [pokemon2Details, setPokemon2Details] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/pokemon`)
      .then((response) => setPokemonList(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (pokemon1) {
      axios
        .get(`${import.meta.env.VITE_POKEMON_API}/${pokemon1.id}`)
        .then((response) => setPokemon1Details(response.data))
        .catch((error) => console.error("Error fetching data:", error));
    }
    if (pokemon2) {
      axios
        .get(`${import.meta.env.VITE_POKEMON_API}/${pokemon2.id}`)
        .then((response) => setPokemon2Details(response.data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [pokemon1, pokemon2]);

  const calculateDamage = (attacker, defender) => {
    return Math.max(0, attacker.base.Attack - defender.base.Defense);
  };

  const saveResults = (pokemon1, pokemon2, winner, rounds, image1, image2) => {
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/game/save`, {
        pokemon1,
        pokemon2,
        winner,
        rounds,
        image1,
        image2,
      })
      .then((response) => {
        console.log("Game saved:", response.data);
      })
      .catch((error) => {
        console.error("Error saving game:", error);
      });
  };

  const startBattle = () => {
    if (pokemon1 && pokemon2) {
      let hp1 = pokemon1.base.HP;
      let hp2 = pokemon2.base.HP;
      const rounds = 5;

      for (let i = 0; i < rounds; i++) {
        hp1 -= calculateDamage(pokemon2, pokemon1);
        hp2 -= calculateDamage(pokemon1, pokemon2);
      }

      const winner =
        hp1 > hp2
          ? pokemon1.name.english
          : hp2 > hp1
          ? pokemon2.name.english
          : "Draw";

      saveResults(
        pokemon1.name.english,
        pokemon2.name.english,
        winner,
        rounds,
        pokemon1Details.sprites.front_default,
        pokemon2Details.sprites.front_default
      );
      setWinner(winner);
    }
  };

  return (
    <div>
      <Container>
        <h1>Pokemon Battle</h1>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Box mr={2} flex={1}>
            <FormControl fullWidth>
              <InputLabel>Choose Pokemon 1</InputLabel>
              <Select
                value={pokemon1 && pokemon1.id}
                onChange={(e) =>
                  setPokemon1(pokemonList.find((p) => p.id === e.target.value))
                }
              >
                {pokemonList.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.name.english}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box flex={1}>
            <FormControl fullWidth>
              <InputLabel>Choose Pokemon 2</InputLabel>
              <Select
                value={pokemon2 ? pokemon2.id : ""}
                onChange={(e) =>
                  setPokemon2(pokemonList.find((p) => p.id === e.target.value))
                }
              >
                {pokemonList.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.name.english}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={startBattle}
          disabled={!pokemon1 || !pokemon2}
        >
          Start Battle
        </Button>

        <Box display="flex" justifyContent="space-between" mt={2}>
          {pokemon1Details && (
            <Box textAlign="center">
              <Typography variant="h6">{pokemon1.name.english}</Typography>
              <img
                src={pokemon1Details.sprites.front_default}
                alt={pokemon1.name.english}
                style={{ width: "150px", height: "150px" }}
              />
              <Typography>HP:{pokemon1.base.HP}</Typography>
              <Typography>Attack:{pokemon1.base.Attack}</Typography>
              <Typography>Defense:{pokemon1.base.Defense}</Typography>
            </Box>
          )}
          {pokemon1Details && pokemon2Details && (
            <Typography variant="h2" mt={9}>
              vs
            </Typography>
          )}
          {pokemon2Details && (
            <Box textAlign="center">
              <Typography variant="h6">{pokemon2.name.english}</Typography>
              <img
                src={pokemon2Details.sprites.front_default}
                alt={pokemon2.name.english}
                style={{ width: "150px", height: "150px" }}
              />
              <Typography>HP:{pokemon2.base.HP}</Typography>
              <Typography>Attack:{pokemon2.base.Attack}</Typography>
              <Typography>Defense:{pokemon2.base.Defense}</Typography>
            </Box>
          )}
        </Box>
        {winner && (
          <Typography variant="h4" mt={2}>
            Winner: {winner}
          </Typography>
        )}
      </Container>
    </div>
  );
};

export default PokemonBattle;
