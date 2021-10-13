export default {
  title: {
    pt_br: 'Relatório mensal',
    en_us: 'Monthly report',
    de: 'Monatlicher Bericht',
  },
  reference_month: {
    pt_br: 'Mês de referência',
    en_us: 'Reference month',
    de: 'Referenzmonat',
  },
  kpi: {
    prefix: {
      truck: {
        pt_br: 'caminhões',
        en_us: 'trucks',
        de: 'Lastwagen',
      },
    },
    per_station: {
      select: {
        pt_br: 'Escolha a estação',
        en_us: 'Choose the station',
        de: 'Wählen Sie die Station',
      },
    },
  },
  charts: {
    title: {
      pt_br: 'KPIs para todos os turnos',
      en_us: 'KPIs to all Shifts',
      de: 'KPIs für alle Schichten',
    },
    not_time: {
      production_goal: {
        pt_br: 'Produção Esperada',
        en_us: 'Expected Production',
        de: 'Erwartete Produktion',
      },
    },
    tooltips: {
      labels: {
        title: {
          pt_br: 'Dia',
          en_us: 'Day',
          de: 'Tag',
        },
      },
    },
    labels: {
      yAxis: {
        time: {
          pt_br: 'Tempo (seg)',
          en_us: 'Time (min)',
          de: 'Zeit (min)',
        },
        quantity: {
          pt_br: 'Quantidade (caminhões)',
          en_us: 'Quantity (trucks)',
          de: 'Menge (LKW)',
        },
      },
      xAxis: {
        days: {
          pt_br: 'Dias',
          en_us: 'Days',
          de: 'Tage',
        },
      },
      value: {
        pt_br: 'Produção diária',
        en_us: 'Daily production',
        de: 'Tägliche Produktion',
      },
      minimum: {
        pt_br: 'Mínimo',
        en_us: 'Minimum',
        de: 'Minimum',
      },
      medium: {
        pt_br: 'Médio',
        en_us: 'Medium',
        de: 'Mittel',
      },
      maximum: {
        pt_br: 'Máximo',
        en_us: 'Maximum',
        de: 'Maximal',
      },
    },
    current_takt: {
      title: {
        pt_br: 'Takt atual',
        en_us: 'Current Takt',
        de: 'Aktueller takt',
      },
      tooltips: {
        minimum: {
          pt_br: 'Takt mínimo (tempo) registrado no dia.',
          en_us: 'Minimum Takt (time) recorded on the day.',
          de: 'Minimaler Takt (Zeit), der am Tag aufgezeichnet wurde.',
        },
        maximum: {
          pt_br: 'Takt máximo (tempo) registrado no dia.',
          en_us: 'Maximum Takt (time) recorded on the day.',
          de: 'Maximaler Takt (Zeit), der am Tag aufgezeichnet wurde.',
        },
        medium: {
          pt_br: `Cálculo de Takt médio entre mínimo e máximo no dia. A linha média é traçada percorrendo todos os dias do mês. Dias sem produção deverão ser exibidos com valores zerados.`,
          en_us:
            'Calculation of average Takt between minimum and maximum on the day. The midline is drawn across all days of the month. Days without production should be displayed with zero values.',
          de: 'Berechnung des durchschnittlichen Takts zwischen Minimum und Maximum am Tag. Die Mittellinie wird über alle Tage des Monats gezogen. Tage ohne Produktion sollten mit Nullwerten angezeigt werden.',
        },
      },
    },
    daily_production: {
      tooltips: {
        daily_production: {
          pt_br:
            'Quantidade de veículos produzidos no dia, considerando os dois turnos.',
          en_us:
            'Number of vehicles produced on the day, considering the two shifts.',
          de: 'Anzahl der am Tag produzierten Fahrzeuge unter Berücksichtigung der beiden Schichten.',
        },
        expected_daily_production: {
          pt_br:
            'Quantidade baseada em modelo preditivo para a produção esperada (quantidade) de acordo com as condições da linha de produção, considerando os dois turnos.',
          en_us:
            'Quantity based on a predictive model for the expected production (quantity) according to the conditions of the production line, considering the two shifts.',
          de: 'Menge basierend auf einem Vorhersagemodell für die erwartete Produktion (Menge) gemäß den Bedingungen der Produktionslinie unter Berücksichtigung der beiden Verschiebungen.',
        },
        minimum: {
          pt_br: 'Linha histórica de produção mínima dentro do mês.',
          en_us: 'Historical minimum production line within the month.',
          de: 'Historische Mindestproduktionslinie innerhalb eines Monats.',
        },
        maximum: {
          pt_br: 'Linha histórica de produção máxima dentro do mês.',
          en_us: 'Historical maximum production line within the month.',
          de: 'Historische maximale Produktionslinie innerhalb eines Monats.',
        },
        medium: {
          pt_br: `Linha histórica de produção média dentro do mês.`,
          en_us: 'Historical average production line within the month.',
          de: 'Historische durchschnittliche Produktionslinie innerhalb des Monats.',
        },
      },
    },
    daily_deviation: {
      tooltips: {
        daily_deviation: {
          pt_br:
            'Desvio de produção (diferença) entre a meta de produção definida e a produção atual.',
          en_us:
            'Production deviation (difference) between the defined production target and the current production.',
          de: 'Produktionsabweichung (Differenz) zwischen dem definierten Produktionsziel und der aktuellen Produktion.',
        },
        expected_daily_deviation: {
          pt_br:
            'Quantidade baseada em modelo preditivo para a previsão da quantidade de veículos que poderão ser deixados de ser produzidos no dia de acordo com as condições da linha de produção.',
          en_us:
            'Quantity based on a predictive model for the forecast of the number of vehicles that can be stopped from being produced on the day according to the conditions of the production line.',
          de: 'Menge basierend auf einem Vorhersagemodell für die Vorhersage der Anzahl der Fahrzeuge, deren Produktion am Tag gemäß den Bedingungen der Produktionslinie gestoppt werden kann.',
        },
        minimum: {
          pt_br: 'Linha histórica de desvio mínimo dentro do mês.',
          en_us: 'Historical line of minimum deviation within the month.',
          de: 'Historische Linie der minimalen Abweichung innerhalb des Monats.',
        },
        maximum: {
          pt_br: 'Linha histórica de desvio máximo dentro do mês.',
          en_us: 'Historical line of maximum deviation within the month.',
          de: 'Historische Linie der maximalen Abweichung innerhalb des Monats.',
        },
        medium: {
          pt_br: `Linha histórica de desvio médio dentro do mês.`,
          en_us: 'Historical line of average deviation within the month.',
          de: 'Historische Linie der durchschnittlichen Abweichung innerhalb des Monats.',
        },
      },
    },
    line_stoppage_time: {
      tooltips: {
        accumulated_downtime: {
          pt_br:
            'Tempo em (minutos) que a linha de produção ficou parada no dia sendo ocasionadas por paradas do processo, simples parada ou por falha.',
          en_us:
            'Time in (minutes) that the production line was stopped in the day, caused by process stops, simple stop or failure.',
          de: 'Zeit in (Minuten), in der die Produktionslinie am Tag gestoppt wurde, verursacht durch Prozessstopps, einfaches Stoppen oder Versagen.',
        },
        minimum: {
          pt_br: 'Linha histórica de tempo de parada mínima dentro do mês.',
          en_us: 'Historical line of minimum downtime within the month.',
          de: 'Historische Linie der minimalen Ausfallzeiten innerhalb eines Monats.',
        },
        maximum: {
          pt_br: 'Linha histórica de tempo de parada máxima dentro do mês.',
          en_us: 'Historical line of maximum downtime within the month.',
          de: 'Historische Linie der maximalen Ausfallzeit innerhalb eines Monats.',
        },
        medium: {
          pt_br: `Linha histórica de tempo de parada média dentro do mês.`,
          en_us: 'Historical line of average downtime within the month.',
          de: 'Historische Linie der durchschnittlichen Ausfallzeiten innerhalb eines Monats.',
        },
      },
    },
    line_charts: {
      daily_production: {
        title: {
          pt_br: 'Produção diária',
          en_us: 'Daily Production',
          de: 'Tägliche Produktion',
        },
      },
    },
  },
  messages: {
    errors: {
      data: {
        pt_br: 'Desculpe, não foi possível carregar os dados da página',
        en_us: 'Sorry, the page data could not be loaded',
        de: 'Leider konnten die Seitendaten nicht geladen werden',
      },
    },
  },
};
