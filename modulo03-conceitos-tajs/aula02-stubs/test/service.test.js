import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import Service from '../src/service.js'
import fs from 'node:fs/promises'

describe('Service Test Suite', () => {
  let _service
  const filename = 'testfile.ndjson'
  beforeEach(() => {
    // jest.restoreAllMocks()

    _service = new Service({
      filename
    })
  })

  describe('#read', () => {
    it('should return an empty array if the file is empty', async () => {
      jest.spyOn(
        fs,
        "readFile"
      ).mockResolvedValue('')

      const result = await _service.read()
      expect(result).toEqual([])
    })

    it('should return users without password if file contains users', async () => {
      const dbData = [
        {
          username: 'user1',
          password: 'pass1',
          createdAt: new Date().toISOString()
        },
        {
          username: 'user2',
          password: 'pass2',
          createdAt: new Date().toISOString()
        }
      ]

      const fileContents = dbData.map(item => JSON.stringify(item).concat('\n')).join('')

      jest.spyOn(
        fs,
        "readFile" // Está assim pois ao ler o log, ele não retornou nada
      ).mockResolvedValue(fileContents)

      const result = await _service.read()
      
      const expected = dbData.map(({ password, ...rest}) => ({ ...rest}))
      expect(result).toStrictEqual(expected)
    })
  })
})