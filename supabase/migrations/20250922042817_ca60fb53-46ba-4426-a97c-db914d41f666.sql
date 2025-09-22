-- Alterar o primeiro usuário para admin
UPDATE public.profiles 
SET role = 'admin', updated_at = now()
WHERE email = 'suporte.rd.emp@gmail.com';