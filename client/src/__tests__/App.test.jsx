import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

vi.mock('../Pages/MainPage', () => ({
  default: () => <h1>Main Page Mock</h1>,
}))

vi.mock('../Pages/ListingsPage', () => ({
  default: () => <h1>Listings Page Mock</h1>,
}))

vi.mock('../Pages/LoginPage', () => ({
  default: () => <h1>Login Page Mock</h1>,
}))

vi.mock('../Pages/ListingDetailPage', () => ({
  default: () => <h1>Listing Detail Page Mock</h1>,
}))

vi.mock('../Pages/ListingFormPage', () => ({
  default: ({ mode }) => <h1>{mode === 'edit' ? 'Edit Listing Mock' : 'Create Listing Mock'}</h1>,
}))

describe('App routes', () => {
  it('renders main page on /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: 'Main Page Mock' })).toBeInTheDocument()
  })

  it('renders listings page on /listings', () => {
    render(
      <MemoryRouter initialEntries={['/listings']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: 'Listings Page Mock' })).toBeInTheDocument()
  })

  it('renders create form on /listings/new', () => {
    render(
      <MemoryRouter initialEntries={['/listings/new']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: 'Create Listing Mock' })).toBeInTheDocument()
  })

  it('renders detail page on /listings/:id', () => {
    render(
      <MemoryRouter initialEntries={['/listings/123']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: 'Listing Detail Page Mock' })).toBeInTheDocument()
  })
})
