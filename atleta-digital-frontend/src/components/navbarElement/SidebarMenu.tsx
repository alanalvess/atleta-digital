import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import {
  FaHeartbeat, FaWallet, FaFutbol, FaIdCard,
  FaChartBar, FaUsers, FaClipboardCheck, FaShieldAlt
} from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { NavLink } from "react-router-dom";
import type {FC, SVGProps} from "react";
import { Role } from "../../enums/Role";
import { useAuth } from "../../contexts/UseAuth";

// 1. Tipagem para a estrutura de dados do menu
interface MenuItem {
  to: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  label: string;
}

interface MenuGroup {
  title: string;
  allowedRoles: Role[];
  items: MenuItem[];
}

// 2. Configuração Centralizada (Data-Driven Design)
const MENU_CONFIG: MenuGroup[] = [
  {
    title: "Gestão do Clube",
    allowedRoles: [Role.COORDENADOR_TECNICO, Role.TECNICO, Role.DIRETOR, Role.PRESIDENTE],
    items: [
      // { to: "/dashboard", icon: FaChartBar, label: "Dashboard Geral" },
      { to: "/atletas", icon: FaIdCard, label: "Gestão de Atletas" },
      // { to: "/financeiro", icon: FaWallet, label: "Financeiro Mensalidades" },
      // { to: "/saude", icon: FaHeartbeat, label: "Prontuários e Saúde" },
      { to: "/treinos", icon: FaFutbol, label: "Gestão de Treinos" }
    ]
  },
  {
    title: "Comissão Técnica",
    allowedRoles: [Role.TREINADOR, Role.PREPARADOR_FISICO],
    items: [
      { to: "/treinos/frequencia", icon: FaClipboardCheck, label: "Chamada e Frequência" },
      // { to: "/treinos/avaliacoes", icon: FaChartBar, label: "Avaliações Técnicas" },
      { to: "/funcionarios", icon: FaUsers, label: "Minhas Equipes" }
    ]
  },
  {
    title: "Área do Atleta",
    allowedRoles: [Role.ATLETA, Role.RESPONSAVEL],
    items: [
      { to: "/meu-perfil/financeiro", icon: FaWallet, label: "Meu Financeiro" },
      { to: "/meu-perfil/saude", icon: FaHeartbeat, label: "Minhas Fichas Médicas" },
      { to: "/meu-perfil/desempenho", icon: FaFutbol, label: "Boletim de Desempenho" }
    ]
  },
  {
    title: "Administração do Sistema",
    allowedRoles: [Role.ADMIN],
    items: [
      { to: "/usuarios", icon: MdManageAccounts, label: "Gestão de Usuários" },
      { to: "/acessos", icon: FaShieldAlt, label: "Gestão de Acessos" }
    ]
  }
];

export default function SidebarMenu() {
  const { usuario } = useAuth();

  if (!usuario?.roles) return null;

  // 3. Validador de Permissões: Admin acessa tudo, demais perfis acessam os configurados
  const temPermissao = (allowedRoles: Role[]) => {
    if (usuario.roles.includes(Role.ADMIN)) return true;
    return allowedRoles.some(role => usuario.roles.includes(role));
  };

  return (
    <Sidebar aria-label="Menu Lateral" className="flex flex-col" theme={{ "root": { "inner": "rounded-r-2xl rounded-l-none bg-gray-100 dark:bg-gray-800" } }}>
      <div className="flex flex-col justify-between max-h-[60vh]">
        <SidebarItems className="overflow-y-auto max-h-[60vh] pb-4 scrollbar-thin">

          {MENU_CONFIG.map((group, groupIndex) => {
            if (!temPermissao(group.allowedRoles)) return null;

            return (
              <SidebarItemGroup key={groupIndex}>
                {/* Opcional: Renderizar o título do grupo para organizar visualmente */}
                <div className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                  {group.title}
                </div>

                {group.items.map((item, itemIndex) => (
                  <NavLink
                    key={itemIndex}
                    to={item.to}
                    className={({ isActive }) => `block rounded-xl mb-1 ${isActive ? "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 text-gray-900 dark:text-gray-100" : ""}`}
                  >
                    <SidebarItem className="hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer" icon={item.icon}>
                      {item.label}
                    </SidebarItem>
                  </NavLink>
                ))}
              </SidebarItemGroup>
            );
          })}

        </SidebarItems>
      </div>
    </Sidebar>
  );
}