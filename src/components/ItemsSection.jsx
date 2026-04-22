import { DAY_KEYS, DAY_LABELS } from '../domain/days';
import FormField from './FormField';

function ItemsSection({
  items,
  editor,
  editingId,
  onEditorChange,
  onAdd,
  onSave,
  onCancel,
  onEdit,
  onDelete,
}) {
  return (
    <section className="card">
      <h2>2) Plato y refresco</h2>
      <p className="help-text">Ingrese el plato y el refresco por día. Luego use Agregar para guardarlo en la lista.</p>
      <div className="grid four item-entry-grid">
        <FormField label="Día">
          <select className="combo-field" value={editor.day} onChange={(e) => onEditorChange('day', e.target.value)}>
            {DAY_KEYS.map((key) => (
              <option value={key} key={key}>
                {DAY_LABELS[key]}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Tipo">
          <select className="select-small combo-field" value={editor.type} onChange={(e) => onEditorChange('type', e.target.value)}>
            <option value="menu">Menú</option>
            <option value="carta">Carta</option>
          </select>
        </FormField>
        <FormField label="Plato">
          <input
            value={editor.dish}
            onChange={(e) => onEditorChange('dish', e.target.value)}
            placeholder="Ejemplo: Arroz con pollo"
          />
        </FormField>
        <FormField label="Refresco">
          <input
            value={editor.drink}
            onChange={(e) => onEditorChange('drink', e.target.value)}
            placeholder="Ejemplo: Chicha"
          />
        </FormField>
      </div>

      <div className="actions-row">
        <button className="btn primary" type="button" onClick={onAdd} disabled={Boolean(editingId)}>
          Agregar
        </button>
        <button className="btn" type="button" onClick={onSave} disabled={!editingId}>
          Guardar
        </button>
        <button className="btn" type="button" onClick={onCancel} disabled={!editingId}>
          Cancelar
        </button>
      </div>

      <div className="table-wrap items-table-wrap">
        <table className="items-table">
          <thead>
            <tr>
              <th>Día</th>
              <th>Tipo</th>
              <th>Plato</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td className="empty-row" colSpan={4}>
                  Sin registros.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  <td>{DAY_LABELS[item.day]}</td>
                  <td>{item.type === 'menu' ? 'Menú' : 'Carta'}</td>
                  <td>{item.dish}</td>
                  <td className="actions">
                    <button
                      className="row-btn icon-btn"
                      type="button"
                      onClick={() => onEdit(item.id)}
                      title="Editar"
                      aria-label="Editar"
                    >
                      ✏️
                    </button>{' '}
                    <button
                      className="row-btn delete icon-btn"
                      type="button"
                      onClick={() => onDelete(item.id)}
                      title="Eliminar"
                      aria-label="Eliminar"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ItemsSection;
