import { GET } from '@/app/api/dashboard/restaurants/route'
import { fetchAllRestaurants } from '@/utils/supabase/restaurant'

// Mock the restaurant utility
jest.mock('@/utils/supabase/restaurant', () => ({
  fetchAllRestaurants: jest.fn(),
}))

describe('GET /api/dashboard/restaurants', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Happy Path', () => {
    it('should return restaurants when fetch is successful', async () => {
      // Arrange
      const mockRestaurants = [
        {
          id: 1,
          name: 'Test Restaurant',
          category: 'Italian',
          emoji: '🍝',
          description: 'A test restaurant',
          rating: 4.5,
          reviews: 100,
          address: '123 Test St',
        },
        {
          id: 2,
          name: 'Another Restaurant',
          category: 'Japanese',
          emoji: '🍣',
          description: 'Another test restaurant',
          rating: 4.8,
          reviews: 150,
          address: '456 Test Ave',
        },
      ]

      ;(fetchAllRestaurants as jest.Mock).mockResolvedValue(mockRestaurants)

      // Act
      const response = await GET()
      const data = await response.json()

      // Assert
      expect(fetchAllRestaurants).toHaveBeenCalledTimes(1)
      expect(response.status).toBe(200)
      expect(data).toEqual(mockRestaurants)
      expect(data).toHaveLength(2)
    })

    it('should return an empty array when no restaurants exist', async () => {
      // Arrange
      ;(fetchAllRestaurants as jest.Mock).mockResolvedValue([])

      // Act
      const response = await GET()
      const data = await response.json()

      // Assert
      expect(response.status).toBe(200)
      expect(data).toEqual([])
      expect(data).toHaveLength(0)
    })

    it('should handle restaurants with various data types correctly', async () => {
      // Arrange
      const mockRestaurants = [
        {
          id: 999,
          name: 'Edge Case Restaurant',
          category: 'Mixed',
          emoji: '🎯',
          description: '',
          rating: 0,
          reviews: 0,
          address: '',
        },
      ]

      ;(fetchAllRestaurants as jest.Mock).mockResolvedValue(mockRestaurants)

      // Act
      const response = await GET()
      const data = await response.json()

      // Assert
      expect(response.status).toBe(200)
      expect(data[0].rating).toBe(0)
      expect(data[0].reviews).toBe(0)
      expect(data[0].description).toBe('')
    })
  })

  describe('Error Handling', () => {
    it('should return 500 status with error message when fetch fails', async () => {
      // Arrange
      const errorMessage = 'Database connection failed'
      ;(fetchAllRestaurants as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      )

      // Act
      const response = await GET()
      const data = await response.json()

      // Assert
      expect(response.status).toBe(500)
      expect(data).toEqual({ error: 'Failed to fetch restaurants' })
      expect(fetchAllRestaurants).toHaveBeenCalledTimes(1)
    })

    it('should handle network timeout errors', async () => {
      // Arrange
      ;(fetchAllRestaurants as jest.Mock).mockRejectedValue(
        new Error('Request timeout')
      )

      // Act
      const response = await GET()
      const data = await response.json()

      // Assert
      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to fetch restaurants')
    })

    it('should handle null/undefined errors gracefully', async () => {
      // Arrange
      ;(fetchAllRestaurants as jest.Mock).mockRejectedValue(null)

      // Act
      const response = await GET()
      const data = await response.json()

      // Assert
      expect(response.status).toBe(500)
      expect(data).toHaveProperty('error')
    })

    it('should handle Supabase specific errors', async () => {
      // Arrange
      const supabaseError = {
        message: 'relation "restaurants" does not exist',
        code: '42P01',
        details: null,
        hint: null,
      }
      ;(fetchAllRestaurants as jest.Mock).mockRejectedValue(supabaseError)

      // Act
      const response = await GET()
      const data = await response.json()

      // Assert
      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to fetch restaurants')
    })
  })

  describe('Edge Cases', () => {
    it('should handle very large datasets', async () => {
      // Arrange
      const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        name: `Restaurant ${i + 1}`,
        category: 'Test',
        emoji: '🍴',
        description: 'Test description',
        rating: 4.5,
        reviews: 100,
        address: 'Test address',
      }))

      ;(fetchAllRestaurants as jest.Mock).mockResolvedValue(largeDataset)

      // Act
      const response = await GET()
      const data = await response.json()

      // Assert
      expect(response.status).toBe(200)
      expect(data).toHaveLength(1000)
    })

    it('should handle special characters in restaurant data', async () => {
      // Arrange
      const mockRestaurants = [
        {
          id: 1,
          name: "L'Éclair & Co. <script>alert('xss')</script>",
          category: 'Français',
          emoji: '🥐',
          description: 'Café with "special" quotes & symbols: ñ, ü, €',
          rating: 4.5,
          reviews: 100,
          address: '123 Rue de l\'Été',
        },
      ]

      ;(fetchAllRestaurants as jest.Mock).mockResolvedValue(mockRestaurants)

      // Act
      const response = await GET()
      const data = await response.json()

      // Assert
      expect(response.status).toBe(200)
      expect(data[0].name).toContain("L'Éclair")
      expect(data[0].description).toContain('ñ')
    })

    it('should handle concurrent requests independently', async () => {
      // Arrange
      const mockData1 = [{ id: 1, name: 'Restaurant 1' }]
      const mockData2 = [{ id: 2, name: 'Restaurant 2' }]

      let callCount = 0
      ;(fetchAllRestaurants as jest.Mock).mockImplementation(() => {
        callCount++
        return Promise.resolve(callCount === 1 ? mockData1 : mockData2)
      })

      // Act
      const [response1, response2] = await Promise.all([GET(), GET()])
      const [data1, data2] = await Promise.all([
        response1.json(),
        response2.json(),
      ])

      // Assert
      expect(fetchAllRestaurants).toHaveBeenCalledTimes(2)
      expect(response1.status).toBe(200)
      expect(response2.status).toBe(200)
    })
  })

  describe('Response Format Validation', () => {
    it('should return valid JSON response', async () => {
      // Arrange
      const mockRestaurants = [{ id: 1, name: 'Test' }]
      ;(fetchAllRestaurants as jest.Mock).mockResolvedValue(mockRestaurants)

      // Act
      const response = await GET()
      const data = await response.json()

      // Assert
      expect(typeof data).toBe('object')
      expect(Array.isArray(data)).toBe(true)
    })

    it('should include proper content-type headers', async () => {
      // Arrange
      ;(fetchAllRestaurants as jest.Mock).mockResolvedValue([])

      // Act
      const response = await GET()

      // Assert
      expect(response.headers.get('content-type')).toContain('application/json')
    })

    it('should maintain data integrity through JSON serialization', async () => {
      // Arrange
      const mockRestaurants = [
        {
          id: 1,
          name: 'Test',
          rating: 4.5,
          reviews: 100,
          created_at: '2024-01-01T00:00:00Z',
        },
      ]
      ;(fetchAllRestaurants as jest.Mock).mockResolvedValue(mockRestaurants)

      // Act
      const response = await GET()
      const data = await response.json()

      // Assert
      expect(data[0].rating).toBe(4.5)
      expect(typeof data[0].rating).toBe('number')
      expect(data[0].reviews).toBe(100)
    })
  })
})