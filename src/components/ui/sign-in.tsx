import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import amazonLogoWelcome from '@/assets/amazon-logo-welcome.jpg';

// --- TYPE DEFINITIONS ---

export interface Testimonial {
  avatarSrc: string;
  name: string;
  handle: string;
  text: string;
}

interface SignInPageProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  heroImageSrc?: string;
  testimonials?: Testimonial[];
  onSignIn?: (event: React.FormEvent<HTMLFormElement>) => void;
  onResetPassword?: () => void;
  onCreateAccount?: () => void;
  isRegistering?: boolean;
  onBackToLogin?: () => void;
}

// --- SUB-COMPONENTS ---

const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl border border-border bg-foreground/5 backdrop-blur-sm transition-colors focus-within:border-violet-400/70 focus-within:bg-violet-500/10">
    {children}
  </div>
);

const TestimonialCard = ({ testimonial, delay }: { testimonial: Testimonial, delay: string }) => (
  <div className={`animate-testimonial ${delay} flex items-start gap-3 rounded-3xl bg-card/40 dark:bg-zinc-800/40 backdrop-blur-xl border border-white/10 p-5 w-64`}>
    <img src={testimonial.avatarSrc} className="h-10 w-10 object-cover rounded-2xl" alt="avatar" />
    <div className="text-sm leading-snug">
      <p className="flex items-center gap-1 font-medium">{testimonial.name}</p>
      <p className="text-muted-foreground">{testimonial.handle}</p>
      <p className="mt-1 text-foreground/80">{testimonial.text}</p>
    </div>
  </div>
);

// --- MAIN COMPONENT ---

export const SignInPage: React.FC<SignInPageProps> = ({
  title = <span className="font-light text-foreground tracking-tighter">Bem-vindo</span>,
  description = "Acesse sua conta e continue sua jornada conosco",
  heroImageSrc,
  testimonials = [],
  onSignIn,
  onResetPassword,
  onCreateAccount,
  isRegistering = false,
  onBackToLogin,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row font-geist w-[100dvw]">
      {/* Left column: sign-in form */}
      <section className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="animate-element animate-delay-50 flex justify-center mb-2 sm:mb-4">
              <img 
                src={amazonLogoWelcome} 
                alt="Amazon Logo" 
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
              />
            </div>
            <h1 className="animate-element animate-delay-100 text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-center sm:text-left">{title}</h1>
            <p className="animate-element animate-delay-200 text-muted-foreground text-center sm:text-left text-sm sm:text-base">{description}</p>

            <form className="space-y-4 sm:space-y-5" onSubmit={onSignIn}>
              <div className="animate-element animate-delay-300">
                <label className="text-xs sm:text-sm font-medium text-muted-foreground">Endereço de Email</label>
                <GlassInputWrapper>
                  <input name="email" type="email" placeholder="Digite seu endereço de email" className="w-full bg-transparent text-sm p-3 sm:p-4 rounded-2xl focus:outline-none" required />
                </GlassInputWrapper>
              </div>

              {isRegistering && (
                <div className="animate-element animate-delay-350">
                  <label className="text-xs sm:text-sm font-medium text-muted-foreground">Nome Completo</label>
                  <GlassInputWrapper>
                    <input name="fullName" type="text" placeholder="Digite seu nome completo" className="w-full bg-transparent text-sm p-3 sm:p-4 rounded-2xl focus:outline-none" />
                  </GlassInputWrapper>
                </div>
              )}

              <div className="animate-element animate-delay-400">
                <label className="text-xs sm:text-sm font-medium text-muted-foreground">Senha</label>
                <GlassInputWrapper>
                  <div className="relative">
                    <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Digite sua senha" className="w-full bg-transparent text-sm p-3 sm:p-4 pr-12 rounded-2xl focus:outline-none" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center">
                      {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground hover:text-foreground transition-colors" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground hover:text-foreground transition-colors" />}
                    </button>
                  </div>
                </GlassInputWrapper>
              </div>

              {!isRegistering && (
                <div className="animate-element animate-delay-500 flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm gap-3 sm:gap-0">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" name="rememberMe" className="custom-checkbox" />
                    <span className="text-foreground/90">Manter-me conectado</span>
                  </label>
                  <a href="#" onClick={(e) => { e.preventDefault(); onResetPassword?.(); }} className="hover:underline text-violet-400 transition-colors text-center sm:text-right">Redefinir senha</a>
                </div>
              )}

              <button type="submit" className="animate-element animate-delay-600 w-full rounded-2xl bg-primary py-3 sm:py-4 font-medium text-primary-foreground hover:bg-primary/90 transition-colors text-sm sm:text-base">
                {isRegistering ? 'Criar Conta' : 'Entrar'}
              </button>
            </form>


            <p className="animate-element animate-delay-800 text-center text-xs sm:text-sm text-muted-foreground">
              {isRegistering ? (
                <>
                  Já tem uma conta? <a href="#" onClick={(e) => { e.preventDefault(); onBackToLogin?.(); }} className="text-violet-400 hover:underline transition-colors">Fazer Login</a>
                </>
              ) : (
                <>
                  Novo na nossa plataforma? <a href="#" onClick={(e) => { e.preventDefault(); onCreateAccount?.(); }} className="text-violet-400 hover:underline transition-colors">Criar Conta</a>
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Right column: hero image + testimonials */}
      {heroImageSrc && (
        <section className="hidden md:block flex-1 relative p-4">
          <div className="animate-slide-right animate-delay-300 absolute inset-4 rounded-3xl bg-cover bg-center" style={{ backgroundImage: `url(${heroImageSrc})` }}></div>
          {testimonials.length > 0 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 px-8 w-full justify-center">
              <TestimonialCard testimonial={testimonials[0]} delay="animate-delay-1000" />
              {testimonials[1] && <div className="hidden xl:flex"><TestimonialCard testimonial={testimonials[1]} delay="animate-delay-1200" /></div>}
              {testimonials[2] && <div className="hidden 2xl:flex"><TestimonialCard testimonial={testimonials[2]} delay="animate-delay-1400" /></div>}
            </div>
          )}
        </section>
      )}
    </div>
  );
};