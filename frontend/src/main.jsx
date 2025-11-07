import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"

import AdminPanel from "./components/Admin/AdminPanel.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminPanel />
  </StrictMode>,
)
