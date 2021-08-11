import routes from './routes';

export default [
  {
    id: 0,
    link: routes.PERFORMANCE,
    name: {
      pt_br: 'Performance',
      en_us: 'Performance',
      de: 'Performance',
    },
  },

  {
    id: 1,
    link: routes.CURRENT_FAULTS,
    name: {
      pt_br: 'Falhas Atuais',
      en_us: 'Current Faults',
      de: 'Aktuelle Fehler',
    },
  },
  {
    id: 2,
    link: routes.FAULT_PREDICTION,
    name: {
      pt_br: 'Previsão de Falha',
      en_us: 'Fault Prediction',
      de: 'Fehlervorhersage',
    },
  },
  {
    id: 3,
    link: routes.CURRENT_STATUS,
    name: {
      pt_br: 'Status Atual',
      en_us: 'Current Status',
      de: 'aktueller Status',
    },
  },
  {
    id: 4,
    link: routes.MIX_SUGGESTION,
    name: {
      pt_br: 'Sugestão de MIX',
      en_us: 'Mix Suggestion',
      de: 'Vorschlag Mischen',
    },
  },
  {
    id: 5,
    link: routes.PERFORMANCE_HISTORY,
    name: {
      pt_br: 'Histórico de Performance',
      en_us: 'Performance History',
      de: 'Leistungsverlauf',
    },
  },
  {
    id: 6,
    link: routes.MONTHLY_REPORT,
    name: {
      pt_br: 'Relatório Mensal',
      en_us: 'Monthly Report',
      de: 'Monatlicher Bericht',
    },
  },
  {
    id: 7,
    link: routes.SHIFTS_REGISTRATION,
    name: {
      pt_br: 'Cadastro de Turnos',
      en_us: 'Shift Registration',
      de: 'Ploegenregistratie',
    },
  },
];
