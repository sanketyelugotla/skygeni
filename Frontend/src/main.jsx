import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Custom context for additional global state
import ContextProvider from './context/ContextProvider.jsx'

// Redux setup
import { store } from './redux/store.js'
import { Provider } from "react-redux"

// Rendering the React application
createRoot(document.getElementById('root')).render(
	<StrictMode>
		{/* Global context */}
		<ContextProvider>
			{/* Redux setup */}
			<Provider store={store}>
				<App />
			</Provider>
		</ContextProvider>
	</StrictMode>,
)
