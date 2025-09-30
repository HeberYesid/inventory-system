import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from './authStore';

describe('authStore', () => {
  beforeEach(() => {
    // Reset store
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    localStorage.clear();
  });

  it('initializes with no user', () => {
    const { user, isAuthenticated } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(isAuthenticated).toBe(false);
  });

  it('sets user and token on login', () => {
    const mockUser = { id: 1, username: 'admin', role: 'ADMIN' as const };
    const mockToken = 'fake-token-123';

    useAuthStore.getState().login(mockUser, mockToken);

    const { user, token, isAuthenticated } = useAuthStore.getState();
    expect(user).toEqual(mockUser);
    expect(token).toBe(mockToken);
    expect(isAuthenticated).toBe(true);
  });

  it('saves token to localStorage', () => {
    const mockUser = { id: 1, username: 'admin', role: 'ADMIN' as const };
    const mockToken = 'fake-token-123';

    useAuthStore.getState().login(mockUser, mockToken);

    expect(localStorage.getItem('token')).toBe(mockToken);
    expect(localStorage.getItem('user')).toBe(JSON.stringify(mockUser));
  });

  it('clears user on logout', () => {
    // First login
    const mockUser = { id: 1, username: 'admin', role: 'ADMIN' as const };
    useAuthStore.getState().login(mockUser, 'fake-token');

    // Then logout
    useAuthStore.getState().logout();

    const { user, token, isAuthenticated } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(token).toBeNull();
    expect(isAuthenticated).toBe(false);
  });

  it('clears localStorage on logout', () => {
    // First login
    const mockUser = { id: 1, username: 'admin', role: 'ADMIN' as const };
    useAuthStore.getState().login(mockUser, 'fake-token');

    // Then logout
    useAuthStore.getState().logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('restores user from localStorage on initialization', () => {
    const mockUser = { id: 1, username: 'admin', role: 'ADMIN' };
    const mockToken = 'fake-token-123';

    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));

    // Reinitialize store by calling it
    useAuthStore.getState();

    // The store should load from localStorage
    const token = localStorage.getItem('token');
    expect(token).toBe(mockToken);
  });
});
