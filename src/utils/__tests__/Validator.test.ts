import Validator from '../Validator';

describe('Validator', () => {
  describe('Comprueba si la entrada es una cadena que solo contiene números', () => {
    test('Ante un string de números devuelve true', () => {
      expect(Validator.isNumeric('23')).toBe(true);
    });
    test('Ante un string de caracteres devuelve false', () => {
      expect(Validator.isNumeric('abc')).toBe(false);
    });
    test('Ante un string de números y caracteres devuelve false', () => {
      expect(Validator.isNumeric('2ab45')).toBe(false);
    });
  });

  describe('Comprueba si la entrada es una cadena con caracteres especiales', () => {
    test('Ante un string de números devuelve false', () => {
      expect(Validator.hasSpecialChars('12345')).toBe(false);
    });
    test('Ante un string de números y letras devuelve false', () => {
      expect(Validator.hasSpecialChars('1sa23fas45')).toBe(false);
    });
    test('Ante un string con caracteres especiales devuelve true', () => {
      expect(Validator.hasSpecialChars('!2$s')).toBe(true);
    });
  });

  describe('Comprueba si la entrada es un email', () => {
    test('Ante un email válido devuelve true', () => {
      expect(Validator.isEmail('look4@mail.com')).toBe(true);
    });
    test('Ante un email sin @ devuelve false', () => {
      expect(Validator.isEmail('look4mail.com')).toBe(false);
    });
    test('Ante un email no válido devuelve false', () => {
      expect(Validator.isEmail('look4@mail')).toBe(false);
    });
  });

  describe('Comprueba si la entrada es una fecha en formato dd/mm/yyyy', () => {
    test('Devuelve true si es una fecha válida', () => {
      expect(Validator.isValidDate('31/09/2018')).toBe(true);
    });
    test('Devuelve false si no es una fecha válida', () => {
      expect(Validator.isValidDate('1/9/2018')).toBe(false);
    });
  });
});
