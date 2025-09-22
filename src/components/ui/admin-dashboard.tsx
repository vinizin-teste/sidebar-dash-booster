"use client"
import React, { useState, useEffect } from "react";
import {
  Home,
  DollarSign,
  Monitor,
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
  Settings,
  Shield,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import amazonLogo from "@/assets/amazon-logo.png";

export const AdminExample = () => {
  const [isDark, setIsDark] = useState(false);
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
        <AdminSidebar signOut={signOut} profile={profile} />
        <AdminContent isDark={isDark} setIsDark={setIsDark} />
      </div>
    </div>
  );
};

const AdminSidebar = ({ signOut, profile }: { signOut: () => void; profile: any }) => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Painel Admin");

  return (
    <nav
      className={`sticky top-0 h-screen shrink-0 border-r transition-all duration-300 ease-in-out ${
        open ? 'w-64' : 'w-16'
      } border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 shadow-sm`}
    >
      <AdminTitleSection open={open} profile={profile} />

      <div className="space-y-1 mb-8">
        <AdminOption
          Icon={Shield}
          title="Painel Admin"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <AdminOption
          Icon={Users}
          title="Usuários"
          selected={selected}
          setSelected={setSelected}
          open={open}
          notifs={12}
        />
        <AdminOption
          Icon={DollarSign}
          title="Vendas"
          selected={selected}
          setSelected={setSelected}
          open={open}
          notifs={3}
        />
        <AdminOption
          Icon={Package}
          title="Produtos"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <AdminOption
          Icon={Settings}
          title="Configurações"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <AdminOption
          Icon={Activity}
          title="Analytics"
          selected={selected}
          setSelected={setSelected}
          open={open}
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

      <AdminToggleClose open={open} setOpen={setOpen} />
    </nav>
  );
};

const AdminOption = ({ Icon, title, selected, setSelected, open, notifs }: {
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
          ? "bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-300 shadow-sm border-l-2 border-red-500" 
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
        <span className="absolute right-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 dark:bg-red-600 text-xs text-white font-medium">
          {notifs}
        </span>
      )}
    </button>
  );
};

const AdminTitleSection = ({ open, profile }: { open: boolean; profile: any }) => {
  return (
    <div className="mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
      <div className="flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
        <div className="flex items-center gap-3">
          <AdminLogo />
          {open && (
            <div className={`transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center gap-2">
                <div>
                  <span className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {profile?.full_name || profile?.email || 'Admin'}
                  </span>
                  <span className="block text-xs text-red-500 dark:text-red-400 capitalize font-medium">
                    Administrador
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

const AdminLogo = () => {
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

const AdminToggleClose = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
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

const AdminContent = ({ isDark, setIsDark }: { isDark: boolean; setIsDark: (isDark: boolean) => void }) => {
  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950 p-6 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Painel Administrativo</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Gerencie usuários, vendas e sistema</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </button>
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            {isDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      
      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <Users className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">Total de Usuários</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">2.847</p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">+15% este mês</p>
        </div>
        
        <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <DollarSign className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">Receita Total</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">R$ 847.250</p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">+28% do mês passado</p>
        </div>
        
        <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <ShoppingCart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">Pedidos Ativos</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">1.247</p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">+12% da semana passada</p>
        </div>

        <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">Produtos</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">456</p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">+23 novos esta semana</p>
        </div>
      </div>
      
      {/* Admin Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Management */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Gerenciamento de Usuários</h3>
              <button className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium">
                Ver todos
              </button>
            </div>
            <div className="space-y-4">
              {[
                { name: "João Silva", email: "joao@exemplo.com", role: "admin", status: "Ativo", color: "green" },
                { name: "Maria Santos", email: "maria@exemplo.com", role: "user", status: "Ativo", color: "green" },
                { name: "Pedro Costa", email: "pedro@exemplo.com", role: "user", status: "Pendente", color: "yellow" },
                { name: "Ana Oliveira", email: "ana@exemplo.com", role: "user", status: "Bloqueado", color: "red" },
              ].map((user, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-2 h-2 rounded-full ${
                      user.color === 'green' ? 'bg-green-500' :
                      user.color === 'yellow' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-900 dark:text-gray-100 capitalize">{user.role}</p>
                    <p className={`text-xs ${
                      user.color === 'green' ? 'text-green-600 dark:text-green-400' :
                      user.color === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-red-600 dark:text-red-400'
                    }`}>{user.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Status do Sistema</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Servidor</span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">Online</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Banco de Dados</span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">Online</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">CDN</span>
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Lento</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Ações Rápidas</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 transition-colors">
                Fazer Backup do Sistema
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 transition-colors">
                Limpar Cache
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 transition-colors">
                Exportar Relatórios
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-sm text-red-600 dark:text-red-400 transition-colors">
                Modo Manutenção
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminExample;