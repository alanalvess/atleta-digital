import {useAuth} from "../../contexts/UseAuth.ts";
import HomePublica from "./homePublica/HomePublica.tsx";
import {Roles} from "../../enums/Roles.ts";
import HomeAtleta from "./homeAtleta/HomeAtleta.tsx";

export default function Home() {
  const {usuario, isAuthenticated} = useAuth();

  if (!isAuthenticated || !usuario) {
    return <HomePublica/>
  }

  if (usuario.roles.includes(Roles.RESPONSAVEL)) {
    return <HomeAtleta/>
  }

  return <HomePublica />
}