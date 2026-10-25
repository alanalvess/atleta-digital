import {Link} from 'react-router-dom';
import {Button, Card} from "flowbite-react";
import {FaArrowRight, FaFileMedical, FaHeartbeat, FaIdCard, FaShieldAlt, FaUsers, FaWallet} from "react-icons/fa";
import {useAuth} from "../../../contexts/UseAuth.ts";

export default function HomePublica() {
  const {isAuthenticated, isHydrated} = useAuth();

  function buttonLogin() {
    if (!isHydrated) return;
    if (!isAuthenticated) {
      return (
        <Link to="/login">
          <Button
            style={{backgroundColor: '#00A9B1'}}
            className="text-white hover:opacity-90 px-8 py-3.5 text-lg font-semibold rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer focus:outline-none focus:ring-0"
          >
            Acessar Plataforma <FaArrowRight className="ml-2 mt-1"/>
          </Button>
        </Link>
      );
    }
    return (
      <Link to="/dashboard">
        <Button
          style={{backgroundColor: '#00A9B1'}}
          className="text-white hover:opacity-90 px-8 py-3.5 text-lg font-semibold rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer focus:outline-none focus:ring-0"
        >
          Ir para o Painel <FaArrowRight className="ml-2 mt-1"/>
        </Button>
      </Link>
    );
  }

  return (
    <div
      className="min-h-screen bg-slate-100 dark:bg-gray-950 text-gray-800 dark:text-gray-100 pt-24 transition-colors">

      {/* Hero Section - Clean, Arejada e Alegre */}
      <section className="text-center py-20 px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight text-gray-900 dark:text-white">
          <span style={{color: '#00A9B1'}}>Atleta Digital</span>
          <br/> O perfil oficial do atleta, <br/>
          <span style={{color: '#F47F20'}}>tudo conectado em um só lugar.</span>
        </h1>

        <p
          className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          A carteirinha inteligente do atleta. Centralize dados pessoais, de saúde, anamnese, controle
          financeiro em um ecossistema moderno feito para a sua jornada esportiva.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          {buttonLogin()}
        </div>
      </section>

      <div className="min-h-screen bg-slate-100 dark:bg-gray-900 pt-20">

        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-5 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Tudo o que o atleta precisa na palma da mão
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-14">
              Uma plataforma completa desenvolvida para integrar gestores, atletas e responsáveis com eficiência.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <Card className="shadow-md hover:shadow-xl transition-shadow border-t-4"
                    style={{borderTopColor: '#00A9B1'}}>
                <FaIdCard style={{color: '#00A9B1'}} className="text-4xl mb-2"/>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Carteirinha Digital</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm leading-relaxed">
                  Identificação oficial do atleta sempre atualizada e acessível digitalmente a qualquer momento.
                </p>
              </Card>

              <Card className="shadow-md hover:shadow-xl transition-shadow border-t-4"
                    style={{borderTopColor: '#F47F20'}}>
                <FaHeartbeat style={{color: '#F47F20'}} className="text-4xl mb-2"/>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Saúde e Anamnese</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm leading-relaxed">
                  Histórico clínico, fichas de anamnese e monitoramento de saúde integrados para maior segurança
                  esportiva.
                </p>
              </Card>

              <Card className="shadow-md hover:shadow-xl transition-shadow border-t-4"
                    style={{borderTopColor: '#00A9B1'}}>
                <FaWallet style={{color: '#00A9B1'}} className="text-4xl mb-2"/>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Gestão Financeira</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm leading-relaxed">
                  Acompanhamento de mensalidades, taxas e histórico financeiro de forma transparente e prática.
                </p>
              </Card>

              <Card className="shadow-md hover:shadow-xl transition-shadow border-t-4"
                    style={{borderTopColor: '#F47F20'}}>
                <FaUsers style={{color: '#F47F20'}} className="text-4xl mb-2"/>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Dados Sociais e Pessoais</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm leading-relaxed">
                  Cadastro unificado contendo informações de contato, documentos e perfil social do atleta.
                </p>
              </Card>

              <Card className="shadow-md hover:shadow-xl transition-shadow border-t-4"
                    style={{borderTopColor: '#00A9B1'}}>
                <FaFileMedical style={{color: '#00A9B1'}} className="text-4xl mb-2"/>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Laudos e Exames</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm leading-relaxed">
                  Armazenamento seguro de atestados médicos, liberações e exames periódicos obrigatórios.
                </p>
              </Card>

              <Card className="shadow-md hover:shadow-xl transition-shadow border-t-4"
                    style={{borderTopColor: '#F47F20'}}>
                <FaShieldAlt style={{color: '#F47F20'}} className="text-4xl mb-2"/>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Segurança e Privacidade</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm leading-relaxed">
                  Conformidade com padrões de segurança para proteger os dados sensíveis de cada atleta da associação.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Como funciona em 3 passos */}
        <section className="bg-slate-100 dark:bg-gray-950 py-20 text-center">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Como funciona o Atleta Digital?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-14 max-w-lg mx-auto">
              Processo simples e rápido para integrar o atleta ao ecossistema.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">

              <div
                className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
            <span
              className="inline-block px-3 py-1 rounded-lg text-sm font-bold mb-4 bg-cyan-50 dark:bg-cyan-950/60 text-[#00A9B1]">
              Passo 01
            </span>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Acesse o sistema</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Faça login com sua conta vinculada à associação FACAVI de forma segura.
                </p>
              </div>

              <div
                className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
            <span
              className="inline-block px-3 py-1 rounded-lg text-sm font-bold mb-4 bg-orange-50 dark:bg-orange-950/60 text-[#F47F20]">
              Passo 02
            </span>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Preencha os dados</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Atualize as informações de anamnese, contatos e dados sociais em poucos cliques.
                </p>
              </div>

              <div
                className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
            <span
              className="inline-block px-3 py-1 rounded-lg text-sm font-bold mb-4 bg-cyan-50 dark:bg-cyan-950/60 text-[#00A9B1]">
              Passo 03
            </span>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Pronto! Aproveite</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sua carteirinha digital e todo o histórico do atleta ficam disponíveis instantaneamente.
                </p>
              </div>

            </div>

          </div>
        </section>

      </div>

    </div>
  );
}