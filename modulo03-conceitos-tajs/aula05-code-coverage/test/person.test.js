import { describe, expect, it } from '@jest/globals'
import { mapPerson } from '../src/person.js'

describe('Person Test Suite', () => {
  describe('happy path', () => {
    it('should map person', () => {
      const personStr = '{"name": "leonardo", "age": 25}'
      const personObj = mapPerson(personStr)
      expect(personObj).toEqual({
        name: 'leonardo',
        age: 25,
        createdAt: expect.any(Date) // dessa forma, a data não é validada, apenas o tipo
      })
    })    
  })

  describe('what coverage doesnt tell you', () => {
    it('should not map person given invalid JSON string', () => {
      const personStr = '{"name":'
      expect(() => mapPerson(personStr)).toThrow('Unexpected end of JSON input')
    })
    
    it('should not map person given invalid JSON data', () => {
      const personStr = '{}'
      const personObj = mapPerson(personStr)
      expect(personObj).toEqual({
        name: undefined,
        age: undefined,
        createdAt: expect.any(Date) // dessa forma, a data não é validada, apenas o tipo
      })
    }) 
  })
})