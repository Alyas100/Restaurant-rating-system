import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import RestaurantsList from '@/app/restaurants/RestaurantsList'
import { useRouter } from 'next/navigation'

// Mock fetch
global.fetch = jest.fn()

jest.mock('next/navigation')

describe('RestaurantsList Component', () => {
  let mockRouter: any

  const mockRestaurants = [
    {
      id: 1,
      name: 'Spice Haven',
      category: 'Indian',
      emoji: '🍛',
      description: 'Authentic Indian cuisine',
      rating: 4.5,
      reviews: 120,
      address: '123 Main St',
    },
    {
      id: 2,
      name: 'Sushi Bar',
      category: 'Japanese',
      emoji: '🍣',
      description: 'Fresh sushi daily',
      rating: 4.8,
      reviews: 98,
      address: '456 Oak Ave',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    mockRouter = {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(global.fetch as jest.Mock).mockResolvedValue({
      json: async () => mockRestaurants,
    })
  })

  describe('Initial Rendering', () => {
    it('should display loading state initially', () => {
      render(<RestaurantsList />)

      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('should fetch restaurants on mount', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/dashboard/restaurants')
      })
    })

    it('should render restaurant cards after loading', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText('Spice Haven')).toBeInTheDocument()
        expect(screen.getByText('Sushi Bar')).toBeInTheDocument()
      })
    })

    it('should render page title', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText('All Restaurants')).toBeInTheDocument()
      })
    })

    it('should render search input', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        const searchInput = screen.getByPlaceholderText(/search restaurants/i)
        expect(searchInput).toBeInTheDocument()
      })
    })
  })

  describe('Search Functionality', () => {
    it('should filter restaurants by name', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText('Spice Haven')).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText(/search restaurants/i)
      fireEvent.change(searchInput, { target: { value: 'Spice' } })

      expect(screen.getByText('Spice Haven')).toBeInTheDocument()
      expect(screen.queryByText('Sushi Bar')).not.toBeInTheDocument()
    })

    it('should filter restaurants by description', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText('Spice Haven')).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText(/search restaurants/i)
      fireEvent.change(searchInput, { target: { value: 'sushi' } })

      expect(screen.queryByText('Spice Haven')).not.toBeInTheDocument()
      expect(screen.getByText('Sushi Bar')).toBeInTheDocument()
    })

    it('should be case-insensitive', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText('Spice Haven')).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText(/search restaurants/i)
      fireEvent.change(searchInput, { target: { value: 'SPICE' } })

      expect(screen.getByText('Spice Haven')).toBeInTheDocument()
    })

    it('should show no results message when no matches', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText('Spice Haven')).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText(/search restaurants/i)
      fireEvent.change(searchInput, { target: { value: 'nonexistent' } })

      expect(screen.getByText('No restaurants found')).toBeInTheDocument()
    })

    it('should clear search and show all restaurants', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText('Spice Haven')).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText(/search restaurants/i)
      fireEvent.change(searchInput, { target: { value: 'Spice' } })
      
      expect(screen.queryByText('Sushi Bar')).not.toBeInTheDocument()

      fireEvent.change(searchInput, { target: { value: '' } })

      expect(screen.getByText('Spice Haven')).toBeInTheDocument()
      expect(screen.getByText('Sushi Bar')).toBeInTheDocument()
    })

    it('should handle partial matches', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText('Spice Haven')).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText(/search restaurants/i)
      fireEvent.change(searchInput, { target: { value: 'Sp' } })

      expect(screen.getByText('Spice Haven')).toBeInTheDocument()
    })
  })

  describe('Category Filtering', () => {
    it('should render category filter buttons', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText('All')).toBeInTheDocument()
        expect(screen.getByText('Indian')).toBeInTheDocument()
        expect(screen.getByText('Japanese')).toBeInTheDocument()
      })
    })

    it('should filter by category when clicked', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText('Spice Haven')).toBeInTheDocument()
      })

      const indianButton = screen.getByText('Indian')
      fireEvent.click(indianButton)

      expect(screen.getByText('Spice Haven')).toBeInTheDocument()
      expect(screen.queryByText('Sushi Bar')).not.toBeInTheDocument()
    })

    it('should show all restaurants when "All" is selected', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText('Spice Haven')).toBeInTheDocument()
      })

      const indianButton = screen.getByText('Indian')
      fireEvent.click(indianButton)

      const allButton = screen.getByText('All')
      fireEvent.click(allButton)

      expect(screen.getByText('Spice Haven')).toBeInTheDocument()
      expect(screen.getByText('Sushi Bar')).toBeInTheDocument()
    })

    it('should highlight active category', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText('All')).toBeInTheDocument()
      })

      const allButton = screen.getByText('All')
      expect(allButton).toHaveClass('bg-indigo-600')

      const indianButton = screen.getByText('Indian')
      fireEvent.click(indianButton)

      expect(indianButton).toHaveClass('bg-indigo-600')
    })

    it('should work with search filter simultaneously', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText('Spice Haven')).toBeInTheDocument()
      })

      const indianButton = screen.getByText('Indian')
      fireEvent.click(indianButton)

      const searchInput = screen.getByPlaceholderText(/search restaurants/i)
      fireEvent.change(searchInput, { target: { value: 'Spice' } })

      expect(screen.getByText('Spice Haven')).toBeInTheDocument()
      expect(screen.queryByText('Sushi Bar')).not.toBeInTheDocument()
    })
  })

  describe('Sorting Functionality', () => {
    it('should render sort dropdown', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        const sortSelect = screen.getByRole('combobox')
        expect(sortSelect).toBeInTheDocument()
      })
    })

    it('should sort by highest rating', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText('Sushi Bar')).toBeInTheDocument()
      })

      const sortSelect = screen.getByRole('combobox')
      fireEvent.change(sortSelect, { target: { value: 'rating' } })

      // Sushi Bar (4.8) should appear before Spice Haven (4.5)
      const restaurants = screen.getAllByText(/4\.[58]/)
      expect(restaurants[0].textContent).toContain('4.8')
    })

    it('should sort by most reviews', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText('Spice Haven')).toBeInTheDocument()
      })

      const sortSelect = screen.getByRole('combobox')
      fireEvent.change(sortSelect, { target: { value: 'reviews' } })

      // Spice Haven (120) should appear before Sushi Bar (98)
      const restaurants = screen.getAllByText(/\(\d+ reviews\)/)
      expect(restaurants[0].textContent).toContain('120')
    })

    it('should sort by name alphabetically', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText('Spice Haven')).toBeInTheDocument()
      })

      const sortSelect = screen.getByRole('combobox')
      fireEvent.change(sortSelect, { target: { value: 'name' } })

      const restaurantNames = screen.getAllByRole('heading', { level: 3 })
      expect(restaurantNames[0].textContent).toBe('Spice Haven')
    })
  })

  describe('Restaurant Card Display', () => {
    it('should display restaurant emoji', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText('🍛')).toBeInTheDocument()
        expect(screen.getByText('🍣')).toBeInTheDocument()
      })
    })

    it('should display restaurant rating', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText('4.5')).toBeInTheDocument()
        expect(screen.getByText('4.8')).toBeInTheDocument()
      })
    })

    it('should display review count', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText('(120 reviews)')).toBeInTheDocument()
        expect(screen.getByText('(98 reviews)')).toBeInTheDocument()
      })
    })

    it('should display restaurant address', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText(/123 Main St/)).toBeInTheDocument()
        expect(screen.getByText(/456 Oak Ave/)).toBeInTheDocument()
      })
    })

    it('should display category badge', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        const categories = screen.getAllByText('Indian')
        expect(categories.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Navigation to Details', () => {
    it('should link to restaurant detail page', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        const links = screen.getAllByRole('link')
        const restaurantLink = links.find(link => 
          link.getAttribute('href')?.includes('/restaurants/1')
        )
        expect(restaurantLink).toBeTruthy()
      })
    })

    it('should have view details text', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        const viewDetails = screen.getAllByText(/view details/i)
        expect(viewDetails.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Results Count Display', () => {
    it('should display correct count of filtered restaurants', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText(/Showing 2 of/)).toBeInTheDocument()
      })
    })

    it('should update count when searching', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText('Spice Haven')).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText(/search restaurants/i)
      fireEvent.change(searchInput, { target: { value: 'Spice' } })

      expect(screen.getByText(/Showing 1 of/)).toBeInTheDocument()
    })

    it('should update count when filtering by category', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText('Spice Haven')).toBeInTheDocument()
      })

      const indianButton = screen.getByText('Indian')
      fireEvent.click(indianButton)

      expect(screen.getByText(/Showing 1 of/)).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('should handle fetch errors gracefully', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'))

      const consoleError = jest.spyOn(console, 'error').mockImplementation()
      
      render(<RestaurantsList />)

      await waitFor(() => {
        expect(consoleError).toHaveBeenCalled()
      })

      consoleError.mockRestore()
    })

    it('should handle empty response', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValue({
        json: async () => [],
      })

      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText(/Showing 0 of/)).toBeInTheDocument()
      })
    })

    it('should handle malformed data', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValue({
        json: async () => [{ id: 1 }], // Missing required fields
      })

      render(<RestaurantsList />)

      await waitFor(() => {
        // Should not crash
        expect(screen.getByText('All Restaurants')).toBeInTheDocument()
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle restaurants with no reviews', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValue({
        json: async () => [
          {
            id: 1,
            name: 'New Restaurant',
            category: 'New',
            emoji: '🆕',
            description: 'Brand new',
            rating: 0,
            reviews: 0,
            address: 'New St',
          },
        ],
      })

      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText('(0 reviews)')).toBeInTheDocument()
      })
    })

    it('should handle very long restaurant names', async () => {
      const longName = 'A'.repeat(100)
      ;(global.fetch as jest.Mock).mockResolvedValue({
        json: async () => [
          {
            id: 1,
            name: longName,
            category: 'Test',
            emoji: '🧪',
            description: 'Test',
            rating: 5,
            reviews: 1,
            address: 'Test',
          },
        ],
      })

      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText(longName)).toBeInTheDocument()
      })
    })

    it('should handle special characters in search', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText('Spice Haven')).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText(/search restaurants/i)
      fireEvent.change(searchInput, { target: { value: '@#$%' } })

      expect(screen.getByText('No restaurants found')).toBeInTheDocument()
    })

    it('should handle rapid filter changes', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText('Spice Haven')).toBeInTheDocument()
      })

      const indianButton = screen.getByText('Indian')
      const japaneseButton = screen.getByText('Japanese')

      fireEvent.click(indianButton)
      fireEvent.click(japaneseButton)
      fireEvent.click(indianButton)

      expect(screen.getByText('Spice Haven')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have accessible search input', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        const searchInput = screen.getByPlaceholderText(/search restaurants/i)
        expect(searchInput).toHaveAttribute('type', 'text')
      })
    })

    it('should have accessible category buttons', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        const buttons = screen.getAllByRole('button')
        expect(buttons.length).toBeGreaterThan(0)
      })
    })

    it('should have accessible sort dropdown', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        const sortSelect = screen.getByRole('combobox')
        expect(sortSelect).toBeInTheDocument()
      })
    })

    it('should have accessible links', async () => {
      render(<RestaurantsList />)

      await waitFor(() => {
        const links = screen.getAllByRole('link')
        links.forEach(link => {
          expect(link).toHaveAttribute('href')
        })
      })
    })
  })

  describe('Performance', () => {
    it('should handle large datasets', async () => {
      const largeDataset = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `Restaurant ${i + 1}`,
        category: 'Test',
        emoji: '🍴',
        description: 'Test restaurant',
        rating: 4.5,
        reviews: 100,
        address: `${i + 1} Test St`,
      }))

      ;(global.fetch as jest.Mock).mockResolvedValue({
        json: async () => largeDataset,
      })

      render(<RestaurantsList />)

      await waitFor(() => {
        expect(screen.getByText(/Showing 100 of/)).toBeInTheDocument()
      })
    })

    it('should not re-fetch on re-render', async () => {
      const { rerender } = render(<RestaurantsList />)

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(1)
      })

      rerender(<RestaurantsList />)

      expect(global.fetch).toHaveBeenCalledTimes(1)
    })
  })
})