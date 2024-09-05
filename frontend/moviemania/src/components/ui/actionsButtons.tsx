"use client";

import React, { useState } from "react";
import { ActionButtonProps } from "@/src/types";

const ActionButton: React.FC<ActionButtonProps> = ({ icon, onClick = () => {}, ariaLabel = "", isActive }) => {
	const handleClick = () => {
		onClick();
	};

	return (
		<button
			onClick={handleClick}
			aria-label={ariaLabel}
			className={`w-14 h-14 border-2 border-white rounded-full flex items-center justify-center transition ${isActive ? "bg-slate-400" : ""}`}
		>
			<i className={`fas ${icon} ${isActive ? "text-white" : "text-gray-500"} text-xl`}></i>
		</button>
	);
};

export default ActionButton;
