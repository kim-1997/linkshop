import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ShopListPage from "./pages/ShopListPage";
import ShopCreatePage from "./pages/ShopCreatePage";
import Header from "./components/Header";
import Container from "./components/Container";
import ShopDetailPage from "./pages/ShopDetailPage";
import DetailHeader from "./components/DetailHeader";
import ShopEditPage from "./pages/ShopEditPage";

function App() {
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith("/link/");
  return (
    <>
      {isDetailPage ? <DetailHeader /> : <Header />}
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/list" />} />
          <Route path="/list" element={<ShopListPage />} />
          <Route path="/link/:id" element={<ShopDetailPage />} />
          <Route path="/linkpost" element={<ShopCreatePage />} />
          <Route path="/linkpost/:id/edit" element={<ShopEditPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
