import { describe, it, expect } from 'vitest'

describe('vitest + jsdom', () => {
  it('runs in a browser-like environment', () => {
    expect(typeof document).toBe('object')
    expect(document.createElement('div')).toBeInstanceOf(HTMLDivElement)
  })

  it('loads @testing-library/jest-dom matchers', () => {
    document.body.innerHTML = '<div data-testid="x">hi</div>'
    expect(document.querySelector('[data-testid="x"]')).toBeInTheDocument()
    document.body.innerHTML = ''
  })
})
