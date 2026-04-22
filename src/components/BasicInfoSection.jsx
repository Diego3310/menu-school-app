import FormField from './FormField';

function BasicInfoSection({ form, onFieldChange }) {
  return (
    <section className="card basic-info-card">
      <h2>1) Datos principales</h2>
      <p className="help-text">Complete estos campos primero para ver el encabezado del menú.</p>
      <div className="grid two">
        <FormField label="Título del menú">
          <input
            className="basic-input"
            value={form.menu_title}
            onChange={(e) => onFieldChange('menu_title', e.target.value)}
          />
        </FormField>
        <FormField label="Nombre del colegio">
          <input
            className="basic-input"
            value={form.school_name}
            onChange={(e) => onFieldChange('school_name', e.target.value)}
          />
        </FormField>
      </div>
      <div className="grid two basic-date-grid">
        <FormField label="Fecha inicio">
          <input
            className="combo-field"
            type="date"
            value={form.week_start}
            onChange={(e) => onFieldChange('week_start', e.target.value)}
          />
        </FormField>
        <FormField label="Fecha fin">
          <input
            className="combo-field"
            type="date"
            value={form.week_end}
            onChange={(e) => onFieldChange('week_end', e.target.value)}
          />
        </FormField>
      </div>
    </section>
  );
}

export default BasicInfoSection;
