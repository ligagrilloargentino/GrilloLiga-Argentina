// Datos estáticos de la Grillo Liga: ligas, bancos de decisiones y palabras.
// No dependen de nada del resto del sitio, por eso se cargan aparte (mejor caché del navegador).

const BOT_APODOS = {
  'felipe': 'Pipe'
};

const AP_SITUACIONES = [
  { texto:'Recibís la pelota en el medio de la cancha.', opciones:[
    { etiqueta:'Pase seguro a {compañero}', puntos:5, tipo:null },
    { etiqueta:'Metés un pase filtrado para {compañero}', puntos:10, tipo:'asistencia' },
    { etiqueta:'Encarás vos mismo hacia el arco', puntos:15, tipo:'gol_vos' }
  ]},
  { texto:'Recuperás una pelota dividida cerca del área rival.', opciones:[
    { etiqueta:'La descargás simple', puntos:5, tipo:null },
    { etiqueta:'Se la dejás picando a {compañero}', puntos:10, tipo:'asistencia' },
    { etiqueta:'Le pegás de primera vos', puntos:15, tipo:'gol_vos' }
  ]},
  { texto:'Tenés la pelota con espacio por afuera del área.', opciones:[
    { etiqueta:'Retenés la pelota, jugás tranquilo', puntos:5, tipo:null },
    { etiqueta:'Centrás buscando a {compañero}', puntos:10, tipo:'asistencia' },
    { etiqueta:'Probás un remate de media distancia', puntos:15, tipo:'gol_vos' }
  ]},
  { texto:'{compañero} te devuelve la pelota cerca del área.', opciones:[
    { etiqueta:'La cuidás, no te arriesgás', puntos:5, tipo:null },
    { etiqueta:'Buscás a {compañero2} solo del otro lado', puntos:10, tipo:'asistencia' },
    { etiqueta:'Definís vos mismo', puntos:15, tipo:'gol_vos' }
  ]},
  { texto:'Contraataque: quedan pocos rivales atrás.', opciones:[
    { etiqueta:'Frenás la jugada, no hay apuro', puntos:5, tipo:null },
    { etiqueta:'Habilitás a {compañero} que corre solo', puntos:10, tipo:'asistencia' },
    { etiqueta:'Definís el mano a mano vos', puntos:15, tipo:'gol_vos' }
  ]},
  { texto:'Tiro libre a favor cerca del área rival.', opciones:[
    { etiqueta:'La jugás corta', puntos:5, tipo:null },
    { etiqueta:'Centrás al área para {compañero}', puntos:10, tipo:'asistencia' },
    { etiqueta:'Pateás directo al arco', puntos:15, tipo:'gol_vos' }
  ]},
  { texto:'{compañero} pide la pelota picando al espacio.', opciones:[
    { etiqueta:'Se la das simple', puntos:5, tipo:null },
    { etiqueta:'Le das el pase justo para que defina', puntos:10, tipo:'asistencia_companero' },
    { etiqueta:'Preferís seguir vos con la jugada', puntos:15, tipo:'gol_vos' }
  ]},
  { texto:'Córner a favor.', opciones:[
    { etiqueta:'Centro simple al medio del área', puntos:5, tipo:null },
    { etiqueta:'Buscás la cabeza de {compañero}', puntos:10, tipo:'asistencia' },
    { etiqueta:'Rematás vos del segundo palo', puntos:15, tipo:'gol_vos' }
  ]},
  { texto:'Rebote suelto dentro del área rival.', opciones:[
    { etiqueta:'La sacás afuera del área, sin riesgo', puntos:5, tipo:null },
    { etiqueta:'La bajás para {compañero}', puntos:10, tipo:'asistencia' },
    { etiqueta:'Definís de primera vos', puntos:15, tipo:'gol_vos' }
  ]},
  { texto:'Último minuto del partido, todo puede pasar.', opciones:[
    { etiqueta:'Jugás con calma para cuidar la pelota', puntos:5, tipo:null },
    { etiqueta:'Buscás a {compañero} con un pase largo', puntos:10, tipo:'asistencia' },
    { etiqueta:'Te tirás al ataque con todo', puntos:15, tipo:'gol_vos' }
  ]},
  { texto:'{compañero} te hace un caño y sigue de largo.', opciones:[
    { etiqueta:'Volvés a marcar tu posición', puntos:5, tipo:null },
    { etiqueta:'Le devolvés la pared para que siga', puntos:10, tipo:'asistencia_companero' },
    { etiqueta:'Vas por afuera a buscar el rebote vos', puntos:15, tipo:'gol_vos' }
  ]},
  { texto:'Doble pared con {compañero} en la mitad de la cancha.', opciones:[
    { etiqueta:'Cortás la jugada, no arriesgás', puntos:5, tipo:null },
    { etiqueta:'Seguís la pared para {compañero2}', puntos:10, tipo:'asistencia' },
    { etiqueta:'Rompés hacia el arco vos', puntos:15, tipo:'gol_vos' }
  ]}
];

