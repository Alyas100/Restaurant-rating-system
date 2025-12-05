Technical Product Requirements Document (PRD)
1. Executive Summary
The Problem Existing restaurant discovery platforms suffer from "information density fatigue" and static, utilitarian interfaces. Users struggle to gauge the vibe of a location through text-heavy lists, and the discovery process lacks visual engagement, leading to high bounce rates.

The Solution Develop a visually immersive, community-driven restaurant review platform. The architecture prioritizes Fluid UX (using Framer Motion) and Glassmorphism aesthetics to create a playful yet professional environment. The system acts as a high-speed bridge between culinary explorers and dining destinations.

Core Mechanics

Visual-First Discovery: A dynamic Hero and Listing interface relying on high-fidelity imagery and motion-based interactions.

Community Vetting: A robust Rating & Review architecture ensuring data integrity.

Admin Governance: A streamlined dashboard for content management, securing the platform against spam.

2. High-Level System Architecture
Tech Stack Strategy
To support the "Fluid UI" and "Glassmorphism" requirements, we require a stack that handles heavy client-side animation without blocking the main thread, while maintaining SEO via Server-Side Rendering (SSR).

Frontend: Next.js 14 (App Router).

Justification: React Server Components (RSC) for initial load speed; Client Components for Framer Motion interactions.

Styling: Tailwind CSS (utility-first) + Framer Motion (animation orchestration) + Shadcn UI (accessible base components, styled with Glassmorphism overrides).

Backend: Next.js Server Actions.

Justification: Eliminates the need for a separate Node.js server for MVP. Allows type-safe, direct database calls from the frontend.

Database: PostgreSQL (via Supabase or Neon).

ORM: Prisma.

Justification: Relational integrity is strictly required for the User-Restaurant-Review web.

Image Infrastructure: Cloudinary or AWS S3.

Justification: Essential for transforming user-uploaded food photos into optimized formats (WebP/AVIF) to prevent layout shifts (CLS) during animations.

Data Flow Architecture
Scenario: User Submits a Review

User Action: User clicks "Submit" on the Review Modal (Glass-overlay).

Client-Side Logic: Zod validation checks input. useOptimistic hook immediately renders the review in the UI list (for perceived speed).

Transport: Next.js Server Action is triggered (POST payload).

Database: Prisma creates a Review record and updates the Restaurant's cached averageRating.

Revalidation: revalidatePath('/restaurant/[id]') is called.

UI Update: The server returns the confirmed data; the optimistic state is replaced with the database state.

3. Database Schema & Data Modeling
Core Entities
1. User

id: String (UUID, PK)

email: String (Unique)

passwordHash: String

role: Enum (USER, ADMIN)

profileImage: String (URL)

createdAt: DateTime

2. Restaurant

id: String (UUID, PK)

name: String

slug: String (Unique, Indexed for SEO)

category: String (Indexed)

images: String[] (Array of URLs)

description: Text

ratingAvg: Float (Default 0.0)

reviewCount: Int (Default 0)

locationData: JSON (Lat/Long/Address)

3. Review

id: String (UUID, PK)

rating: Int (1-5)

text: Text

userId: String (FK -> User)

restaurantId: String (FK -> Restaurant)

createdAt: DateTime

Relationships
User 1:N Review (One user writes many reviews).

Restaurant 1:N Review (One restaurant has many reviews).

User N:N Restaurant (Bookmarks/Favorites - Post-MVP, but schema should support).

4. Modular Feature Breakdown
Module A: The "Prism" Hero Section (Frontpage)
This module focuses on the "Playful/Colorful" entry point.

User Story: "As a visitor, I want to be immediately engaged by a dynamic visual of trending food so that I am motivated to search."

Frontend Components:

HeroContainer: Uses a Bento Grid layout.

GlassSearchInput: A backdrop-blur input field (bg-white/10) with a floating motion effect on focus.

DynamicBackground: Animated mesh gradients (Aurora Borealis effect) using canvas or CSS keyframes to provide the "colorful" backdrop.

Technical Implementation Logic:

Fetch TopRatedRestaurants (Limit 3) via Server Component.

Pass data to a Client Component running a Framer Motion AnimatePresence carousel.

Animation Logic: On mount, stagger children opacity/y-axis. On hover, increase scale (1.05) and gloss intensity.

Module B: The "Control Tower" Admin Dashboard
This module focuses on the "Snazzy/Professional" management interface.

User Story: "As an Admin, I want to see platform metrics and manage restaurants via a data-dense but readable interface."

Frontend Components:

DashboardLayout: Sidebar navigation with acrylic blur (Glassmorphism).

StatsCard: Reusable component displaying metrics (Total Reviews, Avg Rating) with sparkline charts.

RestaurantTable: Data table with sticky headers, utilizing tanstack-table for sorting/filtering.

Required API Endpoints (Server Actions):

createRestaurant(data)

deleteRestaurant(id)

getSystemStats()

Technical Implementation Logic:

Authorization: Middleware check if (user.role !== 'ADMIN') redirect('/404').

Data Fetching: Parallel data fetching (Promise.all) for stats and list data to minimize Time to First Byte (TTFB).

Module C: Restaurant Detail & Review Engine
User Story: "As a user, I want to read reviews and add my own without page reloads."

Frontend Components:

ParallaxHeader: Restaurant image that moves slower than the scroll speed.

ReviewList: Virtualized list (if reviews > 50) to maintain frame rate.

RatingInput: Interactive star component with hover states handled by Framer Motion whileHover.

Edge Cases:

User tries to review the same restaurant twice (Database constraint violation).

Image upload fails (Network timeout).

5. Analytics & Data Hooks
To validate the "Playful" UX and Core Value, we must track:

Engagement: Average Session Duration (Does the UI keep them looking?).

Conversion: Search-to-Click Rate (CTR on Hero search results).

Core Value: Review Completion Rate (Percentage of users who start writing a review and actually submit it).

Performance: Interaction to Next Paint (INP) (Crucial for Glassmorphism/Animation heavy apps; must remain <200ms).

6. Non-Functional Requirements
Security
Role-Based Access Control (RBAC): Strict enforcement on API routes ensuring only ADMIN can mutate Restaurant data.

Input Sanitization: All review text must be sanitized (DOMPurify) to prevent XSS attacks before storage.

Rate Limiting: Implement upstash/ratelimit on review submissions to prevent bot spam.

Scalability
Static Generation: Restaurant pages should utilize Incremental Static Regeneration (ISR). Pages are cached at the edge and only rebuilt when a new review is added or every 60 seconds. This ensures the heavy Glassmorphism CSS doesn't impact server load on every request.

Asset Delivery: All images served via CDN with automatic format selection (Avif > WebP > Jpeg).

UI/UX Performance Standards
Glassmorphism Performance: Use CSS backdrop-filter: blur() cautiously. Disable blur effects on mobile devices (media query check) to preserve battery life and FPS.

Animation Budget: All Framer Motion transitions must use layout prop efficiently to avoid layout thrashing. Animations should be capped at 60fps.