import { authConfig } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";

export default async function getServerCredentials() {
  return await getServerSession(authConfig);
}