const CR_SITUACIONES = [
  { titulo:'Recibís la pelota en el medio', texto:'Tenés espacio para jugar.', posiciones:['delantero','mediocampista','defensor'], opciones:[
    { etiqueta:'Pase simple', atributo:'pase', prob:0.85, puntosExito:5, puntosFallo:-2 },
    { etiqueta:'Gambetear a un rival', atributo:'regate', prob:0.5, puntosExito:15, puntosFallo:-5 },
    { etiqueta:'Pared con un compañero', atributo:'pase', prob:0.7, puntosExito:10, puntosFallo:-3 }
  ]},
  { titulo:'Mano a mano con el arquero', texto:'Quedaste solo frente al arco.', posiciones:['delantero','mediocampista'], opciones:[
    { etiqueta:'Definir cruzado', atributo:'definicion', prob:0.55, puntosExito:25, puntosFallo:-8 },
    { etiqueta:'Picarla por arriba', atributo:'definicion', prob:0.4, puntosExito:30, puntosFallo:-10 },
    { etiqueta:'Pasarla a un compañero solo', atributo:'pase', prob:0.75, puntosExito:15, puntosFallo:-3 }
  ]},
  { titulo:'Te marcan de cerca en el área rival', texto:'Un defensor te pisa los talones.', posiciones:['delantero','mediocampista'], opciones:[
    { etiqueta:'Aguantar la pelota', atributo:'regate', prob:0.6, puntosExito:10, puntosFallo:-5 },
    { etiqueta:'Probar una rabona', atributo:'regate', prob:0.3, puntosExito:25, puntosFallo:-10 },
    { etiqueta:'Devolverla atrás', atributo:'pase', prob:0.9, puntosExito:3, puntosFallo:0 }
  ]},
  { titulo:'Contraataque 2 contra 1', texto:'Salís rápido con un compañero.', posiciones:['delantero','mediocampista'], opciones:[
    { etiqueta:'Pasar al compañero libre', atributo:'pase', prob:0.7, puntosExito:18, puntosFallo:-5 },
    { etiqueta:'Definir vos mismo', atributo:'definicion', prob:0.45, puntosExito:22, puntosFallo:-8 }
  ]},
  { titulo:'El rival avanza con la pelota', texto:'Tenés que decidir cómo frenarlo.', posiciones:['defensor','mediocampista'], opciones:[
    { etiqueta:'Entrada fuerte', atributo:'defensa', prob:0.5, puntosExito:15, puntosFallo:-10 },
    { etiqueta:'Marca de contención', atributo:'defensa', prob:0.75, puntosExito:10, puntosFallo:-3 },
    { etiqueta:'Cubrir el espacio', atributo:'velocidad', prob:0.85, puntosExito:6, puntosFallo:-1 }
  ]},
  { titulo:'Tiro libre a favor, cerca del área', texto:'Te toca patear.', posiciones:['delantero','mediocampista','defensor'], opciones:[
    { etiqueta:'Buscar el ángulo', atributo:'definicion', prob:0.4, puntosExito:25, puntosFallo:-8 },
    { etiqueta:'Pasarla corta', atributo:'pase', prob:0.7, puntosExito:10, puntosFallo:-3 },
    { etiqueta:'Centrar al área', atributo:'pase', prob:0.6, puntosExito:15, puntosFallo:-5 }
  ]},
  { titulo:'Córner a favor', texto:'Se viene el centro.', posiciones:['delantero','mediocampista','defensor'], opciones:[
    { etiqueta:'Cabecear al primer palo', atributo:'definicion', prob:0.5, puntosExito:18, puntosFallo:-5 },
    { etiqueta:'Quedarte afuera por el rebote', atributo:'velocidad', prob:0.65, puntosExito:10, puntosFallo:-3 }
  ]},
  { titulo:'Rebote suelto en el área rival', texto:'La pelota queda picando.', posiciones:['delantero','mediocampista'], opciones:[
    { etiqueta:'Remate de primera', atributo:'definicion', prob:0.45, puntosExito:22, puntosFallo:-8 },
    { etiqueta:'Controlar y definir', atributo:'regate', prob:0.6, puntosExito:18, puntosFallo:-6 }
  ]},
  { titulo:'Estás cansado, quedan pocos minutos', texto:'El partido se define ahora.', posiciones:CR_POSICIONES_TODAS, opciones:[
    { etiqueta:'Seguir exigiéndote', atributo:'velocidad', prob:0.5, puntosExito:15, puntosFallo:-8 },
    { etiqueta:'Jugar simple y cuidar la pelota', atributo:'pase', prob:0.8, puntosExito:6, puntosFallo:-2 }
  ]},
  { titulo:'Pelota dividida en el medio', texto:'Los dos van con todo.', posiciones:['mediocampista','defensor','delantero'], opciones:[
    { etiqueta:'Entrar decidido', atributo:'defensa', prob:0.55, puntosExito:12, puntosFallo:-6 },
    { etiqueta:'Anticipar con inteligencia', atributo:'defensa', prob:0.7, puntosExito:10, puntosFallo:-3 }
  ]},
  { titulo:'Espacio para pegarle de media distancia', texto:'Nadie te presiona todavía.', posiciones:['delantero','mediocampista','defensor'], opciones:[
    { etiqueta:'Probar el remate', atributo:'definicion', prob:0.35, puntosExito:25, puntosFallo:-8 },
    { etiqueta:'Buscar mejor posición', atributo:'pase', prob:0.65, puntosExito:10, puntosFallo:-3 }
  ]},
  { titulo:'Último minuto, tu equipo necesita un gol', texto:'Se juega todo o nada.', posiciones:['delantero','mediocampista'], opciones:[
    { etiqueta:'Tirarte al ataque con todo', atributo:'velocidad', prob:0.4, puntosExito:25, puntosFallo:-10 },
    { etiqueta:'Jugar con cabeza fría', atributo:'pase', prob:0.65, puntosExito:12, puntosFallo:-4 }
  ]},
  { titulo:'El árbitro cobra una infracción dudosa a tu favor', texto:'Estás cerca del área rival.', posiciones:CR_POSICIONES_TODAS, opciones:[
    { etiqueta:'Discutirle para sacar tarjeta', atributo:null, prob:0.35, puntosExito:10, puntosFallo:-15 },
    { etiqueta:'Enfocarte en el próximo lance', atributo:null, prob:0.9, puntosExito:3, puntosFallo:0 }
  ]},
  { titulo:'Remate cruzado al ángulo', texto:'El rival define fuerte al palo.', posiciones:['arquero'], opciones:[
    { etiqueta:'Estirarte al palo', atributo:'defensa', prob:0.5, puntosExito:20, puntosFallo:-10 },
    { etiqueta:'Achicar el ángulo antes', atributo:'defensa', prob:0.65, puntosExito:12, puntosFallo:-6 }
  ]},
  { titulo:'Mano a mano con el delantero rival', texto:'Se te viene solo.', posiciones:['arquero'], opciones:[
    { etiqueta:'Salir a cerrarle el ángulo', atributo:'defensa', prob:0.55, puntosExito:18, puntosFallo:-8 },
    { etiqueta:'Quedarte parado esperando', atributo:'defensa', prob:0.4, puntosExito:12, puntosFallo:-10 }
  ]},
  { titulo:'Centro peligroso al área chica', texto:'Viene un centro pasado.', posiciones:['arquero'], opciones:[
    { etiqueta:'Salir a trabar el centro', atributo:'defensa', prob:0.5, puntosExito:18, puntosFallo:-8 },
    { etiqueta:'Quedarte en la línea', atributo:'defensa', prob:0.7, puntosExito:10, puntosFallo:-4 }
  ]},
  { titulo:'El rival te encara en velocidad por la banda', texto:'Vas a tener que resolverlo solo.', posiciones:['defensor'], opciones:[
    { etiqueta:'Anticipar el pase', atributo:'defensa', prob:0.6, puntosExito:15, puntosFallo:-6 },
    { etiqueta:'Ir al piso', atributo:'defensa', prob:0.4, puntosExito:20, puntosFallo:-12 },
    { etiqueta:'Achicar el espacio', atributo:'velocidad', prob:0.75, puntosExito:8, puntosFallo:-2 }
  ]},
  { titulo:'Pelota aérea disputada en tu área', texto:'Se viene un centro largo.', posiciones:['defensor'], opciones:[
    { etiqueta:'Ir fuerte al cabezazo', atributo:'defensa', prob:0.55, puntosExito:15, puntosFallo:-8 },
    { etiqueta:'Achicarle el salto al rival', atributo:'defensa', prob:0.7, puntosExito:10, puntosFallo:-3 }
  ]}
];

