import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

import Dashboard from './pages/Dashboard'
import ProduceShipped from './pages/ProduceShipped'
import GoldenWalnuts from './pages/GoldenWalnuts'
import FishCaught from './pages/FishCaught'
import Bundles from './pages/Bundles'
import CookingRecipes from './pages/CookingRecipes'
import CraftingRecipes from './pages/CraftingRecipes'
import FarmProgress from './pages/FarmProgress'
import MonsterSlayer from './pages/MonsterSlayer'
import Museum from './pages/Museum'
import GreatFriends from './pages/GreatFriends'
import FarmerLevel from './pages/FarmerLevel'

// App
// Top-level routes — one <Route> per page, wrapped in <Layout>.
// "/" -> Dashboard

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/shipped" element={<ProduceShipped />} />
          <Route path="/golden-walnuts" element={<GoldenWalnuts />} />
          <Route path="/fish" element={<FishCaught />} />
          <Route path="/bundles" element={<Bundles />} />
          <Route path="/cooking" element={<CookingRecipes />} />
          <Route path="/crafting" element={<CraftingRecipes />} />
          <Route path="/farm-progress" element={<FarmProgress />} />
          <Route path="/monster-slayer" element={<MonsterSlayer />} />
          <Route path="/museum" element={<Museum />} />
          <Route path="/great-friends" element={<GreatFriends />} />
          <Route path="/farmer-level" element={<FarmerLevel />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}