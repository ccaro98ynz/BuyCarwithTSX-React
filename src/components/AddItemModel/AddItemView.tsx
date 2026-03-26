import React, { useState } from 'react';
import { type AddItemModelProps } from './AddItemInterface';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddItemStyle.css';

const AddItemView: React.FC<AddItemModelProps> = ({ product, onClose, onConfirm }) => {
  const [units, setUnits] = useState<number>(1);

  return (
    <div className="unit-overlay d-flex align-items-center justify-content-center">
      <div className="card p-4 shadow-lg border-0 animate-pop" style={{ width: '320px' }}>
        <div className="text-center mb-3">
          <img src={product.image} alt={product.name} style={{ height: '100px', objectFit: 'contain' }} />
          <h5 className="mt-3 fs-6 fw-bold">{product.name}</h5>
          <p className="text-muted small">Precio unitario: ${product.price}</p>
        </div>

        <div className="mb-3">
          <label className="form-label small fw-bold">Cantidad:</label>
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-outline-secondary btn-sm" onClick={() => setUnits(Math.max(1, units - 1))}>-</button>
            <input 
              type="number" 
              className="form-control text-center" 
              value={units} 
              onChange={(e) => setUnits(parseInt(e.target.value) || 1)}
            />
            <button className="btn btn-outline-secondary btn-sm" onClick={() => setUnits(units + 1)}>+</button>
          </div>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-light btn-sm w-100 border" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-amazon btn-sm w-100 fw-bold" onClick={() => onConfirm(units)}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemView;