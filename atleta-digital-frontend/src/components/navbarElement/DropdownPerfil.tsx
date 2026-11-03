import {Link, useNavigate} from 'react-router-dom';
import {Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem} from "flowbite-react";
import {ToastAlerta} from '../../utils/ToastAlerta.ts';
import User from "../../assets/images/user-1.png";
import {useAuth} from "../../contexts/UseAuth.ts";
import {Toast} from "../../enums/Toast.ts";

export default function DropdownPerfil() {
  const navigate = useNavigate();
  const {usuario, handleLogout} = useAuth();

  const adminEmail = import.meta.env.ADMIN_EMAIL;

  function logout() {
    handleLogout();
    ToastAlerta('Sessão encerrada com sucesso', Toast.Success);
    navigate('/login');
  }

  return (
    <>
      <Dropdown
        label={
          <Avatar
            alt="Configurações do usuário"
            className='cursor-pointer hover:bg-gray-700 p-2'
            img={User}/>
        }
        arrowIcon={false}
        inline
      >
        <DropdownHeader>
          <span className="block text-sm">{usuario?.nome}</span>
          <span className="block truncate text-sm font-medium">{usuario?.email}</span>
          {usuario?.email === adminEmail && (
            <span className="block truncate text-sm font-medium mt-1 text-teal-600">
              <Link to='/admin'>Administração</Link>
            </span>
          )}
        </DropdownHeader>

        <DropdownDivider />

        <Link to="/meu-perfil" className="hover:underline">
          <DropdownItem>
            Meu Perfil
          </DropdownItem>
        </Link>

        {usuario?.email === adminEmail && (
          <Link to="/usuarios" className="hover:underline">
            <DropdownItem>
              Gestão de Usuários
            </DropdownItem>
          </Link>
        )}

        <DropdownDivider />

        <DropdownItem onClick={logout} className="text-red-500 hover:underline">
          Sair
        </DropdownItem>
      </Dropdown>
    </>
  )
}