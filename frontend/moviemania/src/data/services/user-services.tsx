import axios from "axios";
import { NextResponse } from "next/server";

interface patchUserProfileProps {
	email?: string;
	nom?: string;
	prenom?: string;
	sexe?: string;
	birthday?: string;
}

export const getUserProfile = async (session: any) => {
	try {
		const response = await axios({
			url: `/api/users/v1/users/me`,
			method: "GET",
			headers: {
				"Content-Type": "application",
				Authorization: `Bearer ${session?.accessToken}`,
			},
		});
		return response.data;
	} catch (error) {
		NextResponse.json({ error });
	}
};

export const postGenresUser = async (session: any, genres: string[]) => {
	try {
		const response = await axios({
			url: `/api/users/v1/genreusers/`,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session?.accessToken}`,
			},
			data: JSON.stringify({
				genre_id: genres,
			}),
		});
		if (response.status === 200) {
			alert("Genres enregistrés avec succès !");
		}
	} catch (error) {
		NextResponse.json({ error });
	}
};

export const patchUserProfile = async (session: any, userData: patchUserProfileProps) => {
	try {
		const response = await axios({
			url: `/api/users/v1/users/me`,
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session?.accessToken}`,
			},
			data: userData,
		});
		if (response.status === 200) {
			return { success: "Opération réussie!" };
		}
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return { error: "Erreur lors de la mise à jour..." };
		}
	}
};

export const deleteUserProfile = async (session: any) => {
	try {
		const response = await axios({
			url: `/api/users/v1/users/me`,
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session?.accessToken}`,
			},
		});
		if (response.status === 200) {
			return { success: true };
		}
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return { success: false };
		}
	}
};

interface updateUserPasswordProps {
	current_password: string;
	new_password: string;
}

export const updateUserPassword = async (session: any, userData: updateUserPasswordProps) => {
	try {
		const response = await axios({
			url: `/api/users/v1/users/me/password`,
			method: "PUT",
			headers: {
				ContentType: "application/json",
				Authorization: `Bearer ${session?.accessToken}`,
			},
			data: userData,
		});
		if (response.status === 200) {
			return { success: "Mot de passe mis à jour!" };
		}
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return { error: "Erreur lors de la mise à jour du mot de passe..." };
		}
	}
};

interface movieUserProps {
	movie_id: number;
	note: number;
	saved: boolean;
}

export const getMovieUser = async (session: any) => {
	try {
		const response = await axios({
			url: `/api/users/v1/movieusers/`,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session?.accessToken}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Erreur lors de la récupération des films user:", error);
		throw error;
	}
};

export const getMovieUserBy = async (session: any, id: number) => {
	try {
		const response = await axios({
			url: `/api/users/v1/movieusers/${id}`,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session?.accessToken}`,
			},
		});
		if (response.status !== 200) {
			return { success: false };
		}
		return response.data;
	} catch (error) {
		console.error("Erreur lors de la récupération des films user:", error);
		return { movie_id: id, note: 0, saved: false };
	}
};

export const postMovieUser = async (session: any, userData: movieUserProps) => {
	try {
		const response = await axios({
			url: `/api/users/v1/movieusers/`,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session?.accessToken}`,
			},
			data: userData,
		});
		if (response.status === 200) {
			return { success: true };
		}
	} catch (error) {
		console.error("Erreur lors de la mise à jour du profil utilisateur:", error);
		throw error;
	}
};

export const updateMovieUser = async (session: any, userData: movieUserProps) => {
	try {
		const response = await axios({
			url: `/api/users/v1/movieusers/`,
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session?.accessToken}`,
			},
			data: userData,
		});
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		console.error("Erreur lors de la mise à jour du profil utilisateur:", error);
		throw error;
	}
};
