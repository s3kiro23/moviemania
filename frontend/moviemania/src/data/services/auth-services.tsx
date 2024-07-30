import axios from "axios";
import { NextResponse } from "next/server";

interface RegisterUserProps {
   email: string;
   password: string;
}

export async function registerUserService(userData: RegisterUserProps) {
   try {
      const response = await axios({
         url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/open`,
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         data: JSON.stringify({ ...userData }),
      });

      console.log("registerUserService", response);

      return response.data;
   } catch (error) {
      NextResponse.json({ error });
   }
}

interface LoginUserProps {
   email: string;
   password: string;
}

export async function loginUserService(userData: LoginUserProps) {
   try {
      const response = await axios.post(
         `${process.env.NEXT_PUBLIC_API_URL}/api/v1/login/access-token`,
         userData, // Utilise directement l'objet
         {
            headers: {
               "Content-Type": "application/x-www-form-urlencoded"
            },
         }
      );
      console.log("loginUserService response", response);
      return response.data;
   } catch (error) {
      console.error("loginUserService error", error);
      return { error: "An error occurred while logging in" };
   }
}
