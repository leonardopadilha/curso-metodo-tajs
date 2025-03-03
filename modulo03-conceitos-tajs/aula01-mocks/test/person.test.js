import { describe, it, expect, jest } from '@jest/globals'
import Person from '../src/person'

describe('#Person Suite', () => {
  describe('#validate', () => {
    it('should throw if name is not presente', () => {
      // Mock é a entrada necessária para que o teste funcione
      const mockInvalidPerson = {
        name: '',
        cpf: '123.456.789-00'
      }
      expect(() => Person.validate(mockInvalidPerson)).toThrow(new Error('name is required'))
    })

    it('should throw if cpf is not presente', () => {
      // Mock é a entrada necessária para que o teste funcione
      const mockInvalidPerson = {
        name: 'Zezin da Silva',
        cpf: ''
      }
      expect(() => Person.validate(mockInvalidPerson)).toThrow(new Error('cpf is required'))
    })

    it('should not throw if person is valid', () => {
      // Mock é a entrada necessária para que o teste funcione
      const mockInvalidPerson = {
        name: 'Zezin da Silva',
        cpf: '123.456.789-00'
      }
      expect(() => Person.validate(mockInvalidPerson)).not.toThrow()
    })
  })

  describe('#format', () => {
    // parte do princípio que os dados já foram validados
    it('should format name and CPF', () => {
      // AAA
      
      // Arrange = Prepara
      const mockPerson = {
        name: 'Zezin da Silva',
        cpf: '123.456.789-00'
      }
      // Act = Executar
      const formattedPerson = Person.format(mockPerson)

      // Assert = Validar
      const expected = {
        name: 'Zezin',
        cpf: '12345678900',
        lastName: 'da Silva'
      }

      expect(formattedPerson).toStrictEqual(expected)
    })
  })

  describe('#process', () => {
    it('should process a valid person', () => {
      // Uma outra ideia é não retestar o que já foi testado
      // Testou do caminho A ao caminho B,
      // agora testa do caminho B ao caminho C
      // Então aqui, eu pulo o caminho A (validate), caminho B (format)
      // e vou direto ao caminho C (save) pois esses caminhos já foram validados anteriormente

      // Este método abaixo faz mais sentido para quando se tem interações externas como:
      //    chamadas de API, banco de dados, etc (que será mostrado na próxima aula)

      // Mocks são simulações de funções que você pode fazer ao testar o comportamento!!

      // Arrante, Act, Assert
      const mockPerson = {
        name: 'Zezin da Silva',
        cpf: '123.456.789-00'
      }

      jest.spyOn(
        Person,
        Person.validate.name // Obter o objeto e mudar o comportamento dele
      ).mockReturnValue()
      // .mockImplementation(() => { throw new Error('Deu ruim') })

      jest.spyOn(
        Person,
        Person.format.name
      ).mockReturnValue({
        name: 'Zezin',
        cpf: '12345678900',
        lastName: 'da Silva'
      })

      const result = Person.process(mockPerson)

      const expected = 'ok'
      expect(result).toStrictEqual(expected)

    })
  })
})