const CR_PAISES_MUNDIAL = ['Argentina','Uruguay','Brasil','Bolivia','Chile','Paraguay','Perú','Ecuador','Colombia','Venezuela','Estados Unidos','México','España','Portugal','Francia','Alemania','Inglaterra','Italia','Holanda'];

const CR_BENEFICIOS = [
  { key:'entrenador', etiqueta:'🏋️ Entrenador personal', costo:10 },
  { key:'gimnasio', etiqueta:'🏟️ Gimnasio propio', costo:20 },
  { key:'kinesiologo', etiqueta:'🩹 Kinesiólogo', costo:30 },
  { key:'nutricionista', etiqueta:'🥗 Nutricionista', costo:40 },
  { key:'psicologo', etiqueta:'🧠 Psicólogo', costo:50 },
  { key:'chef', etiqueta:'👨‍🍳 Chef personal', costo:60 },
  { key:'chofer', etiqueta:'🚗 Chofer', costo:70 },
  { key:'abogado', etiqueta:'⚖️ Abogado', costo:80 },
  { key:'contador', etiqueta:'🧾 Contador', costo:90 },
  { key:'asistente', etiqueta:'🗂️ Asistente personal', costo:100 }
];

const CR_DECISIONES_IMAGEN = [
  { texto:'Un periodista te pregunta tu opinión sobre el gobierno.', opciones:[
    { etiqueta:'Prefiero no meterme en política', mediaMin:2, mediaMax:2 },
    { etiqueta:'Doy mi opinión sin filtro', mediaMin:-8, mediaMax:8 },
    { etiqueta:'Hablo de la difícil situación de los clubes chicos', mediaMin:4, mediaMax:6 }
  ]},
  { texto:'Te invitan a un evento de música muy concurrido.', opciones:[
    { etiqueta:'Voy y me muestro cercano con la gente', mediaMin:3, mediaMax:5 },
    { etiqueta:'Rechazo la invitación, prefiero entrenar', mediaMin:1, mediaMax:1 },
    { etiqueta:'Voy y se me escapa un exceso menor', mediaMin:-7, mediaMax:-4 }
  ]},
  { texto:'El cuerpo técnico te ofrece entrenar el doble esta semana.', opciones:[
    { etiqueta:'Acepto, aunque termine agotado', mediaMin:2, mediaMax:4 },
    { etiqueta:'Prefiero descansar bien', mediaMin:1, mediaMax:1 }
  ]},
  { texto:'Los hinchas te esperan afuera del predio para saludarte.', opciones:[
    { etiqueta:'Me quedo a firmar autógrafos y sacarme fotos', mediaMin:5, mediaMax:7 },
    { etiqueta:'Me voy rápido, estoy muy cansado', mediaMin:-4, mediaMax:-2 }
  ]},
  { texto:'El presidente del club toma una decisión que no te gusta.', opciones:[
    { etiqueta:'Lo critico públicamente', mediaMin:-10, mediaMax:10 },
    { etiqueta:'Hablo con él en privado', mediaMin:3, mediaMax:5 },
    { etiqueta:'Me quedo callado', mediaMin:0, mediaMax:0 }
  ]},
  { texto:'Un sponsor te ofrece un contrato publicitario.', opciones:[
    { etiqueta:'Acepto el contrato', mediaMin:3, mediaMax:6 },
    { etiqueta:'Rechazo para enfocarme solo en lo deportivo', mediaMin:1, mediaMax:2 }
  ]},
  { texto:'Te invitan a una nota en un programa muy visto.', opciones:[
    { etiqueta:'Voy con humor y soltura', mediaMin:5, mediaMax:8 },
    { etiqueta:'Voy pero se me nota incómodo', mediaMin:-3, mediaMax:-1 },
    { etiqueta:'Rechazo la nota', mediaMin:0, mediaMax:0 }
  ]},
  { texto:'Un compañero tuyo está pasando un momento personal difícil.', opciones:[
    { etiqueta:'Lo apoyo públicamente', mediaMin:4, mediaMax:6 },
    { etiqueta:'No me meto, es su tema', mediaMin:0, mediaMax:0 }
  ]},
  { texto:'Te preguntan por el clásico rival del club.', opciones:[
    { etiqueta:'Respondo con respeto', mediaMin:2, mediaMax:3 },
    { etiqueta:'Tiro punta con humor', mediaMin:-5, mediaMax:5 }
  ]},
  { texto:'Venís de una racha floja de resultados.', opciones:[
    { etiqueta:'Me disculpo públicamente con los hinchas', mediaMin:3, mediaMax:5 },
    { etiqueta:'Me defiendo, no es solo mi culpa', mediaMin:-4, mediaMax:-2 }
  ]}
];

