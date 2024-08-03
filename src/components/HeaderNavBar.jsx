import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { Link } from "react-router-dom";

const HeaderNavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          component={Link}
          to="/"
          size="large"
          edge="start"
          color="inheret"
          aria-label="logo"
        >
          <CatchingPokemonIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{textAlign:"left"}}>
          POKEMON FIGHT
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button component={Link} to="/" color="inherit">
            All Pokemons
          </Button>
          <Button component={Link} to="/battle" color="inherit">
            Battle
          </Button>
          <Button component={Link} to="/leaderboard" color="inherit">
            Leader Board
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderNavBar;
