import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Auth0Provider
    domain="dev-ha77yk6xwh4lfapo.us.auth0.com"
    clientId="xO1DcDwh5AhtV8Ieq5TMtWSXBQ6u9eiB"
    authorizationParams={{ redirect_uri: window.location.origin }}
    >
    <App />
  </Auth0Provider>
  </BrowserRouter>,
)
