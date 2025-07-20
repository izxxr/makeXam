import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store.ts'
import './styles/index.css'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider />
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </HeroUIProvider>
  </StrictMode>,
)
