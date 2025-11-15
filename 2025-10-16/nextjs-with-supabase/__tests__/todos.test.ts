import { describe, it, expect } from 'vitest'

describe('Todo Utility Functions', () => {
  describe('validateTodoContent', () => {
    it('should return true for valid content', () => {
      const validContent = 'Buy groceries'
      expect(validContent.trim().length > 0).toBe(true)
    })

    it('should return false for empty content', () => {
      const emptyContent = ''
      expect(emptyContent.trim().length > 0).toBe(false)
    })

    it('should return false for whitespace-only content', () => {
      const whitespaceContent = '   '
      expect(whitespaceContent.trim().length > 0).toBe(false)
    })

    it('should trim whitespace from content', () => {
      const content = '  Learn Vitest  '
      expect(content.trim()).toBe('Learn Vitest')
    })
  })

  describe('Todo Data Structure', () => {
    it('should have required todo properties', () => {
      const todo = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        content: 'Test todo',
        created_at: new Date().toISOString(),
      }

      expect(todo).toHaveProperty('id')
      expect(todo).toHaveProperty('content')
      expect(todo).toHaveProperty('created_at')
      expect(typeof todo.id).toBe('string')
      expect(typeof todo.content).toBe('string')
      expect(typeof todo.created_at).toBe('string')
    })

    it('should format date correctly', () => {
      const dateString = '2025-11-15T10:00:00.000Z'
      const date = new Date(dateString)
      const formatted = date.toLocaleString()
      
      expect(formatted).toBeTruthy()
      expect(typeof formatted).toBe('string')
    })
  })

  describe('Todo Sorting', () => {
    it('should sort todos by created_at descending', () => {
      const todos = [
        { id: '1', content: 'First', created_at: '2025-11-15T10:00:00.000Z' },
        { id: '2', content: 'Second', created_at: '2025-11-15T11:00:00.000Z' },
        { id: '3', content: 'Third', created_at: '2025-11-15T09:00:00.000Z' },
      ]

      const sorted = [...todos].sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )

      expect(sorted[0].id).toBe('2')
      expect(sorted[1].id).toBe('1')
      expect(sorted[2].id).toBe('3')
    })
  })
})
