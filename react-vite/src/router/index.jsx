import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import LandingPage from '../components/LandingPage';
import Layout from './Layout';
import Dashboard from '../components/Dashboard';
import SingleWatchlist from '../components/SingleWatchlist';
import StockDetails from '../components/StockDetails';
import SearchBar from '../components/SearchBar';
import Screener from '../components/Screener';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "watchlists/:listId",
        element: <SingleWatchlist />
      },
      {
        path: "stocks/:ticker",
        element: <StockDetails/>
      },
      {
        path: "search",
        element: <SearchBar />
      },
      {
        path: "screener",
        element: <Screener />
      }
    ],
  },
]);
