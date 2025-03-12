import { useForm } from "react-hook-form";
import { PokemonSelect } from "../pokemonSelect/PokemonSelect.js";
import { useState } from "react";
import { Modal } from "../modal/Modal.js";

export const Form = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedPokemon, setSelectedPokemon] = useState<string[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const onSubmit = () => {
    if (selectedPokemon.length === 4) {
      setModalOpen(true);
    } else {
      alert("Please select exactly 4 Pokémon for your team.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          {...register("firstName", { required: true, pattern: /^[A-Za-z]{2,12}$/ })}
          placeholder="First Name"
          className="border p-2 rounded"
        />
        {errors.firstName && <p className="text-red-500">First name must be 2-12 letters.</p>}

        <input
          {...register("lastName", { required: true, pattern: /^[A-Za-z]{2,12}$/ })}
          placeholder="Last Name"
          className="border p-2 rounded"
        />
        {errors.lastName && <p className="text-red-500">Last name must be 2-12 letters.</p>}

        <PokemonSelect selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        selectedPokemon={selectedPokemon}
        title="Your Pokémon Team"
      />
    </div>
  );
};
