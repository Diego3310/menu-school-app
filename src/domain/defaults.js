function formatAsIsoDate(date) {
  return date.toISOString().slice(0, 10);
}

function buildDefaultDateRange() {
  const start = new Date();
  const end = new Date();
  end.setDate(start.getDate() + 4);

  return {
    week_start: formatAsIsoDate(start),
    week_end: formatAsIsoDate(end),
  };
}

export function createInitialForm(options = {}) {
  const { defaultSchoolAvatar = '' } = options;
  const { week_start, week_end } = buildDefaultDateRange();

  return {
    menu_title: 'MENÚ SEMANAL',
    school_name: '',
    week_start,
    week_end,
    school_avatar: defaultSchoolAvatar,
    days: {
      monday: 'LUNES',
      tuesday: 'MARTES',
      wednesday: 'MIÉRCOLES',
      thursday: 'JUEVES',
      friday: 'VIERNES',
    },
    cost_daily_amount: '10',
    enable_a_la_carte: false,
    cost_a_la_carte_amount: '13',
    contact_name: '',
    contact_phone: '',
    payment_methods: {
      yape_icon: '',
      plin_icon: '',
    },
  };
}

export function createInitialItemEditor() {
  return {
    day: 'monday',
    type: 'menu',
    dish: '',
    drink: '',
  };
}
