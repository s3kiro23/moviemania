"use client";

import React from "react";
import Image from "next/image";

import { registerUserService } from "@/src/data/services/auth-services";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";
import FavoriteGenres from "@/src/components/favorite-genres/FavoriteGenres";
import ChevronRight from "@/public/chevron-right.png";
import { toast } from "react-toastify";

interface PreferencesFormProps {
	onBackClick: () => void;
	formData: FormData | null;
}

export default function PreferencesForm({ onBackClick, formData }: PreferencesFormProps) {
	const router = useRouter();

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const secondFormData = new FormData(e.currentTarget);
		const genres = secondFormData.getAll("genres").map(Number) as number[];

		if (genres.length < 3) {
			alert("Veuillez sélectionner au moins trois genres.");
			return;
		}

		if (!formData) {
			alert("Données du formulaire précédent manquantes.");
			return;
		}

		const mergedData = {
			email: formData.get("email") as string,
			password: formData.get("password") as string,
			genres,
		};

		const response = await registerUserService(mergedData);
		if (response?.error) {
			toast.error(response.error, { autoClose: 2000 });
			return;
		}
		toast.success(response?.success, { autoClose: 2000 });
		setTimeout(() => router.push("/login"), 2000);
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<div className="flex flex-col md:flex-row gap-5 md:gap-16 items-center justify-center">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 border-t-2 pt-10 md:pt-14">
					<FavoriteGenres />
				</div>
				<Button
					className="w-full md:hidden"
					type="submit"
				>
					Enregistrer
				</Button>
				<button className="hidden md:block">
					<Image
						src={ChevronRight}
						alt="chevron-right"
						width={100}
						height={100}
					/>
				</button>
			</div>
		</form>
	);
}
