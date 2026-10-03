import {useAuth} from "../../contexts/UseAuth.ts";
import {Roles} from "../../enums/Roles.ts";
import HomePublica from "./homePublica/HomePublica.tsx";
import HomeAtleta from "./homeAtleta/HomeAtleta.tsx";

export default function Home() {
    const {usuario, isAuthenticated} = useAuth();

    if (!isAuthenticated || !usuario) {
        return <HomePublica/>
    }

    if (usuario.roles.includes(Roles.TECNICO)) {
        return <HomeAtleta/>
    }

    return <HomePublica />
}
