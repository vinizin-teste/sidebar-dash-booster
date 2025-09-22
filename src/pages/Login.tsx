import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { SignInPage, Testimonial } from "@/components/ui/sign-in";
import { useToast } from '@/hooks/use-toast';
import amazonShopping from '@/assets/amazon-shopping.jpg';

const sampleTestimonials: Testimonial[] = [
  {
    avatarSrc: "https://randomuser.me/api/portraits/women/57.jpg",
    name: "Sarah Chen",
    handle: "@sarahdigital",
    text: "Plataforma incrível! A experiência do usuário é perfeita e os recursos são exatamente o que eu precisava."
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/64.jpg",
    name: "Marcus Johnson",
    handle: "@marcustech",
    text: "Este serviço transformou como eu trabalho. Design limpo, recursos poderosos e excelente suporte."
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "David Martinez",
    handle: "@davidcreates",
    text: "Já testei muitas plataformas, mas esta se destaca. Intuitiva, confiável e genuinamente útil para produtividade."
  },
];

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const { signIn, signUp, user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user && profile) {
      if (profile.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, profile, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await signIn(email, password);
      // Navigation will be handled by useEffect in useAuth
    } catch (error) {
      // Error handling is done in useAuth hook
    }
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;

    try {
      await signUp(email, password, fullName);
      setIsRegistering(false);
      toast({
        title: "Sucesso",
        description: "Conta criada! Faça login para continuar."
      });
    } catch (error) {
      // Error handling is done in useAuth hook
    }
  };

  const handleResetPassword = () => {
    toast({
      title: "Em breve",
      description: "Funcionalidade de redefinir senha em desenvolvimento"
    });
  };

  const handleCreateAccount = () => {
    setIsRegistering(true);
  };


  return (
    <div className="bg-background text-foreground">
      <SignInPage
        title={isRegistering ? "Criar Conta" : "Bem-vindo"}
        description={isRegistering ? "Crie sua conta e junte-se a nós" : "Acesse sua conta e continue sua jornada conosco"}
        heroImageSrc={amazonShopping}
        testimonials={sampleTestimonials}
        onSignIn={isRegistering ? handleSignUp : handleSignIn}
        onResetPassword={handleResetPassword}
        onCreateAccount={handleCreateAccount}
        isRegistering={isRegistering}
        onBackToLogin={() => setIsRegistering(false)}
      />
    </div>
  );
};

export default Login;