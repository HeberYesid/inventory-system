import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

// Mock router navigation
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
  Toaster: () => null,
}));

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders login form', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Sistema de Inventario/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Usuario/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Contraseña/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeTruthy();
  });

  it('renders credential hints', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Admin:/i)).toBeTruthy();
    expect(screen.getByText(/admin123/i)).toBeTruthy();
    expect(screen.getByText(/Secretaria:/i)).toBeTruthy();
    expect(screen.getByText(/secret123/i)).toBeTruthy();
  });
});
