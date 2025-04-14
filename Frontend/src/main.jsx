import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Custom context for additional global state
import ContextProvider from './context/ContextProvider.jsx'
import theme from './context/ThemeProvider.jsx'

// Redux setup
import { store } from './redux/store.js'
import { Provider } from "react-redux"
import { ThemeProvider } from '@emotion/react'

// Rendering the React application
createRoot(document.getElementById('root')).render(
	<StrictMode>
		{/* Global context */}
		<ThemeProvider theme={theme}>
			<ContextProvider>
				{/* Redux setup */}
				<Provider store={store}>
					<App />
				</Provider>
			</ContextProvider>
		</ThemeProvider>
	</StrictMode>,
)
