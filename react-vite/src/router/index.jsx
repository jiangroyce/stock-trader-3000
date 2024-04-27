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
import AccountWatchlists from '../components/AccountWatchlists';
import AccountScreeners from '../components/AccountScreeners';
import { AboutPage, AboutResearchPage, AboutStrategiesPage, AboutTradingPage, ComingSoonPage } from "../components/About"

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
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
            path: "positions",
            element: <AccountSummary />
          },
          {
            path: "transfers",
            element: <Transfers />
          },
          {
            path: "watchlists",
            element: <AccountWatchlists />
          },
          {
            path: "screeners",
            element: <AccountScreeners />
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
      {
        path: "about",
        children: [
          {
            index: true,
            element: <AboutPage />
          },
          {
            path: "trading",
            element: <AboutTradingPage />
          },
          {
            path: "research",
            element: <AboutResearchPage />
          },
          {
            path: "strategies",
            element: <AboutStrategiesPage />
          },
          {
            path: "future",
            element: <ComingSoonPage />
          },
        ]
      }
    ],
  },
]);
