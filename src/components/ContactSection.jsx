import FormField from './FormField';

function ContactSection({ form, onFieldChange }) {
  return (
    <section className="card">
      <h2>4) Contacto y pagos</h2>
      <p className="help-text">Complete el nombre y teléfono para que los padres puedan pedir información rápidamente.</p>
      <div className="grid two">
        <FormField label="Nombre de contacto">
          <input value={form.contact_name} onChange={(e) => onFieldChange('contact_name', e.target.value)} />
        </FormField>
        <FormField label="Teléfono">
          <input value={form.contact_phone} onChange={(e) => onFieldChange('contact_phone', e.target.value)} />
        </FormField>
      </div>
    </section>
  );
}

export default ContactSection;
