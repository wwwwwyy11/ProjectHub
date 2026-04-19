import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { ThemeProvider } from "./contexts/ThemeContext"
import { AuthProvider } from "./contexts/AuthContext"
import { ModalProvider } from "./contexts/ModalContext"
import { TooltipProvider } from "./components/ui/tooltip"
import { ToastContainer } from "./components/ui/toast"
import FloatingAIButton from "./components/common/FloatingAIButton"

// Auth Pages
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"

// Professional Mode Pages
import ProfessionalHomePage from "./pages/professional/ProfessionalHomePage"
import OpenSourcePage from "./pages/professional/OpenSourcePage"
import MarketPage from "./pages/professional/MarketPage"
import TeamPage from "./pages/professional/TeamPage"
import ProfilePage from "./pages/professional/ProfilePage"
import CommunityPage from "./pages/professional/CommunityPage"
import CheckoutPage from "./pages/professional/CheckoutPage"
import CartPage from "./pages/professional/CartPage"
import ProfessionalSearchPage from "./pages/professional/ProfessionalSearchPage"

// Inclusive Mode - Learning Pages
import InclusiveHomePage from "./pages/inclusive/InclusiveHomePage"
import LearnPage from "./pages/inclusive/LearnPage"
import CampPage from "./pages/inclusive/CampPage"
import PortfolioPage from "./pages/inclusive/PortfolioPage"
import AITutorPage from "./pages/inclusive/AITutorPage"
import InclusiveCommunityPage from "./pages/inclusive/InclusiveCommunityPage"
import InclusiveSearchPage from "./pages/inclusive/InclusiveSearchPage"

// Demand Mode Pages
import DemandHomePage from "./pages/demand/DemandHomePage"
import ShopPage from "./pages/demand/ShopPage"
import CustomPage from "./pages/demand/CustomPage"
import AIAdvisorPage from "./pages/demand/AIAdvisorPage"
import DemandCommunityPage from "./pages/demand/DemandCommunityPage"
import DemandSearchPage from "./pages/demand/DemandSearchPage"

function AIButtonWrapper() {
  const location = useLocation()
  let variant: "learn" | "demand" | "professional" = "professional"
  if (location.pathname.startsWith("/inclusive/learn") || location.pathname.startsWith("/inclusive/")) {
    variant = "learn"
  } else if (location.pathname.startsWith("/demand/")) {
    variant = "demand"
  }
  return <FloatingAIButton variant={variant} />
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ModalProvider>
          <TooltipProvider>
            <BrowserRouter>
              <Routes>
                {/* Root */}
                <Route path="/" element={<Navigate to="/professional/home" replace />} />

                {/* Auth */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Professional Mode */}
                <Route path="/professional/home" element={<ProfessionalHomePage />} />
                <Route path="/professional/open-source" element={<OpenSourcePage />} />
                <Route path="/professional/open-source/:id" element={<OpenSourcePage />} />
                <Route path="/professional/market" element={<MarketPage />} />
                <Route path="/professional/market/:id" element={<MarketPage />} />
                <Route path="/professional/team" element={<TeamPage />} />
                <Route path="/professional/community" element={<CommunityPage />} />
                <Route path="/professional/profile" element={<ProfilePage />} />
                <Route path="/professional/cart" element={<CartPage />} />
                <Route path="/professional/checkout/:type/:id" element={<CheckoutPage />} />
                <Route path="/professional/search" element={<ProfessionalSearchPage />} />

                {/* Inclusive Mode - Learning */}
                <Route path="/inclusive/home" element={<InclusiveHomePage />} />
                <Route path="/inclusive/learn" element={<LearnPage />} />
                <Route path="/inclusive/camp" element={<CampPage />} />
                <Route path="/inclusive/portfolio" element={<PortfolioPage />} />
                <Route path="/inclusive/ai-tutor" element={<AITutorPage />} />
                <Route path="/inclusive/community" element={<InclusiveCommunityPage />} />
                <Route path="/inclusive/search" element={<InclusiveSearchPage />} />

                {/* Demand Mode */}
                <Route path="/demand/home" element={<DemandHomePage />} />
                <Route path="/demand/shop" element={<ShopPage />} />
                <Route path="/demand/shop/:id" element={<ShopPage />} />
                <Route path="/demand/custom" element={<CustomPage />} />
                <Route path="/demand/ai-advisor" element={<AIAdvisorPage />} />
                <Route path="/demand/community" element={<DemandCommunityPage />} />
                <Route path="/demand/search" element={<DemandSearchPage />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/professional/home" replace />} />
              </Routes>
              <AIButtonWrapper />
            </BrowserRouter>
            <ToastContainer />
          </TooltipProvider>
        </ModalProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
