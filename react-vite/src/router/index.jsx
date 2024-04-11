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
import Account from '../components/Account';
import AccountSummary from '../components/AccountSummary';
import Transfers from '../components/Transfers';
import OrderHistory from '../components/OrderHistory';
import Loading from '../components/Loading/Loading';

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
      },
      {
        path: "loading",
        element: <Loading />
      },
      {
        path: "account",
        element: <Account />,
        children: [
          {
            path: "summary",
            element: <AccountSummary />
          },
          {
            path: "transfers",
            element: <Transfers />
          },
          {
            path: "strategies",
            element: <h1>Strategies Coming Soon</h1>
          },
          {
            path: "history",
            element: <OrderHistory />
          },
        ]
      },
    ],
  },
]);