const CR_LIGAS = {
  arg1: { nombre:'Primera División', pais:'Argentina', prestigio:3, clubes:['Boca Juniors','River Plate','Racing Club','Independiente','San Lorenzo','Huracán','Vélez Sarsfield','Talleres','Estudiantes (LP)','Gimnasia y Esgrima (LP)','Lanús','Argentinos Juniors','Platense','Tigre',"Newell's Old Boys",'Rosario Central','Belgrano','Instituto','Atlético Tucumán','Central Córdoba (SdE)','Barracas Central','Deportivo Riestra','Unión','Sarmiento (Junín)','Aldosivi','Banfield','Independiente Rivadavia','Gimnasia (Mendoza)','Estudiantes (Río Cuarto)','Defensa y Justicia'] },
  arg2: { nombre:'Primera Nacional', pais:'Argentina', prestigio:2, clubes:['Quilmes','Chacarita Juniors','Atlético de Rafaela','Nueva Chicago','Ferro Carril Oeste','All Boys','Almagro','Almirante Brown','Los Andes','Deportivo Morón','Atlanta','Temperley','Arsenal','Colón','Defensores de Belgrano','Villa Dálmine','San Martín (SJ)','San Martín (T)','Brown (Adrogué)','Guillermo Brown'] },
  arg3: { nombre:'Primera B Metropolitana', pais:'Argentina', prestigio:1, clubes:['Deportivo Español','Cañuelas','Excursionistas','Comunicaciones','Argentino de Merlo','Deportivo Armenio','Sacachispas','UAI Urquiza','Berazategui','Liniers','Justo José de Urquiza','Fénix','Central Córdoba (Rosario)','Dock Sud','Victoriano Arenas','Muñiz'] },
  bra: { nombre:'Brasileirão Série A', pais:'Brasil', prestigio:3, clubes:['Flamengo','Palmeiras','São Paulo','Corinthians','Grêmio','Internacional','Atlético Mineiro','Cruzeiro','Fluminense','Botafogo','Vasco da Gama','Santos','Bahia','Fortaleza','Athletico Paranaense','Red Bull Bragantino','Ceará','Vitória','Criciúma','Juventude'] },
  uru: { nombre:'Primera División', pais:'Uruguay', prestigio:2, clubes:['Peñarol','Nacional','Defensor Sporting','Danubio','Liverpool','Cerro','River Plate (Montevideo)','Wanderers','Rentistas','Boston River','Progreso','Cerro Largo','Plaza Colonia'] },
  par: { nombre:'División Profesional', pais:'Paraguay', prestigio:1, clubes:['Olimpia','Cerro Porteño','Libertad','Guaraní','Nacional','Sportivo Luqueño','Sol de América','General Díaz','Sportivo Trinidense','Ameliano','12 de Octubre'] },
  chi: { nombre:'Primera División', pais:'Chile', prestigio:2, clubes:['Colo-Colo','Universidad de Chile','Universidad Católica','Cobresal','Palestino','Unión Española','Huachipato','Audax Italiano',"O'Higgins",'Everton (Viña del Mar)','Coquimbo Unido','Ñublense','Deportes La Serena'] },
  bol: { nombre:'División Profesional', pais:'Bolivia', prestigio:1, clubes:['Bolívar','The Strongest','Blooming','Always Ready','Wilstermann','Nacional Potosí','Guabirá','Independiente Petrolero','Real Santa Cruz','Real Tomayapo'] },
  per: { nombre:'Liga 1', pais:'Perú', prestigio:1, clubes:['Universitario','Alianza Lima','Sporting Cristal','Melgar','Cienciano','Cusco FC','Sport Boys','ADT','César Vallejo','Deportivo Garcilaso'] },
  ecu: { nombre:'Serie A', pais:'Ecuador', prestigio:2, clubes:['Barcelona SC','Emelec','Liga de Quito','Independiente del Valle','Aucas','Universidad Católica','Delfín','El Nacional','Macará','Deportivo Cuenca'] },
  col: { nombre:'Primera A', pais:'Colombia', prestigio:2, clubes:['Millonarios','Atlético Nacional','América de Cali','Junior de Barranquilla','Deportivo Cali','Independiente Santa Fe','Once Caldas','Deportivo Pereira','Águilas Doradas','Atlético Bucaramanga'] },
  ven: { nombre:'Primera División', pais:'Venezuela', prestigio:1, clubes:['Deportivo Táchira','Caracas FC','Estudiantes de Mérida','Metropolitanos','Zamora','Monagas','Deportivo La Guaira','Academia Puerto Cabello','Carabobo','Portuguesa'] },
  mls: { nombre:'MLS', pais:'Estados Unidos', prestigio:2, clubes:['Inter Miami','LA Galaxy','LAFC','Seattle Sounders','Atlanta United','NYCFC','New York Red Bulls','Columbus Crew','Philadelphia Union','Portland Timbers','Toronto FC','Orlando City'] },
  mex: { nombre:'Liga MX', pais:'México', prestigio:3, clubes:['Club América','Chivas Guadalajara','Cruz Azul','Pumas UNAM','Monterrey','Tigres UANL','Santos Laguna','Toluca','León','Pachuca','Atlas','Necaxa'] },
  esp: { nombre:'LaLiga', pais:'España', prestigio:3, clubes:['Real Madrid','Barcelona','Atlético de Madrid','Sevilla','Real Sociedad','Athletic Bilbao','Real Betis','Villarreal','Valencia','Celta de Vigo','Osasuna','Girona','Rayo Vallecano','Getafe','Mallorca'] },
  por: { nombre:'Primeira Liga', pais:'Portugal', prestigio:3, clubes:['Benfica','Porto','Sporting CP','Braga','Vitória de Guimarães','Boavista','Famalicão','Rio Ave','Gil Vicente','Estoril'] },
  ita: { nombre:'Serie A', pais:'Italia', prestigio:3, clubes:['Juventus','Inter de Milán','AC Milan','Napoli','Roma','Lazio','Atalanta','Fiorentina','Bologna','Torino','Udinese','Sassuolo'] },
  ing: { nombre:'Premier League', pais:'Inglaterra', prestigio:3, clubes:['Manchester City','Manchester United','Liverpool','Arsenal','Chelsea','Tottenham Hotspur','Newcastle United','Aston Villa','West Ham United','Brighton','Everton','Crystal Palace'] },
  fra: { nombre:'Ligue 1', pais:'Francia', prestigio:3, clubes:['Paris Saint-Germain','Marsella','Mónaco','Lyon','Lille','Niza','Rennes','Lens','Nantes','Toulouse'] },
  ale: { nombre:'Bundesliga', pais:'Alemania', prestigio:3, clubes:['Bayern Múnich','Borussia Dortmund','RB Leipzig','Bayer Leverkusen','Eintracht Frankfurt','VfB Stuttgart','Borussia Mönchengladbach','Wolfsburgo','Union Berlin','Friburgo','Hoffenheim','Werder Bremen'] },
  hol: { nombre:'Eredivisie', pais:'Holanda', prestigio:2, clubes:['Ajax','PSV Eindhoven','Feyenoord','AZ Alkmaar','FC Twente','FC Utrecht','Vitesse','Heerenveen','Go Ahead Eagles','NEC Nijmegen'] }
};

const CR_LIGAS_PRIMER_CONTRATO = ['arg1','uru','bra','bol','chi','par','per','ecu','col','ven','mls','mex'];

const CR_LIGAS_EUROPA = ['esp','por','fra','ale','ing','ita','hol'];

