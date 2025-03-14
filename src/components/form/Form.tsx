import { useForm } from "react-hook-form";
import { PokemonSelect } from "../pokemonSelect/PokemonSelect.js";
import { useState } from "react";
import { Modal } from "../modal/Modal.js";
import { Input } from "../input/Input.js";
import { Button } from "../button/button.js";

interface FormValues {
  firstName: string;
  lastName: string;
}

export const Form = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [selectedPokemon, setSelectedPokemon] = useState<string[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const onSubmit = () => {
    setHasSubmitted(true);
    if (selectedPokemon.length === 4) {
      setModalOpen(true);
    }
  };

  return (
    <div className="w-max mx-auto p-6 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          {...register("firstName", {
            required: "First name is required",
            pattern: {
              value: /^[A-Za-z]{2,12}$/,
              message: "First name must be 2-12 letters."
            }
          })}
          placeholder="First Name"
          label="First Name"
          error={errors.firstName?.message}
        />
        <Input
          {...register("lastName", {
            required: "Last name is required",
            pattern: {
              value: /^[A-Za-z]{2,12}$/,
              message: "Last name must be 2-12 letters."
            }
          })}
          placeholder="Last Name"
          label="Last Name"
          error={errors.lastName?.message}
        />
        <PokemonSelect
          selectedPokemon={selectedPokemon}
          setSelectedPokemon={setSelectedPokemon}
          hasSubmitted={hasSubmitted}
        />
        <Button
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </form>

      <Modal
        isOpen={isModalOpen && selectedPokemon.length === 4}
        onClose={() => setModalOpen(false)}
        selectedPokemon={selectedPokemon}
        title="Your Pokémon Team"
      />
    </div>
  );
};

