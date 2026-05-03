import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

const authState = vi.hoisted(() => ({
  isAuthenticated: false,
  logout: vi.fn(),
}))

const profileState = vi.hoisted(() => ({
  profileReady: false,
}))

vi.mock('@auth0/auth0-react', () => ({
  useAuth0: () => authState,
}))

vi.mock('../../contexts/UserHooks', () => ({
  useProfile: () => profileState,
}))

import Navbar from '../Navbar'

describe('Navbar', () => {
  beforeEach(() => {
    authState.isAuthenticated = false
    authState.logout.mockClear()
    profileState.profileReady = false
  })

  it('shows login link for unauthenticated users', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Listings' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Login' })).toBeInTheDocument()
  })

  it('shows profile and logout when profile is ready', () => {
    authState.isAuthenticated = true
    profileState.profileReady = true

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: 'Profile' })).toBeInTheDocument()

    fireEvent.click(screen.getByText('Logout'))
    expect(authState.logout).toHaveBeenCalledTimes(1)
  })

  it('shows emergency logout while waiting for profile', () => {
    authState.isAuthenticated = true
    profileState.profileReady = false

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    expect(screen.getByText('Retrieving user info...')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Emergency logout'))
    expect(authState.logout).toHaveBeenCalledTimes(1)
  })
})
