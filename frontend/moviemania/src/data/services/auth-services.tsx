"use server";

import axios from "axios";
import { error } from "console";

interface CheckUserProps {
	email: string;
}

export async function checkUserService(userData: CheckUserProps) {
	try {
		const response = await axios({
			url: `/api/users/v1/users/check`,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify({ ...userData }),
		});
		return response.data;
	} catch (axiosError) {
		console.error(axiosError);
	}
}

interface RegisterUserProps {
	email: string;
	password: string;
	genres: number[];
}

export async function registerUserService(userData: RegisterUserProps) {
	try {
		const response = await axios({
			url: `/api/users/v1/users/open`,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify({ ...userData }),
		});
		if (response.status === 200) {
			return { success: "Enregistrement réussi ! Redirection vers la page de connexion..." };
		}
	} catch (axiosError) {
		return { error: "Un problème est survenue lors de l'enregistrement..." };
	}
}

interface LoginUserProps {
	email: string;
	password: string;
}

export async function loginUserService(userData: LoginUserProps) {
	try {
		const response = await axios.post(
			`/api/users/v1/login/access-token`,
			userData, // Utilise directement l'objet
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		);
		if (response.status === 200) {
			return { success: "Connexion réussi !" };
		}
	} catch (axiosError) {
		return { error: "L'association de cet email et mot de passe n'existe pas" };
	}
}
