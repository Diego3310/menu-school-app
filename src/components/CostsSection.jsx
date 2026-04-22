function CostsSection({ form, onFieldChange }) {
  return (
    <section className="card">
      <h2>3) Costos</h2>
      <p className="help-text">Escriba solo el monto en soles. Puede activar “Carta” si también quiere mostrar ese precio.</p>
      <div className="cost-matrix">
        <div className="cost-row cost-head">
          <span>Tipo</span>
          <span>Costo (S/)</span>
        </div>

        <div className="cost-row">
          <span>Menú</span>
          <input
            type="number"
            min="0"
            step="0.1"
            value={form.cost_daily_amount}
            onChange={(e) => onFieldChange('cost_daily_amount', e.target.value)}
          />
        </div>

        <div className="cost-row">
          <label className="toggle-inline">
            <input
              type="checkbox"
              checked={form.enable_a_la_carte}
              onChange={(e) => onFieldChange('enable_a_la_carte', e.target.checked)}
            />
            <span>Carta</span>
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={form.cost_a_la_carte_amount}
            onChange={(e) => onFieldChange('cost_a_la_carte_amount', e.target.value)}
            disabled={!form.enable_a_la_carte}
          />
        </div>
      </div>
    </section>
  );
}

export default CostsSection;
