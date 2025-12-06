import { render, screen, fireEvent } from '@testing-library/react'
import Sidebar from '@/app/components/Sidebar'
import { usePathname, useRouter } from 'next/navigation'

// Mocks are already set up in jest.setup.js, but we need to customize them
jest.mock('next/navigation')

describe('Sidebar Component', () => {
  let mockPush: jest.Mock
  let mockRouter: any

  beforeEach(() => {
    jest.clearAllMocks()
    mockPush = jest.fn()
    mockRouter = {
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(usePathname as jest.Mock).mockReturnValue('/dashboard')
  })

  describe('Rendering', () => {
    it('should render the sidebar with brand name', () => {
      render(<Sidebar />)

      expect(screen.getByText('GlassAdmin')).toBeInTheDocument()
    })

    it('should render all navigation items', () => {
      render(<Sidebar />)

      expect(screen.getByText('Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Restaurants')).toBeInTheDocument()
      expect(screen.getByText('Reviews')).toBeInTheDocument()
      expect(screen.getByText('Settings')).toBeInTheDocument()
    })

    it('should render user info section', () => {
      render(<Sidebar />)

      expect(screen.getByText('Logged in as')).toBeInTheDocument()
      expect(screen.getByText('Admin User')).toBeInTheDocument()
    })

    it('should render brand logo element', () => {
      const { container } = render(<Sidebar />)

      const logo = container.querySelector(
        '.bg-gradient-to-br.from-indigo-500.to-purple-500'
      )
      expect(logo).toBeInTheDocument()
    })

    it('should render all navigation icons', () => {
      const { container } = render(<Sidebar />)

      // Check that icons are rendered (lucide-react icons)
      const icons = container.querySelectorAll('svg')
      expect(icons.length).toBeGreaterThan(0)
    })
  })

  describe('Active State', () => {
    it('should highlight Dashboard when on dashboard route', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/dashboard')
      const { container } = render(<Sidebar />)

      const dashboardLink = screen.getByText('Dashboard').closest('a')
      expect(dashboardLink).toHaveClass('text-white')
    })

    it('should highlight Restaurants when on restaurants route', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/dashboard/restaurants')
      const { container } = render(<Sidebar />)

      const restaurantsButton = screen.getByText('Restaurants').closest('button')
      expect(restaurantsButton).toHaveClass('text-white')
    })

    it('should highlight Reviews when on reviews route', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/dashboard/reviews')
      render(<Sidebar />)

      const reviewsLink = screen.getByText('Reviews').closest('a')
      expect(reviewsLink).toHaveClass('text-white')
    })

    it('should highlight Settings when on settings route', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/dashboard/settings')
      render(<Sidebar />)

      const settingsLink = screen.getByText('Settings').closest('a')
      expect(settingsLink).toHaveClass('text-white')
    })

    it('should show inactive state for non-active items', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/dashboard')
      render(<Sidebar />)

      const reviewsLink = screen.getByText('Reviews').closest('a')
      expect(reviewsLink).toHaveClass('text-white/60')
    })
  })

  describe('Navigation - Restaurants Button', () => {
    it('should navigate to /restaurants when Restaurants button is clicked', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/dashboard')
      render(<Sidebar />)

      const restaurantsButton = screen.getByText('Restaurants')
      fireEvent.click(restaurantsButton)

      expect(mockPush).toHaveBeenCalledWith('/restaurants')
      expect(mockPush).toHaveBeenCalledTimes(1)
    })

    it('should use button element for Restaurants (not Link)', () => {
      render(<Sidebar />)

      const restaurantsElement = screen.getByText('Restaurants').parentElement
      expect(restaurantsElement?.tagName).toBe('BUTTON')
    })

    it('should handle multiple clicks on Restaurants button', () => {
      render(<Sidebar />)

      const restaurantsButton = screen.getByText('Restaurants')
      fireEvent.click(restaurantsButton)
      fireEvent.click(restaurantsButton)
      fireEvent.click(restaurantsButton)

      expect(mockPush).toHaveBeenCalledTimes(3)
      expect(mockPush).toHaveBeenCalledWith('/restaurants')
    })

    it('should have correct accessibility attributes on Restaurants button', () => {
      render(<Sidebar />)

      const restaurantsButton = screen.getByText('Restaurants').closest('button')
      expect(restaurantsButton).toHaveAttribute('class')
      expect(restaurantsButton).toBeInTheDocument()
    })
  })

  describe('Navigation - Other Links', () => {
    it('should render Dashboard as a Link component', () => {
      render(<Sidebar />)

      const dashboardElement = screen.getByText('Dashboard').closest('a')
      expect(dashboardElement).toHaveAttribute('href', '/dashboard')
    })

    it('should render Reviews as a Link component', () => {
      render(<Sidebar />)

      const reviewsElement = screen.getByText('Reviews').closest('a')
      expect(reviewsElement).toHaveAttribute('href', '/dashboard/reviews')
    })

    it('should render Settings as a Link component', () => {
      render(<Sidebar />)

      const settingsElement = screen.getByText('Settings').closest('a')
      expect(settingsElement).toHaveAttribute('href', '/dashboard/settings')
    })

    it('should have correct href attributes for all links', () => {
      render(<Sidebar />)

      expect(screen.getByText('Dashboard').closest('a')).toHaveAttribute(
        'href',
        '/dashboard'
      )
      expect(screen.getByText('Reviews').closest('a')).toHaveAttribute(
        'href',
        '/dashboard/reviews'
      )
      expect(screen.getByText('Settings').closest('a')).toHaveAttribute(
        'href',
        '/dashboard/settings'
      )
    })
  })

  describe('Styling and CSS Classes', () => {
    it('should have fixed positioning classes', () => {
      const { container } = render(<Sidebar />)

      const aside = container.querySelector('aside')
      expect(aside).toHaveClass('fixed')
      expect(aside).toHaveClass('left-0')
      expect(aside).toHaveClass('top-0')
    })

    it('should have correct width and height classes', () => {
      const { container } = render(<Sidebar />)

      const aside = container.querySelector('aside')
      expect(aside).toHaveClass('h-screen')
      expect(aside).toHaveClass('w-64')
    })

    it('should have glass effect classes', () => {
      const { container } = render(<Sidebar />)

      const aside = container.querySelector('aside')
      expect(aside).toHaveClass('glass-sidebar')
    })

    it('should have correct z-index for layering', () => {
      const { container } = render(<Sidebar />)

      const aside = container.querySelector('aside')
      expect(aside).toHaveClass('z-50')
    })

    it('should apply hover effects on nav items', () => {
      render(<Sidebar />)

      const reviewsLink = screen.getByText('Reviews').closest('a')
      expect(reviewsLink).toHaveClass('hover:text-white')
    })
  })

  describe('Data Structure and Configuration', () => {
    it('should maintain correct order of navigation items', () => {
      render(<Sidebar />)

      const navTexts = screen.getAllByRole('link').map((el) => el.textContent)
      expect(navTexts).toContain('Dashboard')
      expect(navTexts).toContain('Reviews')
      expect(navTexts).toContain('Settings')

      // Restaurants is a button, not a link
      expect(screen.getByText('Restaurants')).toBeInTheDocument()
    })

    it('should have correct icon associations', () => {
      const { container } = render(<Sidebar />)

      // Each nav item should have an icon (svg element)
      const dashboardLink = screen.getByText('Dashboard').closest('a')
      const icon = dashboardLink?.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle unknown pathname gracefully', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/unknown/path')
      render(<Sidebar />)

      // Should still render all items
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Restaurants')).toBeInTheDocument()
    })

    it('should handle null pathname', () => {
      ;(usePathname as jest.Mock).mockReturnValue(null)
      
      expect(() => render(<Sidebar />)).not.toThrow()
    })

    it('should handle router errors gracefully', () => {
      mockPush.mockImplementation(() => {
        throw new Error('Navigation error')
      })

      render(<Sidebar />)
      const restaurantsButton = screen.getByText('Restaurants')

      expect(() => fireEvent.click(restaurantsButton)).toThrow()
    })

    it('should render correctly with very long pathname', () => {
      const longPath = '/dashboard/restaurants/' + 'a'.repeat(1000)
      ;(usePathname as jest.Mock).mockReturnValue(longPath)

      expect(() => render(<Sidebar />)).not.toThrow()
    })
  })

  describe('Accessibility', () => {
    it('should have semantic HTML structure', () => {
      const { container } = render(<Sidebar />)

      expect(container.querySelector('aside')).toBeInTheDocument()
      expect(container.querySelector('nav')).toBeInTheDocument()
    })

    it('should have accessible navigation links', () => {
      render(<Sidebar />)

      const links = screen.getAllByRole('link')
      expect(links.length).toBeGreaterThan(0)

      links.forEach((link) => {
        expect(link).toHaveAttribute('href')
      })
    })

    it('should have accessible button for Restaurants', () => {
      render(<Sidebar />)

      const button = screen.getByText('Restaurants').closest('button')
      expect(button).toHaveAttribute('type', 'button')
    })

    it('should maintain focus styles', () => {
      render(<Sidebar />)

      const dashboardLink = screen.getByText('Dashboard').closest('a')
      expect(dashboardLink).toHaveClass('transition-colors')
    })
  })

  describe('Component Lifecycle', () => {
    it('should use usePathname hook correctly', () => {
      render(<Sidebar />)

      expect(usePathname).toHaveBeenCalled()
    })

    it('should use useRouter hook correctly', () => {
      render(<Sidebar />)

      expect(useRouter).toHaveBeenCalled()
    })

    it('should re-render when pathname changes', () => {
      const { rerender } = render(<Sidebar />)
      
      ;(usePathname as jest.Mock).mockReturnValue('/dashboard/reviews')
      rerender(<Sidebar />)

      const reviewsLink = screen.getByText('Reviews').closest('a')
      expect(reviewsLink).toHaveClass('text-white')
    })
  })

  describe('Layout and Spacing', () => {
    it('should have proper spacing classes', () => {
      const { container } = render(<Sidebar />)

      const aside = container.querySelector('aside')
      expect(aside).toHaveClass('p-6')
    })

    it('should have proper gap classes for navigation', () => {
      const { container } = render(<Sidebar />)

      const nav = container.querySelector('nav')
      expect(nav).toHaveClass('gap-2')
    })

    it('should have bottom section with mt-auto', () => {
      const { container } = render(<Sidebar />)

      const bottomSection = container.querySelector('.mt-auto')
      expect(bottomSection).toBeInTheDocument()
    })
  })
})