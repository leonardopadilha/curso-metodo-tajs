import { describe, expect, it, beforeEach, jest } from '@jest/globals'
import Task from '../src/task.js'
import { setTimeout } from 'node:timers/promises';

describe('Task Test Suite', () => {
  let _logMock;
  let _task;

  beforeEach(() => {
    _logMock = jest.spyOn(
      console,
      console.log.name
    ).mockImplementation() // O desejo é não imprimir nada

    _task = new Task()
  })

  it.skip('should only run tasks that are due without fake timers (slow)', async () => {
    // AAA => Arrange, Act, Assert

    //Arrange
    const tasks = [
        {
            name: 'Task-Will-Run-In-5-Secs',
            dueAt: new Date(Date.now() + 5000), // 5 secs
            fn: jest.fn()
        },
        {
            name: 'Task-Will-Run-In-10-Secs',
            dueAt: new Date(Date.now() + 10000), // 10 secs
            fn: jest.fn()
        }
    ]

    // Act
    _task.save(tasks.at(0))
    _task.save(tasks.at(1))

    _task.run(200) // 200 ms

    await setTimeout(11000) // 11_000
    expect(tasks.at(0).fn).toHaveBeenCalled()
    expect(tasks.at(1).fn).toHaveBeenCalled()
}, 
//configurar para o jest aguardar 15 segundos nesse test
15000
)

  it ('should only run tasks that are due with fake timers (fast)', async () => {
      jest.useFakeTimers()

      // AAA => Arrange, Act, Assert

      //Arrange
      const tasks = [
          {
              name: 'Task-Will-Run-In-5-Secs',
              dueAt: new Date(Date.now() + 5000), // 5 secs
              fn: jest.fn()
          },
          {
              name: 'Task-Will-Run-In-10-Secs',
              dueAt: new Date(Date.now() + 10000), // 10 secs
              fn: jest.fn()
          }
      ]

      // Act
      _task.save(tasks.at(0))
      _task.save(tasks.at(1))

      _task.run(200) // 200 ms

      //await setTimeout(11) // 11_000

      jest.advanceTimersByTime(4000)
      
      // ninguém deve ser executado ainda
      expect(tasks.at(0).fn).not.toHaveBeenCalled()
      expect(tasks.at(1).fn).not.toHaveBeenCalled()

      jest.advanceTimersByTime(2000)
      // 4 + 2 = 6 => Só a primeira tarefa deve executar
      expect(tasks.at(0).fn).toHaveBeenCalled()
      expect(tasks.at(1).fn).not.toHaveBeenCalled()

      jest.advanceTimersByTime(4000)
      // 4 + 2 + 4 = 10 => Só a segunda tarefa deve executar
      expect(tasks.at(1).fn).toHaveBeenCalled()

      jest.useRealTimers()

      /*
      Precisou avançar no tempo, useFakeTimers
      */
  })
})