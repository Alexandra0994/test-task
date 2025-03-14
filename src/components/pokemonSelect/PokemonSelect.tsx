import { useEffect, useState } from "react";
import axios from "axios";
import { Select, SelectOption } from "../select/Select.js";

interface PokemonSelectProps {
  selectedPokemon: string[];
  setSelectedPokemon: (pokemon: string[]) => void;
  hasSubmitted: boolean; 
}

export const PokemonSelect: React.FC<PokemonSelectProps> = ({
  selectedPokemon,
  setSelectedPokemon,
  hasSubmitted
}) => {
  const [pokemonOptions, setPokemonOptions] = useState<SelectOption[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => {
        const options = res.data.results.map((pokemon: { name: string }) => ({
          value: pokemon.name,
          label: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
        }));
        setPokemonOptions(options);
      })
      .catch(() => setError("Failed to load Pokémon data."));
  }, []);

  const handleSelectChange = (value: string | string[]) => {
    const selected = Array.isArray(value) ? value : [value];

    if (selected.length > 4) {
      setError("You can only select up to 4 Pokémon.");
      return;
    }
    setSelectedPokemon(selected);
    if (selected.length === 4) {
      setError(null);
    }
  };
  useEffect(() => {
    if (hasSubmitted && selectedPokemon.length !== 4) {
      setError("You must select exactly 4 Pokémon.");
    }
  }, [hasSubmitted, selectedPokemon]);

  return (
    <Select
      label="Select Pokémon"
      options={pokemonOptions}
      placeholder="Choose up to 4 Pokémon"
      multiple
      value={selectedPokemon}
      onChange={handleSelectChange}
      error={error || undefined}
      helpText="Search and select up to 4 Pokémon for your team."
      badgeVariant="pink"
    />
  );
};
