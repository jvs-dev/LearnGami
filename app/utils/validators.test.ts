import { isValidEmail, isStrongPassword } from './validators';

describe('Utilitários de Validação', () => {
  
  describe('isValidEmail', () => {
    test('deve retornar true para um email válido', () => {
      expect(isValidEmail('teste@exemplo.com')).toBe(true);
      expect(isValidEmail('usuario.nome@dominio.com.br')).toBe(true);
    });

    test('deve retornar false para um email inválido', () => {
      expect(isValidEmail('emailsemarroba.com')).toBe(false);
      expect(isValidEmail('teste@')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });
  
  describe('isStrongPassword', () => {
    test('deve aceitar senhas com 6 ou mais caracteres', () => {
      expect(isStrongPassword('123456')).toBe(true);
      expect(isStrongPassword('minhaSenhaForte')).toBe(true);
    });

    test('deve rejeitar senhas com menos de 6 caracteres', () => {
      expect(isStrongPassword('12345')).toBe(false);
      expect(isStrongPassword('abc')).toBe(false);
      expect(isStrongPassword('')).toBe(false);
    });
  });

});