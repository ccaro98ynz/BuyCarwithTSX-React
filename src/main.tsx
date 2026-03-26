import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css' 
import './index.css'
import ProductsView from './components/ProductsModel/ProductsView.tsx'
import CartView from './components/BuyCarModel/BuyCarView.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="container-fluid mt-4">
      <div className="row">        
        <div className="col-md-9">
          <ProductsView />
        </div>
        <div className="col-md-3 border-start">
          <CartView />
        </div>
      </div>
    </div>
  </StrictMode>,
)