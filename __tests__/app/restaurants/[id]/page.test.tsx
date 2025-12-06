import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import RestaurantDetailPage from '@/app/restaurants/[id]/page'
import { useParams, useRouter } from 'next/navigation'

jest.mock('next/navigation')

describe('RestaurantDetailPage Component', () => {
  let mockRouter: any

  beforeEach(() => {
    jest.clearAllMocks()
    mockRouter = {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  describe('Valid Restaurant ID', () => {
    beforeEach(() => {
      ;(useParams as jest.Mock).mockReturnValue({ id: '1' })
    })

    it('should render restaurant name', () => {
      render(<RestaurantDetailPage />)
      expect(screen.getByText('Spice Haven')).toBeInTheDocument()
    })

    it('should render restaurant emoji', () => {
      render(<RestaurantDetailPage />)
      expect(screen.getByText('🍛')).toBeInTheDocument()
    })

    it('should render restaurant category', () => {
      render(<RestaurantDetailPage />)
      expect(screen.getByText(/Indian Cuisine/i)).toBeInTheDocument()
    })

    it('should render restaurant rating', () => {
      render(<RestaurantDetailPage />)
      expect(screen.getByText('4.5')).toBeInTheDocument()
    })

    it('should render back button', () => {
      render(<RestaurantDetailPage />)
      expect(screen.getByText('Back')).toBeInTheDocument()
    })
  })

  describe('Navigation', () => {
    beforeEach(() => {
      ;(useParams as jest.Mock).mockReturnValue({ id: '1' })
    })

    it('should call router.back() when back button is clicked', () => {
      render(<RestaurantDetailPage />)
      const backButton = screen.getByText('Back')
      fireEvent.click(backButton)
      expect(mockRouter.back).toHaveBeenCalledTimes(1)
    })
  })

  describe('Invalid Restaurant ID', () => {
    beforeEach(() => {
      ;(useParams as jest.Mock).mockReturnValue({ id: '999' })
    })

    it('should show Restaurant Not Found message', () => {
      render(<RestaurantDetailPage />)
      expect(screen.getByText('Restaurant Not Found')).toBeInTheDocument()
    })

    it('should show Go Back button', () => {
      render(<RestaurantDetailPage />)
      expect(screen.getByText('Go Back')).toBeInTheDocument()
    })

    it('should call router.back() when Go Back is clicked', () => {
      render(<RestaurantDetailPage />)
      const goBackButton = screen.getByText('Go Back')
      fireEvent.click(goBackButton)
      expect(mockRouter.back).toHaveBeenCalledTimes(1)
    })
  })

  describe('Edge Cases', () => {
    it('should handle non-numeric ID', () => {
      ;(useParams as jest.Mock).mockReturnValue({ id: 'abc' })
      render(<RestaurantDetailPage />)
      expect(screen.getByText('Restaurant Not Found')).toBeInTheDocument()
    })

    it('should handle negative ID', () => {
      ;(useParams as jest.Mock).mockReturnValue({ id: '-1' })
      render(<RestaurantDetailPage />)
      expect(screen.getByText('Restaurant Not Found')).toBeInTheDocument()
    })
  })
})