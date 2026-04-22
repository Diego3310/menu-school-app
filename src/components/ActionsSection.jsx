function ActionsSection({ onReset, onDownloadPdf }) {
  return (
    <section className="card">
      <div className="actions-row wrap">
        <button className="btn" type="button" onClick={onReset}>
          Limpiar todo
        </button>
        <button className="btn success" type="button" onClick={onDownloadPdf}>
          Descargar PDF
        </button>
      </div>
    </section>
  );
}

export default ActionsSection;
