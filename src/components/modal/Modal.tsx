import axios from 'axios';
import { useEffect, useState } from 'react';
import { XMarkIcon } from "@heroicons/react/24/outline"
import { fetchPokemonSprites } from '../../api/api.js';
import { Button } from '../button/Button.js';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedPokemon: string[];
  title?: string;
  onSave?: () => void;
  children?: React.ReactNode;
  className?: string;

}

export const Modal: React.FC<Props> = ({ title = "Modal title", isOpen, onClose, onSave, selectedPokemon }) => {
  const [sprites, setSprites] = useState<string[]>([]);

  useEffect(() => {
    const loadSprites = async () => {
      const spriteURLs = await fetchPokemonSprites(selectedPokemon);
      setSprites(spriteURLs);
    };

    if (isOpen && selectedPokemon.length > 0) {
      loadSprites();
    }
  }, [isOpen, selectedPokemon]);

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-[900px]">

        <div className="flex flex-row items-center justify-between space-y-0 pb-4">
          <h2 className="text-xl font-semibold leading-none tracking-tight">
            {title}
          </h2>
          <button
            className="h-8 w-8 rounded-full p-0 cursor-pointer"
            onClick={onClose}
          >
            <XMarkIcon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        <div className="space-y-6 py-4">
          <div className="rounded-lg border border-dashed border-slate-200 p-4 flex items-center justify-center">
            {sprites[0] && <img src={sprites[0]} alt="pokemon" className="w-16 h-16" />}
          </div>
          <div className="rounded-lg border border-dashed border-slate-200  p-4 flex items-center justify-center">
            {sprites[1] && <img src={sprites[1]} alt="pokemon" className="w-16 h-16" />}
          </div>
          <div className="rounded-lg border border-dashed border-slate-200 p-4 flex items-center justify-center">
            {sprites[2] && <img src={sprites[2]} alt="pokemon" className="w-16 h-16" />}
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-2 h-[48px]">
          <div className="flex-1 rounded-lg border border-dashed border-slate-200 p-2 flex items-center justify-center h-full">
            {sprites[3] && <img src={sprites[3]} alt="pokemon" className="w-16 h-16" />}
          </div>
          <Button variant='outline' onClick={onClose}>Cancel</Button>
          <Button variant='primary' onClick={onSave}>Save</Button>
        </div>

      </div>
    </div>
  )
};