// src/store/movieStore.ts
import create from "zustand";
import { MovieUserProps } from "@/src/types";

interface MovieStoreState {
	userMovie: { [key: number]: MovieUserProps }; // Associe movie_id aux propriétés du film utilisateur
	updateMovie: (movie_id: number, userMovieProps: MovieUserProps) => void;
}

export const useMovieStore = create<MovieStoreState>((set) => ({
	userMovie: {},

	updateMovie: (movie_id: number, userMovieProps: MovieUserProps) =>
		set((state) => ({
			userMovie: {
				...state.userMovie,
				[movie_id]: userMovieProps,
			},
		})),
}));
