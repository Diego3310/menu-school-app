import { useMemo } from 'react';
import BasicInfoSection from './components/BasicInfoSection';
import ItemsSection from './components/ItemsSection';
import CostsSection from './components/CostsSection';
import ContactSection from './components/ContactSection';
import ActionsSection from './components/ActionsSection';
import PreviewPanel from './components/PreviewPanel';
import { removeDrinksRowFromTemplate, replacePlaceholders } from './utils/template';
import { downloadPdfFromHtml } from './utils/export';
import { useTemplate } from './hooks/useTemplate';
import { useMenuBuilder } from './hooks/useMenuBuilder';
import { getDefaultSchoolAvatar, getFixedPaymentIcons, getWhatsappIcon } from './config/payments';

function App() {
  const { templateHtml, loadError } = useTemplate();
  const {
    form,
    items,
    itemEditor,
    editingId,
    templateData,
    setItemEditor,
    updateField,
    resetAll,
    addItem,
    startEdit,
    saveEdit,
    cancelEdit,
    deleteItem,
  } = useMenuBuilder();

  const fixedTemplateData = useMemo(
    () => ({
      ...templateData,
      school_avatar: getDefaultSchoolAvatar(),
      whatsapp_icon: getWhatsappIcon(),
      payment_methods: {
        ...templateData.payment_methods,
        ...getFixedPaymentIcons(),
      },
    }),
    [templateData],
  );

  const finalHtml = useMemo(
    () => replacePlaceholders(removeDrinksRowFromTemplate(templateHtml || ''), fixedTemplateData),
    [templateHtml, fixedTemplateData],
  );

  function handleAddItem() {
    const created = addItem();
    if (!created) {
      alert('Por favor, complete plato y refresco para agregar el item.');
    }
  }

  function handleSaveItem() {
    const updated = saveEdit();
    if (!updated) {
      alert('No se pudo guardar. Verifique que plato y refresco tengan contenido.');
    }
  }

  function handleReset() {
    if (!window.confirm('¿Desea borrar todos los datos?')) return;
    resetAll();
  }

  async function handleDownloadPdf() {
    try {
      await downloadPdfFromHtml(finalHtml, 'menu-semanal.pdf');
    } catch {
      alert('No se pudo generar el PDF en este momento. Intente nuevamente.');
    }
  }

  return (
    <main className="app">
      <section className="panel editor-panel">
        <header className="panel-header">
          {loadError ? <p className="error">{loadError}</p> : null}
        </header>

        <BasicInfoSection form={form} onFieldChange={updateField} />

        <ItemsSection
          items={items}
          editor={itemEditor}
          editingId={editingId}
          onEditorChange={(key, value) => setItemEditor((prev) => ({ ...prev, [key]: value }))}
          onAdd={handleAddItem}
          onSave={handleSaveItem}
          onCancel={cancelEdit}
          onEdit={startEdit}
          onDelete={deleteItem}
        />

        <CostsSection form={form} onFieldChange={updateField} />
        <ContactSection form={form} onFieldChange={updateField} />

        <ActionsSection onReset={handleReset} onDownloadPdf={handleDownloadPdf} />
      </section>

      <PreviewPanel finalHtml={finalHtml} />
    </main>
  );
}

export default App;
