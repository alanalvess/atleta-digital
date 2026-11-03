import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

import HomePublica from '../pages/home/HomePublica.tsx';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import ListarUsuarios from '../pages/usuario/ListarUsuarios.tsx';
import Perfil from '../pages/perfil/Perfil.tsx';
import Sobre from '../pages/sobre/Sobre';
import Duvidas from '../pages/duvidas/Duvidas';
import Error500 from '../pages/errors/Error500';
import Error404 from '../pages/errors/Error404';
import ListarAtletas from "../pages/atleta/ListarAtletas.tsx";
import ListarEquipes from "../pages/equipe/ListarEquipes.tsx";
import ListarSessoesTreino from "../pages/treino/ListarSessoesTreino.tsx";
import CatracaDigital from "../pages/treino/CatracaDigital.tsx";
import ListarFuncionarios from "../pages/funcionario/ListarFuncionarios.tsx";

export function AppRoutes() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path='/' element={<HomePublica />} />
      <Route path='/login' element={<Login />} />
      <Route path='/sobre' element={<Sobre />} />
      <Route path='/duvidas' element={<Duvidas />} />
      <Route path='/erro' element={<Error500 />} />

      {/* Rotas Privadas (Protegidas pelo PrivateRoute) */}
      <Route element={<PrivateRoute />}>
        <Route path='/home' element={<Home />} />
        <Route path="/meu-perfil" element={<Perfil />} />
        <Route path="/usuarios" element={<ListarUsuarios />} />

        <Route path="/atletas" element={<ListarAtletas />} />
        <Route path="/equipes" element={<ListarEquipes />} />
        <Route path="/treinos" element={<ListarSessoesTreino />} />
        <Route path="/treinos/frequencia" element={<ListarSessoesTreino />} />
        <Route path="/catraca-digital/:sessaoId" element={<CatracaDigital />} />
        <Route path="/funcionarios" element={<ListarFuncionarios />} />

        {/* Futuras rotas organizadas por domínio:

        <Route path="/financeiro" element={<DashboardFinanceiro />} />
        <Route path="/saude" element={<ProntuariosBase />} />
        */}
      </Route>

      <Route path='*' element={<Error404 />} />
    </Routes>
  );
}