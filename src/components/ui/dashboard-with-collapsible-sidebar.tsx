"use client"
import React, { useState, useEffect } from "react";
import {
  Home,
  Bot,
  PlayCircle,
  ShoppingCart,
  Users,
  ChevronDown,
  ChevronsRight,
  Moon,
  Sun,
  TrendingUp,
  Activity,
  Package,
  Bell,
  LogOut,
  DollarSign,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import amazonLogo from "@/assets/amazon-logo-new.png";

export const Example = () => {
  const [isDark, setIsDark] = useState(false);
  const [selected, setSelected] = useState("Painel");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { signOut, profile } = useAuth();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className={`flex min-h-screen w-full ${isDark ? 'dark' : ''}`}>
      <div className="flex w-full bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Sidebar 
          signOut={signOut} 
          profile={profile} 
          selected={selected} 
          setSelected={setSelected} 
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />
        <div className="flex-1 md:ml-0">
          <ExampleContent 
            isDark={isDark} 
            setIsDark={setIsDark} 
            selected={selected} 
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ signOut, profile, selected, setSelected, open, setOpen }: { 
  signOut: () => void; 
  profile: any; 
  selected: string; 
  setSelected: (title: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      
      <nav
        className={`fixed md:sticky top-0 h-screen shrink-0 border-r transition-all duration-300 ease-in-out z-50 ${
          open ? 'w-64 translate-x-0' : 'w-16 -translate-x-full md:translate-x-0'
        } border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 shadow-sm`}
      >
        <TitleSection open={open} profile={profile} />

        <div className="space-y-1 mb-8">
          <Option
            Icon={Home}
            title="Painel"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
          <Option
            Icon={Bot}
            title="Agente AMZ"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
          <Option
            Icon={PlayCircle}
            title="Vídeo aula"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
          <Option
            Icon={ShoppingCart}
            title="Produtos"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
          <Option
            Icon={Users}
            title="Membros"
            selected={selected}
            setSelected={setSelected}
            open={open}
            notifs={12}
          />
        </div>

        <div className="absolute bottom-16 left-0 right-0 px-2">
          <button
            onClick={signOut}
            className="flex h-11 w-full items-center rounded-md transition-all duration-200 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/50 hover:text-red-700 dark:hover:text-red-300"
          >
            <div className="grid h-full w-12 place-content-center">
              <LogOut className="h-4 w-4" />
            </div>
            {open && (
              <span className="text-sm font-medium transition-opacity duration-200">
                Sair
              </span>
            )}
          </button>
        </div>

        <ToggleClose open={open} setOpen={setOpen} />
      </nav>
    </>
  );
};

const Option = ({ Icon, title, selected, setSelected, open, notifs }: {
  Icon: any;
  title: string;
  selected: string;
  setSelected: (title: string) => void;
  open: boolean;
  notifs?: number;
}) => {
  const isSelected = selected === title;
  
  return (
    <button
      onClick={() => setSelected(title)}
      className={`relative flex h-11 w-full items-center rounded-md transition-all duration-200 ${
        isSelected 
          ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shadow-sm border-l-2 border-blue-500" 
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
      }`}
    >
      <div className="grid h-full w-12 place-content-center">
        <Icon className="h-4 w-4" />
      </div>
      
      {open && (
        <span
          className={`text-sm font-medium transition-opacity duration-200 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {title}
        </span>
      )}

      {notifs && open && (
        <span className="absolute right-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 dark:bg-blue-600 text-xs text-white font-medium">
          {notifs}
        </span>
      )}
    </button>
  );
};

const TitleSection = ({ open, profile }: { open: boolean; profile: any }) => {
  return (
    <div className="mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
      <div className="flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
        <div className="flex items-center gap-3">
          <Logo />
          {open && (
            <div className={`transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center gap-2">
                <div>
                  <span className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {profile?.full_name || profile?.email || 'Usuário'}
                  </span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    {profile?.role === 'admin' ? 'Administrador' : 'Plano Inicial'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        {open && (
          <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        )}
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <div className="grid size-10 shrink-0 place-content-center rounded-lg bg-white shadow-sm border border-gray-200">
      <img 
        src={amazonLogo} 
        alt="Amazon Logo" 
        className="w-8 h-8 object-contain"
      />
    </div>
  );
};

const ToggleClose = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-800 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
    >
      <div className="flex items-center p-3">
        <div className="grid size-10 place-content-center">
          <ChevronsRight
            className={`h-4 w-4 transition-transform duration-300 text-gray-500 dark:text-gray-400 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
        {open && (
          <span
            className={`text-sm font-medium text-gray-600 dark:text-gray-300 transition-opacity duration-200 ${
              open ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Ocultar
          </span>
        )}
      </div>
    </button>
  );
};

const ExampleContent = ({ isDark, setIsDark, selected, sidebarOpen, setSidebarOpen }: { 
  isDark: boolean; 
  setIsDark: (isDark: boolean) => void;
  selected: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) => {

  const renderMaintenanceContent = (title: string) => (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950 p-3 sm:p-4 lg:p-6 overflow-auto">
      {/* Mobile Header */}
      <div className="flex items-center justify-between mb-6 md:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">{title}</h1>
        <div className="w-9" /> {/* Spacer for alignment */}
      </div>
      
      <div className="flex items-center justify-between mb-8 hidden md:flex">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Esta seção está em manutenção</p>
        </div>
      </div>
      
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
            <Package className="w-10 h-10 sm:w-12 sm:h-12 text-orange-600 dark:text-orange-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Em Manutenção</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md text-sm sm:text-base">
            Esta funcionalidade está sendo atualizada. Voltaremos em breve com melhorias!
          </p>
          <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
            <span className="text-xs sm:text-sm font-medium text-orange-700 dark:text-orange-300">
              MANUTENÇÃO EM ANDAMENTO
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  if (selected !== "Painel") {
    return renderMaintenanceContent(selected);
  }

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950 p-3 sm:p-4 lg:p-6 overflow-auto">
      {/* Mobile Header */}
      <div className="flex items-center justify-between mb-6 md:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">Painel</h1>
        <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            {isDark ? (
              <Sun className="h-3 w-3" />
            ) : (
              <Moon className="h-3 w-3" />
            )}
          </button>
        </div>
      </div>
      
      {/* Desktop Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0 hidden md:flex">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Painel</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">Bem-vindo ao seu painel</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="relative p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="absolute -top-1 -right-1 h-2 w-2 sm:h-3 sm:w-3 bg-red-500 rounded-full"></span>
          </button>
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            {isDark ? (
              <Sun className="h-3 w-3 sm:h-4 sm:w-4" />
            ) : (
              <Moon className="h-3 w-3 sm:h-4 sm:w-4" />
            )}
          </button>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
          </div>
          <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1 text-xs sm:text-sm">Vendas Totais</h3>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">R$ 124.567</p>
          <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 mt-1">+12% do mês passado</p>
        </div>
        
        <div className="p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
            </div>
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
          </div>
          <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1 text-xs sm:text-sm">Usuários Ativos</h3>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">1.234</p>
          <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 mt-1">+5% da semana passada</p>
        </div>
        
        <div className="p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
          </div>
          <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1 text-xs sm:text-sm">Pedidos</h3>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">456</p>
          <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 mt-1">+8% de ontem</p>
        </div>

        <div className="p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <Package className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
          </div>
          <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1 text-xs sm:text-sm">Produtos</h3>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">89</p>
          <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 mt-1">+3 novos esta semana</p>
        </div>
      </div>
      
      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">Atividade Recente</h3>
              <button className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium self-start sm:self-auto">
                Ver tudo
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {[
                { icon: DollarSign, title: "Nova venda registrada", desc: "Pedido #1234 concluído", time: "2 min atrás", color: "green" },
                { icon: Users, title: "Novo usuário registrado", desc: "joao.silva@exemplo.com se juntou", time: "5 min atrás", color: "blue" },
                { icon: Package, title: "Produto atualizado", desc: "iPhone 15 Pro estoque atualizado", time: "10 min atrás", color: "purple" },
                { icon: Activity, title: "Manutenção do sistema", desc: "Backup agendado concluído", time: "1 hora atrás", color: "orange" },
                { icon: Bell, title: "Nova notificação", desc: "Resultados da campanha de marketing", time: "2 horas atrás", color: "red" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center space-x-3 sm:space-x-4 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                  <div className={`p-1.5 sm:p-2 rounded-lg ${
                    activity.color === 'green' ? 'bg-green-50 dark:bg-green-900/20' :
                    activity.color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20' :
                    activity.color === 'purple' ? 'bg-purple-50 dark:bg-purple-900/20' :
                    activity.color === 'orange' ? 'bg-orange-50 dark:bg-orange-900/20' :
                    'bg-red-50 dark:bg-red-900/20'
                  }`}>
                    <activity.icon className={`h-3 w-3 sm:h-4 sm:w-4 ${
                      activity.color === 'green' ? 'text-green-600 dark:text-green-400' :
                      activity.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                      activity.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                      activity.color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
                      'text-red-600 dark:text-red-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {activity.desc}
                    </p>
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4 sm:space-y-6">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 sm:p-6 shadow-sm">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">Estatísticas Rápidas</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Taxa de Conversão</span>
                <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100">3,2%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '32%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Taxa de Rejeição</span>
                <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100">45%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Visualizações</span>
                <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100">8,7k</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 sm:p-6 shadow-sm">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">Produtos em Destaque</h3>
            <div className="space-y-2 sm:space-y-3">
              {['iPhone 15 Pro', 'MacBook Air M2', 'AirPods Pro', 'iPad Air'].map((product, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{product}</span>
                  <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100">
                    R$ {Math.floor(Math.random() * 2000 + 1000)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Example;