import { describe, it, expect, beforeEach } from 'vitest';
import { api, authAPI, productsAPI, kardexAPI } from './api';

describe('API Service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('API instance', () => {
    it('has correct base URL', () => {
      expect(api.defaults.baseURL).toBeDefined();
      expect(api.defaults.baseURL).toContain('api');
    });

    it('has correct headers', () => {
      expect(api.defaults.headers['Content-Type']).toBe('application/json');
    });
  });

  describe('authAPI', () => {
    it('has login method', () => {
      expect(authAPI.login).toBeDefined();
      expect(typeof authAPI.login).toBe('function');
    });
  });

  describe('productsAPI', () => {
    it('has CRUD methods', () => {
      expect(productsAPI.getAll).toBeDefined();
      expect(productsAPI.getOne).toBeDefined();
      expect(productsAPI.create).toBeDefined();
      expect(productsAPI.update).toBeDefined();
    });
  });

  describe('kardexAPI', () => {
    it('has get method', () => {
      expect(kardexAPI.get).toBeDefined();
      expect(typeof kardexAPI.get).toBe('function');
    });
  });
});
