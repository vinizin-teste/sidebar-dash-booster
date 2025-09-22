import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Settings, LogOut } from 'lucide-react';

const Dashboard = () => {
  const { profile, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Dashboard do Usuário</h1>
            <p className="text-muted-foreground mt-2">
              Bem-vindo, {profile?.full_name || profile?.email}!
            </p>
          </div>
          <Button onClick={signOut} variant="outline" className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Perfil
              </CardTitle>
              <CardDescription>
                Gerencie suas informações pessoais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Email:</strong> {profile?.email}</p>
                <p><strong>Nome:</strong> {profile?.full_name || 'Não informado'}</p>
                <p><strong>Função:</strong> {profile?.role}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in animate-delay-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Configurações
              </CardTitle>
              <CardDescription>
                Personalize sua experiência
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Configurações em breve...</p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in animate-delay-400">
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>
                Suas últimas ações no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Nenhuma atividade recente</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;