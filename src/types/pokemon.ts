export type Pokemon = {
    name: string;
    url: string;
    sprite: string;
}

export type TrainerData = {
    firstName: string;
    lastName: string;
    pokemonTeam: Pokemon[];
}
