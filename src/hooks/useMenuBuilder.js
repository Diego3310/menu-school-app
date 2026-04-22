import { useMemo, useState } from 'react';
import { createInitialForm, createInitialItemEditor } from '../domain/defaults';
import { buildEmptyDrinksByDay, buildPreviewSlotsByDay, createItemId } from '../utils/items';
import { formatSolesAmount, formatWeekRangeLabel } from '../utils/formatters';
import { getDefaultSchoolAvatar } from '../config/payments';

function buildInitialForm() {
  return createInitialForm({ defaultSchoolAvatar: getDefaultSchoolAvatar() });
}

export function useMenuBuilder() {
  const [form, setForm] = useState(buildInitialForm);
  const [items, setItems] = useState([]);
  const [itemEditor, setItemEditor] = useState(createInitialItemEditor);
  const [editingId, setEditingId] = useState(null);

  const groupedItems = useMemo(
    () => ({
      dishes: buildPreviewSlotsByDay(items),
      drinks: buildEmptyDrinksByDay(),
    }),
    [items],
  );

  const templateData = useMemo(
    () => ({
      ...form,
      week_label: formatWeekRangeLabel(form.week_start, form.week_end),
      cost_daily: formatSolesAmount(form.cost_daily_amount, 'Menú del día'),
      cost_a_la_carte: form.enable_a_la_carte
        ? formatSolesAmount(form.cost_a_la_carte_amount, 'Plato a la carta')
        : '',
      dishes: groupedItems.dishes,
      drinks: groupedItems.drinks,
    }),
    [form, groupedItems],
  );

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function resetAll() {
    setForm(buildInitialForm());
    setItems([]);
    setItemEditor(createInitialItemEditor());
    setEditingId(null);
  }

  function addItem() {
    const dish = itemEditor.dish.trim();
    const drink = itemEditor.drink.trim();
    if (!dish || !drink) return false;

    setItems((prev) => [
      ...prev,
      {
        id: createItemId(),
        day: itemEditor.day,
        type: itemEditor.type,
        dish,
        drink,
      },
    ]);

    setItemEditor(createInitialItemEditor());
    return true;
  }

  function startEdit(id) {
    const row = items.find((item) => item.id === id);
    if (!row) return;

    setEditingId(id);
    setItemEditor({ day: row.day, type: row.type || 'menu', dish: row.dish, drink: row.drink });
  }

  function saveEdit() {
    if (!editingId) return false;

    const dish = itemEditor.dish.trim();
    const drink = itemEditor.drink.trim();
    if (!dish || !drink) return false;

    setItems((prev) =>
      prev.map((item) =>
        item.id === editingId
          ? {
              ...item,
              day: itemEditor.day,
              type: itemEditor.type,
              dish,
              drink,
            }
          : item,
      ),
    );

    setEditingId(null);
    setItemEditor(createInitialItemEditor());
    return true;
  }

  function cancelEdit() {
    setEditingId(null);
    setItemEditor(createInitialItemEditor());
  }

  function deleteItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      cancelEdit();
    }
  }

  return {
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
  };
}
