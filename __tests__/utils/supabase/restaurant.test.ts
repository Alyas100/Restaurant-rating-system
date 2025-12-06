import { fetchAllRestaurants } from '@/utils/supabase/restaurant'
import { createClient } from '@/utils/supabase/server'

// Mock the Supabase client
jest.mock('@/utils/supabase/server', () => ({
  createClient: jest.fn(),
}))

describe('fetchAllRestaurants', () => {
  let mockSupabase: any

  beforeEach(() => {
    jest.clearAllMocks()

    // Create mock Supabase client
    mockSupabase = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn(),
    }

    ;(createClient as jest.Mock).mockResolvedValue(mockSupabase)
  })

  describe('Happy Path', () => {
    it('should fetch all restaurants successfully', async () => {
      // Arrange
      const mockRestaurants = [
        {
          id: 1,
          name: 'Pizza Place',
          category: 'Italian',
          emoji: '🍕',
          description: 'Best pizza in town',
          rating: 4.7,
          reviews: 200,
          address: '789 Pizza St',
        },
        {
          id: 2,
          name: 'Sushi Bar',
          category: 'Japanese',
          emoji: '🍣',
          description: 'Fresh sushi daily',
          rating: 4.9,
          reviews: 150,
          address: '456 Sushi Ave',
        },
      ]

      mockSupabase.select.mockResolvedValue({
        data: mockRestaurants,
        error: null,
      })

      // Act
      const result = await fetchAllRestaurants()

      // Assert
      expect(createClient).toHaveBeenCalledTimes(1)
      expect(mockSupabase.from).toHaveBeenCalledWith('restaurants')
      expect(mockSupabase.select).toHaveBeenCalledWith('*')
      expect(result).toEqual(mockRestaurants)
      expect(result).toHaveLength(2)
    })

    it('should return empty array when no restaurants exist', async () => {
      // Arrange
      mockSupabase.select.mockResolvedValue({
        data: [],
        error: null,
      })

      // Act
      const result = await fetchAllRestaurants()

      // Assert
      expect(result).toEqual([])
      expect(result).toHaveLength(0)
    })

    it('should handle single restaurant correctly', async () => {
      // Arrange
      const mockRestaurant = [
        {
          id: 1,
          name: 'Solo Restaurant',
          category: 'Mixed',
          emoji: '🍽️',
          description: 'Only restaurant',
          rating: 5.0,
          reviews: 1,
          address: 'Alone St',
        },
      ]

      mockSupabase.select.mockResolvedValue({
        data: mockRestaurant,
        error: null,
      })

      // Act
      const result = await fetchAllRestaurants()

      // Assert
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Solo Restaurant')
    })

    it('should preserve all restaurant fields', async () => {
      // Arrange
      const mockRestaurants = [
        {
          id: 1,
          name: 'Test Restaurant',
          category: 'Test',
          emoji: '🧪',
          description: 'Test description',
          rating: 4.5,
          reviews: 100,
          address: 'Test address',
          phone: '555-1234',
          website: 'https://test.com',
          hours: '9-5',
          created_at: '2024-01-01',
          updated_at: '2024-01-02',
        },
      ]

      mockSupabase.select.mockResolvedValue({
        data: mockRestaurants,
        error: null,
      })

      // Act
      const result = await fetchAllRestaurants()

      // Assert
      expect(result[0]).toHaveProperty('id')
      expect(result[0]).toHaveProperty('name')
      expect(result[0]).toHaveProperty('rating')
      expect(result[0]).toHaveProperty('phone')
      expect(result[0]).toHaveProperty('website')
    })
  })

  describe('Error Handling', () => {
    it('should throw error when Supabase query fails', async () => {
      // Arrange
      const mockError = {
        message: 'Database error',
        code: 'PGRST116',
        details: 'The result contains 0 rows',
        hint: null,
      }

      mockSupabase.select.mockResolvedValue({
        data: null,
        error: mockError,
      })

      // Act & Assert
      await expect(fetchAllRestaurants()).rejects.toEqual(mockError)
      expect(mockSupabase.from).toHaveBeenCalledWith('restaurants')
      expect(mockSupabase.select).toHaveBeenCalledWith('*')
    })

    it('should throw error when table does not exist', async () => {
      // Arrange
      const mockError = {
        message: 'relation "restaurants" does not exist',
        code: '42P01',
        details: null,
        hint: null,
      }

      mockSupabase.select.mockResolvedValue({
        data: null,
        error: mockError,
      })

      // Act & Assert
      await expect(fetchAllRestaurants()).rejects.toEqual(mockError)
    })

    it('should throw error on network failure', async () => {
      // Arrange
      const mockError = {
        message: 'Failed to fetch',
        code: 'NETWORK_ERROR',
        details: null,
        hint: null,
      }

      mockSupabase.select.mockResolvedValue({
        data: null,
        error: mockError,
      })

      // Act & Assert
      await expect(fetchAllRestaurants()).rejects.toEqual(mockError)
    })

    it('should throw error on authentication failure', async () => {
      // Arrange
      const mockError = {
        message: 'JWT expired',
        code: 'PGRST301',
        details: null,
        hint: null,
      }

      mockSupabase.select.mockResolvedValue({
        data: null,
        error: mockError,
      })

      // Act & Assert
      await expect(fetchAllRestaurants()).rejects.toEqual(mockError)
    })

    it('should throw error on permission denied', async () => {
      // Arrange
      const mockError = {
        message: 'permission denied for table restaurants',
        code: '42501',
        details: null,
        hint: null,
      }

      mockSupabase.select.mockResolvedValue({
        data: null,
        error: mockError,
      })

      // Act & Assert
      await expect(fetchAllRestaurants()).rejects.toEqual(mockError)
    })
  })

  describe('Edge Cases', () => {
    it('should handle null data gracefully', async () => {
      // Arrange
      mockSupabase.select.mockResolvedValue({
        data: null,
        error: null,
      })

      // Act
      const result = await fetchAllRestaurants()

      // Assert
      expect(result).toBeNull()
    })

    it('should handle very large datasets', async () => {
      // Arrange
      const largeDataset = Array.from({ length: 10000 }, (_, i) => ({
        id: i + 1,
        name: `Restaurant ${i + 1}`,
        category: 'Test',
        emoji: '🍴',
        description: 'Test',
        rating: 4.5,
        reviews: 100,
        address: 'Test',
      }))

      mockSupabase.select.mockResolvedValue({
        data: largeDataset,
        error: null,
      })

      // Act
      const result = await fetchAllRestaurants()

      // Assert
      expect(result).toHaveLength(10000)
      expect(result[0].id).toBe(1)
      expect(result[9999].id).toBe(10000)
    })

    it('should handle restaurants with missing optional fields', async () => {
      // Arrange
      const mockRestaurants = [
        {
          id: 1,
          name: 'Minimal Restaurant',
          // Missing optional fields
        },
      ]

      mockSupabase.select.mockResolvedValue({
        data: mockRestaurants,
        error: null,
      })

      // Act
      const result = await fetchAllRestaurants()

      // Assert
      expect(result[0].id).toBe(1)
      expect(result[0].name).toBe('Minimal Restaurant')
    })

    it('should handle restaurants with special characters', async () => {
      // Arrange
      const mockRestaurants = [
        {
          id: 1,
          name: "L'Été & Co. <test>",
          category: 'Français',
          emoji: '🥐',
          description: 'Spécial çharactèrs: ñ, ü, €, 中文',
          rating: 4.5,
          reviews: 100,
          address: "123 Rue de l'Été",
        },
      ]

      mockSupabase.select.mockResolvedValue({
        data: mockRestaurants,
        error: null,
      })

      // Act
      const result = await fetchAllRestaurants()

      // Assert
      expect(result[0].name).toContain("L'Été")
      expect(result[0].description).toContain('中文')
    })

    it('should handle restaurants with extreme rating values', async () => {
      // Arrange
      const mockRestaurants = [
        { id: 1, name: 'Perfect', rating: 5.0, reviews: 1 },
        { id: 2, name: 'Zero', rating: 0, reviews: 0 },
        { id: 3, name: 'Decimal', rating: 3.14159, reviews: 314 },
      ]

      mockSupabase.select.mockResolvedValue({
        data: mockRestaurants,
        error: null,
      })

      // Act
      const result = await fetchAllRestaurants()

      // Assert
      expect(result[0].rating).toBe(5.0)
      expect(result[1].rating).toBe(0)
      expect(result[2].rating).toBeCloseTo(3.14159)
    })
  })

  describe('Integration with Supabase Client', () => {
    it('should call createClient exactly once', async () => {
      // Arrange
      mockSupabase.select.mockResolvedValue({
        data: [],
        error: null,
      })

      // Act
      await fetchAllRestaurants()

      // Assert
      expect(createClient).toHaveBeenCalledTimes(1)
      expect(createClient).toHaveBeenCalledWith()
    })

    it('should use correct table name', async () => {
      // Arrange
      mockSupabase.select.mockResolvedValue({
        data: [],
        error: null,
      })

      // Act
      await fetchAllRestaurants()

      // Assert
      expect(mockSupabase.from).toHaveBeenCalledWith('restaurants')
    })

    it('should select all columns', async () => {
      // Arrange
      mockSupabase.select.mockResolvedValue({
        data: [],
        error: null,
      })

      // Act
      await fetchAllRestaurants()

      // Assert
      expect(mockSupabase.select).toHaveBeenCalledWith('*')
    })

    it('should handle client creation failure', async () => {
      // Arrange
      ;(createClient as jest.Mock).mockRejectedValue(
        new Error('Failed to create client')
      )

      // Act & Assert
      await expect(fetchAllRestaurants()).rejects.toThrow(
        'Failed to create client'
      )
    })
  })

  describe('Performance and Optimization', () => {
    it('should complete within reasonable time', async () => {
      // Arrange
      const mockRestaurants = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `Restaurant ${i + 1}`,
      }))

      mockSupabase.select.mockResolvedValue({
        data: mockRestaurants,
        error: null,
      })

      // Act
      const startTime = Date.now()
      await fetchAllRestaurants()
      const endTime = Date.now()

      // Assert
      expect(endTime - startTime).toBeLessThan(1000) // Should complete in less than 1 second
    })

    it('should not cache results between calls', async () => {
      // Arrange
      const firstCall = [{ id: 1, name: 'First' }]
      const secondCall = [{ id: 2, name: 'Second' }]

      mockSupabase.select
        .mockResolvedValueOnce({ data: firstCall, error: null })
        .mockResolvedValueOnce({ data: secondCall, error: null })

      // Act
      const result1 = await fetchAllRestaurants()
      const result2 = await fetchAllRestaurants()

      // Assert
      expect(result1).not.toEqual(result2)
      expect(result1[0].id).toBe(1)
      expect(result2[0].id).toBe(2)
    })
  })
})