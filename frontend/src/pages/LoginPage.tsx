import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Lock, User, Shield } from 'lucide-react';
import { authAPI } from '@/services/api';
import { useAuthStore } from '@/store/authStore';

interface LoginForm {
  username: string;
  password: string;
  captcha: string;
}

function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);
  
  // Simple CAPTCHA
  const [captchaValue] = useState(() => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    return { num1, num2, answer: num1 + num2 };
  });

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    // Validate CAPTCHA
    if (parseInt(data.captcha) !== captchaValue.answer) {
      toast.error('CAPTCHA incorrecto');
      return;
    }

    setIsLoading(true);
    try {
      const response = await authAPI.login(data.username, data.password);
      login(response.data.user, response.data.access_token);
      toast.success('¡Bienvenido!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center">
              <Shield className="h-10 w-10 text-primary-600" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Sistema de Inventario
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Usuario
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    {...register('username', { required: 'Usuario requerido' })}
                    className="input pl-10"
                    placeholder="Ingresa tu usuario"
                  />
                </div>
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    {...register('password', { required: 'Contraseña requerida', minLength: 6 })}
                    className="input pl-10"
                    placeholder="Ingresa tu contraseña"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* CAPTCHA */}
              <div>
                <label htmlFor="captcha" className="block text-sm font-medium text-gray-700 mb-1">
                  Verificación: ¿Cuánto es {captchaValue.num1} + {captchaValue.num2}?
                </label>
                <input
                  id="captcha"
                  type="number"
                  {...register('captcha', { required: 'CAPTCHA requerido' })}
                  className="input"
                  placeholder="Respuesta"
                />
                {errors.captcha && (
                  <p className="mt-1 text-sm text-red-600">{errors.captcha.message}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 text-center">
            <div className="text-xs text-gray-500 space-y-1">
              <p><strong>Admin:</strong> admin / admin123</p>
              <p><strong>Secretaria:</strong> secretaria / secret123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
