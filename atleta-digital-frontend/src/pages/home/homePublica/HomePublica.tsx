import {Link} from 'react-router-dom';
import {Button, Card} from "flowbite-react";
import {
  FaArrowRight,
  FaFileMedical,
  FaHeartbeat,
  FaIdCard,
  FaShieldAlt,
  FaUsers,
  FaWallet
} from "react-icons/fa";
import {useAuth} from "../../../contexts/UseAuth.ts";

export default function HomePublica() {
  const { isAuthenticated, isHydrated } = useAuth();

  function buttonLogin() {
    if (!isHydrated) return;
    if (!isAuthenticated) {
      return (
        <Link to="/login">
          <Button
            style={{ backgroundColor: '#00A9B1' }}
            className="text-white hover:opacity-90 px-6 py-3 text-lg font-semibold cursor-pointer focus:outline-none focus:ring-0 shadow-lg transition-all"
          >
            Acessar Plataforma <FaArrowRight className="ml-2 mt-1" />
          </Button>
        </Link>
      );
    }
    return (
      <Link to="/dashboard">
        <Button
          style={{ backgroundColor: '#00A9B1' }}
          className="text-white hover:opacity-90 px-6 py-3 text-lg font-semibold cursor-pointer focus:outline-none focus:ring-0 shadow-lg"
        >
          Ir para o Painel <FaArrowRight className="ml-2 mt-1" />
        </Button>
      </Link>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 pt-20">

      {/* Hero Section com fundo escuro elegante e destaque em Turquesa */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-gray-950 text-white text-center py-24 px-5 border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            <p className="mb-6">
              Atleta Digital
            </p>
            <span style={{ color: '#00A9B1' }}>O perfil oficial do atleta</span>

          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            A carteirinha inteligente do atleta em um só lugar. Centralize dados pessoais, saúde, anamnese e controle financeiro com total segurança.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {buttonLogin()}
            <Link to="/sobre">

            </Link>
          </div>
        </div>
      </section>

      {/* Recursos Principais com bordas temáticas nas cores do logo */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Tudo o que o atleta precisa na palma da mão
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-14">
            Uma plataforma completa desenvolvida para integrar gestores, atletas e responsáveis com eficiência.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <Card className="shadow-md hover:shadow-xl transition-shadow border-t-4" style={{ borderTopColor: '#00A9B1' }}>
              <FaIdCard style={{ color: '#00A9B1' }} className="text-4xl mb-2" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Carteirinha Digital</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm leading-relaxed">
                Identificação oficial do atleta sempre atualizada e acessível digitalmente a qualquer momento.
              </p>
            </Card>

            <Card className="shadow-md hover:shadow-xl transition-shadow border-t-4" style={{ borderTopColor: '#F47F20' }}>
              <FaHeartbeat style={{ color: '#F47F20' }} className="text-4xl mb-2" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Saúde e Anamnese</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm leading-relaxed">
                Histórico clínico, fichas de anamnese e monitoramento de saúde integrados para maior segurança esportiva.
              </p>
            </Card>

            <Card className="shadow-md hover:shadow-xl transition-shadow border-t-4" style={{ borderTopColor: '#00A9B1' }}>
              <FaWallet style={{ color: '#00A9B1' }} className="text-4xl mb-2" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Gestão Financeira</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm leading-relaxed">
                Acompanhamento de mensalidades, taxas e histórico financeiro de forma transparente e prática.
              </p>
            </Card>

            <Card className="shadow-md hover:shadow-xl transition-shadow border-t-4" style={{ borderTopColor: '#F47F20' }}>
              <FaUsers style={{ color: '#F47F20' }} className="text-4xl mb-2" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Dados Sociais e Pessoais</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm leading-relaxed">
                Cadastro unificado contendo informações de contato, documentos e perfil social do atleta.
              </p>
            </Card>

            <Card className="shadow-md hover:shadow-xl transition-shadow border-t-4" style={{ borderTopColor: '#00A9B1' }}>
              <FaFileMedical style={{ color: '#00A9B1' }} className="text-4xl mb-2" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Laudos e Exames</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm leading-relaxed">
                Armazenamento seguro de atestados médicos, liberações e exames periódicos obrigatórios.
              </p>
            </Card>

            <Card className="shadow-md hover:shadow-xl transition-shadow border-t-4" style={{ borderTopColor: '#F47F20' }}>
              <FaShieldAlt style={{ color: '#F47F20' }} className="text-4xl mb-2" />
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 shadow-sm">
              <div
                style={{ backgroundColor: 'rgba(0, 169, 177, 0.15)', color: '#00A9B1' }}
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4"
              >
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Faça seu Cadastro</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Acesse com sua conta vinculada.
              </p>
            </Card>

            <Card className="text-center p-6 shadow-sm">
              <div
                style={{ backgroundColor: 'rgba(244, 127, 32, 0.15)', color: '#F47F20' }}
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4"
              >
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Preencha a Anamnese</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Atualize seus dados de saúde, contatos e informações sociais.
              </p>
            </Card>

            <Card className="text-center p-6 shadow-sm">
              <div
                style={{ backgroundColor: 'rgba(0, 169, 177, 0.15)', color: '#00A9B1' }}
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4"
              >
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Pronto! Tenha sua Carteirinha</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Acesse o perfil oficial do atleta com QR Code e histórico completo.
              </p>
            </Card>
          </div>
        </div>
      </section>

    </div>
  );
}