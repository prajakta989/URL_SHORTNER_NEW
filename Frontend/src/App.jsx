
import './App.css'
import {createBrowserRouter, Link, Router, RouterProvider} from 'react-router-dom'
import AppLayout from './layout/applayout'
import Dashboard from './pages/dashboard'
import LandingPage from './pages/landingpage'
import Auth from './pages/auth'
import RedirectLink from './pages/redirect-link'
import UrlProvider from './context'

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout/>,
      children:[{
        path: '/',
        element: <LandingPage/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/auth',
        element: <Auth/>
      },
      {
        path: '/link/:id',
        element: <Link/>
      },
      {
        path: '/:id',
        element: <RedirectLink/>
      }
    ]
    }
  ]
  )

  return (
    <UrlProvider>
      <RouterProvider router={router}/>
    </UrlProvider>
     
  )
}

export default App
