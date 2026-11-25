// Menu data. Each item: [name, description, price]. Price "gratis" shows as free.
// "wide: true" makes the category span the full width with two columns.
export const menu = [
  {
    cat: 'Pizza', wide: true, items: [
      ['Margherita', 'Tomatensaus, mozzarella, basilicum', '12'],
      ['Margherita met Bufala', 'Tomatensaus, mozzarella di bufala, basilicum', '13'],
      ['Hawaï', 'Tomatensaus, mozzarella, prosciutto, ananas', '14'],
      ['Calzone', 'Gesloten pizza · tomatensaus, mozzarella, prosciutto, champignons', '14'],
      ['Prosciutto Cotto', 'Tomatensaus, mozzarella, prosciutto cotto, oregano', '13'],
      ['Pizza met Kip', 'Roomsaus, mozzarella, kip, champignons, uien', '17'],
      ['Delizia', 'Tomatensaus, mozzarella, prosciutto, blauwe kaas, oregano', '14'],
      ['Funghi', 'Tomatensaus, mozzarella, champignons, oregano', '13'],
      ['Salami', 'Tomatensaus, mozzarella, salami, oregano', '14'],
      ['Salami Piccante', 'Tomatensaus, mozzarella, pikante salami, oregano', '14'],
      ['Romana', 'Tomatensaus, mozzarella, prosciutto, champignons, oregano', '14'],
      ['Quattro Stagioni', 'Tomatensaus, mozzarella, prosciutto, champignons, artisjokken, olijven, oregano', '15'],
      ['Quattro Formaggi', 'Roomsaus, mozzarella, parmezaan, gorgonzola, blauwe kaas', '14,50'],
      ['Siciliana', 'Tomatensaus, mozzarella, ansjovis, parmezaan, olijven, kappertjes', '14'],
      ['Scampi', "Roomsaus, mozzarella, scampi's, knoflookolie", '17'],
      ['Carbonara', 'Roomsaus, mozzarella, parmezaan, pancetta, kwarteleidooier', '16'],
      ['San Daniele', 'Tomatensaus, mozzarella, parmaham, rucola, parmezaan', '16'],
      ['Parma', 'Tomatensaus, mozzarella, rucola, parmaham, parmezaan, cherrytomaatjes, bocconcini di bufala, balsamicosaus', '17'],
      ['Diavola Rossa', 'Roomsaus, mozzarella, gorgonzola, pikante salami, parmezaan', '16'],
      ['Pizza met Groenten', 'Tomatensaus, mozzarella, spinazie, aubergines, champignons, olijven', '15'],
      ['Vegetariana', 'Tomatensaus, mozzarella, kappertjes, spinazie, aubergines, artisjokken', '15'],
      ['Burrata', 'Tomatensaus, mozzarella, rucola, parmaham, parmezaan, cherrytomaatjes, burrata', '17'],
      ['Stracciatella', 'Tomatensaus, mozzarella, rucola, parmaham, parmezaan, cherrytomaatjes, stracciatella', '17'],
      ['Frutti di Mare', 'Roomsaus, mozzarella, zeevruchten, knoflookolie', '16'],
      ['Tonno', 'Tomatensaus, mozzarella, tonijn, ui', '14'],
    ],
  },
  {
    cat: 'Speciale', wide: true, items: [
      ['Pizza N°1', 'Roomsaus, mozzarella, salsiccia, pancetta, champignons, parmezaan', '17'],
      ['Pizza N°33', 'Tomatensaus, mozzarella, prosciutto, salami, pancetta', '16'],
      ['Pizza van Nonna Lucrezia', 'Tomatensaus, mozzarella, parmaham, rucola, bocconcini di bufala, zongedroogde tomaten, parmezaan', '17'],
      ['Salsiccia', 'Italiaanse varkensworst · roomsaus, mozzarella, salsiccia, friarielli, parmezaan', '16'],
      ['Mortadella Pesto', 'Tomatensaus, mozzarella, mortadella, parmezaan, pesto, burrata', '17'],
      ['Mortadella Pistache', 'Roomsaus, mozzarella, rucola, mortadella, parmezaan, burrata, pistache', '17'],
      ['Tartufo', 'Roomsaus, mozzarella, parmezaan, gorgonzola, truffel, champignons', '17'],
      ['Tartufo di Parma', 'Truffelcrème, mozzarella, parmaham, burrata, parmezaan', '18'],
    ],
  },
  {
    cat: 'Bruschetta', items: [
      ['Met parmaham', '', '12,50'],
      ['Met mortadella', '', '12,50'],
      ['Met cherrytomaatjes', '', '10'],
    ],
  },
  {
    cat: "Extra's", items: [
      ['Olijfolie met kruiden & knoflook', '', 'gratis'],
      ['Extra ingrediënt', '', '1,50'],
      ['Extra parmaham', '', '2,50'],
      ['Extra scampi', 'Per stuk', '1,50'],
    ],
  },
  {
    cat: 'Desserts', items: [
      ['Cannolo Siciliano', '', '7'],
      ['Cannolo met chocoladeknopjes', '', '7'],
      ['Tiramisu', '', '8'],
    ],
  },
];
