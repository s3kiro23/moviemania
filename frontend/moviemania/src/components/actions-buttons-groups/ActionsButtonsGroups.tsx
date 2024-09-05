"use client";

import React, { useState, useEffect, useCallback } from "react";
import Modal from "@/src/components/ui/modal";
import { useSession } from "next-auth/react";
import { ActionButtonGroupsProps, MovieUserProps } from "@/src/types";
import ActionButton from "@/src/components/ui/actionsButtons";
import { updateMovieState } from "@/app/api/movie-actions/updateMovieState";
import { getMovieUserBy } from "@/src/data/services/user-services"; // Assure-toi d'importer correctement la fonction
import { useMovieStore } from "@/src/store/movieStore"; // Assure-toi que le store est correctement importé

export const ActionsButtonsGroups: React.FC<ActionButtonGroupsProps> = ({ movie }) => {
	const { data: session } = useSession(); // Récupère la session
	const [showPopup, setShowPopup] = useState(false);
	const [userMovie, setUserMovie] = useState<MovieUserProps | null>(null); // Initialisé à null ou à une valeur par défaut

	// Accède au store Zustand
	const { userMovie: storedUserMovie, updateMovie } = useMovieStore((state) => ({
		userMovie: state.userMovie[movie.movie_id],
		updateMovie: state.updateMovie,
	}));

	// Fonction pour récupérer l'état du film depuis l'API
	const fetchMovieState = useCallback(async () => {
		if (session) {
			try {
				const userMovieProps = await getMovieUserBy(session, movie.movie_id);
				updateMovie(movie.movie_id, userMovieProps);
				setUserMovie(userMovieProps);
			} catch (error) {
				console.error("Error fetching movie state:", error);
			}
		}
	}, [session, movie.movie_id, updateMovie]);

	useEffect(() => {
		if (!storedUserMovie && session) {
			fetchMovieState();
		} else {
			setUserMovie(storedUserMovie);
		}
	}, [storedUserMovie, session, fetchMovieState]);

	const openPopup = () => {
		setShowPopup(true);
	};

	const closePopup = () => {
		setShowPopup(false);
	};

	const saveMovie = async () => {
		if (session && userMovie) {
			try {
				await updateMovieState(session, {
					movie_id: movie.movie_id,
					note: userMovie.note,
					saved: !userMovie.saved,
				});

				// Création d'un nouvel objet avec les propriétés mises à jour
				const updatedUserMovie = {
					movie_id: movie.movie_id,
					note: userMovie.note,
					saved: !userMovie.saved,
				};

				console.log("updatedUserMovie", updatedUserMovie);

				updateMovie(movie.movie_id, updatedUserMovie);
			} catch (error) {
				console.error("Error updating movie state:", error);
			}
		}
	};

	return (
		<>
			<div className="flex space-x-4 mb-4 justify-center sm:justify-start">
				{userMovie && (userMovie.note === 0 || userMovie.saved) ? (
					<ActionButton
						icon="fa-heart"
						ariaLabel="Like"
						isActive={userMovie?.saved}
						onClick={saveMovie}
					/>
				) : (
					""
				)}
				<ActionButton
					icon="fa-check"
					ariaLabel="Check"
					onClick={() => openPopup()}
					isActive={userMovie ? userMovie.note > 0 : true}
				/>
				{userMovie && (userMovie.note === 0 || userMovie.saved) ? (
					<ActionButton
						icon="fa-thumbs-down"
						ariaLabel="Dislike"
					/>
				) : (
					""
				)}
			</div>
			{showPopup && userMovie && (
				<Modal
					movie={movie}
					userMovieProps={userMovie}
					onClose={closePopup}
				/>
			)}
		</>
	);
};
