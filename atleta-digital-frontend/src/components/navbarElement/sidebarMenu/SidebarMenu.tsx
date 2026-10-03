import {NavLink} from "react-router-dom";
import {useAuth} from "../../../contexts/UseAuth.ts";
import {Sidebar, SidebarItem, SidebarItemGroup, SidebarItems} from "flowbite-react";
import {Roles} from "../../../enums/Roles.ts";
import {
    FaBell,
    FaBook,
    FaChartBar,
    FaClipboardCheck,
    FaClipboardList,
    FaGraduationCap, FaMedal,
    FaNoteSticky,
    FaUsers
} from "react-icons/fa6";
import {FaChalkboardTeacher, FaFileAlt} from "react-icons/fa";
import {MdManageAccounts} from "react-icons/md";

export default function SidebarMenu() {
    const {usuario} = useAuth();

    if (!usuario?.roles) return null;

    function SidebarLink({to, icon, children}: any) {
        return (
            <NavLink
                to={to}
                className={({isActive}) =>
                    `block rounded-xl ${
                        isActive
                            ? "bg-gray-300 hover:bg-gray-500 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                            : ""
                    }`
                }
            >
                <SidebarItem className="hover:bg-gray-200" icon={icon}>{children}</SidebarItem>
            </NavLink>
        );
    }

    return (
        <>
            <Sidebar
                aria-label="MENU"
                className=" flex flex-col "
                theme={{"root": {"inner": "rounded-r-2xl rounded-l-none bg-gray-100"}}}
            >
                <div className="flex flex-col justify-between ">
                    <SidebarItems className="overflow-y-auto h-full ">

                        <SidebarItemGroup>
                            {/* TECNICO */}
                            {usuario.roles.includes(Roles.TECNICO) && (
                                <>
                                    <SidebarLink to="/alertas-tecnicos" icon={FaBell}>
                                        Alertas
                                    </SidebarLink>
                                </>
                            )}

                            {/* RESPONSÁVEL */}
                            {usuario.roles.includes(Roles.RESPONSAVEL) && (
                                <>
                                    <SidebarLink to="/dashboard-responsavel" icon={FaChartBar}>
                                        Dashboard
                                    </SidebarLink>
                                    <SidebarLink to="/boletim-escolar" icon={FaMedal}>
                                        Notas
                                    </SidebarLink>
                                    <SidebarLink to="/frequencia-aluno" icon={FaClipboardCheck}>
                                        Frequência
                                    </SidebarLink>
                                    <SidebarLink to="/observacoes-aluno" icon={FaNoteSticky}>
                                        Observações
                                    </SidebarLink>
                                    <SidebarLink to="/alertas-academicos" icon={FaBell}>
                                        Alertas
                                    </SidebarLink>
                                </>
                            )}

                            {/* ADMIN */}
                            {usuario.roles.includes(Roles.ADMIN) && (
                                <>
                                    <SidebarLink to="/usuarios" icon={MdManageAccounts}>
                                        Usuários
                                    </SidebarLink>
                                    <SidebarLink to="/acessos" icon={MdManageAccounts}>
                                        Acessos
                                    </SidebarLink>
                                </>
                            )}
                        </SidebarItemGroup>
                    </SidebarItems>
                </div>
            </Sidebar>
        </>
    )
}