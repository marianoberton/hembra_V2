import { Proyecto } from '../types/proyectos';

export const proyectos: Proyecto[] = [
  {
    id: 'florero-betty',
    title: 'Florero Betty',
    subtitle: 'Diseño Sustentable',
    description: 'Las botellas de vino desechadas constituyen una gran parte de los residuos de vidrio de nuestro planeta. Pero, ¿y si pudiéramos darles una segunda vida y transformarlas en algo realmente hermoso? Nos enorgullece presentar nuestro tan preciado Florero Betty.',
    detailDescription: 'Las <strong>botellas de vino desechadas</strong> constituyen una gran parte de los residuos de vidrio de nuestro planeta. Pero, ¿y si pudiéramos darles una <strong>segunda vida</strong> y transformarlas en algo realmente hermoso? Nos enorgullece presentar nuestro tan preciado <strong>Florero Betty</strong>. Este jarrón no solo es una pieza decorativa, sino también un <strong>símbolo de sostenibilidad</strong> y compromiso social. Lo diseñamos bajo el concepto de <strong>upcycling</strong>, dándole un nuevo valor a materiales que de otra manera serían desechados. Esta elaborado <strong>100% a mano</strong>, su cuerpo está hecho a partir de botellas de vino reutilizadas, y su base se fabrica con <strong>retazos de chapa recuperada</strong> de chatarreras. Al reutilizar estas botellas, no solo estamos <strong>reduciendo significativamente los residuos</strong>, sino que también estamos creando <strong>oportunidades laborales</strong> en nuestra comunidad local. Trabajamos de cerca con una red de talleros en el conurbano y con la cooperativa Supercrea, quienes se encargan de proveernos estos envases de vidrio recuperados. Así, hemos logrado construir una <strong>red de actores comprometidos</strong> con el medio ambiente y el desarrollo social.',
    image: '/images/1. Florero Betty/Copia de Betty Vase Colours.jpg',
    gallery: [
      '/images/1. Florero Betty/Copia de FLorero Betty blanco.jpg',
      '/images/1. Florero Betty/IMG_0624-01.jpeg',
      '/images/1. Florero Betty/Copia de IMG_2753-01.jpeg',
      '/images/1. Florero Betty/Copia de CICLO FLORERO BETTY.jpg',
      '/images/1. Florero Betty/Copia de Betty Vase pink set.jpg'
    ],
    backgroundColor: '#b3c1a2',
    category: 'Decoración',
    year: '2024',
    collaborators: ['Cooperativa Super Crea'],
    materials: ['Vidrio recuperado', 'Metal oxidado', 'Elementos cerámicos'],
    process: ['Selección de materiales', 'Limpieza y acondicionamiento', 'Diseño y modelado', 'Ensamblaje artesanal'],
    impact: {
      environmental: 'Reduce residuos sólidos en un 85% por pieza producida',
      social: 'Genera trabajo para 3 artesanos locales',
      economic: 'Costo de producción 40% menor que materiales nuevos'
    },
    specifications: {
      dimensions: '25cm x 15cm x 30cm',
      weight: '1.2kg',
      colors: ['Natural', 'Verde oxidado', 'Terracota']
    },
    status: 'completed',
    featured: true
  },
  {
    id: 'linea-complementos-chapa',
    title: 'Línea de complementos de chapa',
    subtitle: 'Tradición Artesanal',
    description: 'Una colección que combina tradición artesanal y conciencia material: piezas creadas a partir de retazos recuperados, moldeadas en el torno por manos expertas y terminadas con la nobleza de un oficio transmitido por generaciones.',
    detailDescription: 'Una colección que combina <strong>tradición artesanal</strong> y conciencia material: piezas creadas a partir de <strong>retazos recuperados</strong>, moldeadas en el torno por manos expertas y terminadas con la nobleza de un oficio transmitido por generaciones.',
    image: '/images/2. Linea de Complementos en Chapa/IMG_1240.JPG',
    gallery: [
      '/images/2. Linea de Complementos en Chapa/IMG_1240.JPG',
      '/images/2. Linea de Complementos en Chapa/Copia de IMG_1216.JPG',
      '/images/2. Linea de Complementos en Chapa/Copia de IMG_1221.JPG',
      '/images/2. Linea de Complementos en Chapa/Copia de IMG_1279.JPG',
      '/images/2. Linea de Complementos en Chapa/Copia de IMG_1573-01.jpeg',
      '/images/2. Linea de Complementos en Chapa/IMG_0219-01.jpeg',
      '/images/2. Linea de Complementos en Chapa/IMG_1539-01.jpeg',
      '/images/2. Linea de Complementos en Chapa/Copia de 20201029_152255-1.jpg'
    ],
    backgroundColor: '#a8836d',
    category: 'Funcional',
    year: '2023',
    collaborators: ['Oscar - Maestro Repujador del Conurbano Bonaerense'],
    materials: ['Chapa recuperada de chatarreras', 'Pintura horneable', 'Técnica de torneado'],
    process: ['Cada objeto comienza con discos de chapa recuperada de chatarreras, moldeados en el torno hasta obtener formas limpias y volumétricas. El acabado final se realiza en talleres locales con pintura horneable que asegura color y durabilidad.'],
    impact: {
      environmental: 'Transformación de materiales descartados en elementos de valor',
      social: 'La colección nace en el taller de Oscar, maestro repujador del conurbano bonaerense. Su oficio, heredado de familia, mantiene viva la técnica del torneado de metales y otorga identidad única a cada pieza.',
      economic: 'Más que objetos complementarios, son piezas que dialogan entre el diseño contemporáneo y el respeto por el ciclo de los materiales, transformando lo descartado en elementos de valor y belleza perdurable.'
    },
    specifications: {
      dimensions: 'Variables según pieza',
      weight: '0.5kg - 2kg',
      colors: ['Acabados con pintura horneable', 'Colores diversos', 'Durabilidad garantizada']
    },
    status: 'completed',
    featured: true
  },
  {
    id: 'upcycled-luminarias',
    title: 'Upcycled Luminarias',
    subtitle: 'Iluminación Consciente',
    description: 'Lámparas y luminarias creadas con materiales reutilizados',
    detailDescription: 'Las <strong>Upcycled Luminarias</strong> transforman la iluminación doméstica en una <strong>declaración de sostenibilidad</strong>. Cada lámpara es una composición única de <strong>elementos recuperados</strong> que, lejos de ocultar su origen, celebra la <strong>belleza inherente de la transformación material</strong>.',
    image: '/images/upcycled-luminarias.JPG',
    gallery: ['/images/upcycled-luminarias.JPG', '/images/10work.avif', '/images/11work.avif'],
    backgroundColor: '#cedbbf',
    category: 'Iluminación',
    year: '2024',
    materials: ['Envases de vidrio', 'Componentes electrónicos recuperados', 'Estructuras metálicas recicladas'],
    process: ['Selección de envases', 'Acondicionamiento eléctrico', 'Diseño de estructura', 'Montaje final'],
    impact: {
      environmental: 'Evita el descarte de 200 envases de vidrio por mes',
      social: 'Capacita a 5 personas en técnicas de upcycling',
      economic: 'Precio 50% menor que luminarias convencionales'
    },
    specifications: {
      dimensions: '30cm x 30cm x 45cm (promedio)',
      weight: '2.5kg',
      colors: ['Transparente', 'Ámbar', 'Verde botella']
    },
    status: 'completed',
    featured: true
  },
  {
    id: 'cooperativa-superarte',
    title: 'Cooperativa Superarte',
    subtitle: 'Trabajo Colaborativo',
    description: 'Proyecto colaborativo con artesanos locales',
    detailDescription: 'Más que un proyecto de objetos, Cooperativa Superarte es una iniciativa de impacto social que conecta el diseño sustentable con la inclusión laboral. Trabajamos junto a personas en situación de vulnerabilidad para crear productos únicos mientras generamos oportunidades de desarrollo personal y económico.',
    image: '/images/cooperativa-superarte.JPG',
    gallery: ['/images/cooperativa-superarte.JPG', '/images/19work.avif', '/images/21work.avif'],
    backgroundColor: '#909b82',
    category: 'Social',
    year: '2023-2024',
    collaborators: ['Cooperativa Super Crea Quilmes', 'Fundación Incluir'],
    materials: ['Vidrio recuperado', 'Textiles reciclados', 'Maderas de descarte'],
    process: ['Capacitación inicial', 'Diseño participativo', 'Producción colaborativa', 'Comercialización justa'],
    impact: {
      environmental: 'Procesa 500kg de materiales reciclables mensuales',
      social: 'Incluye laboralmente a 12 personas',
      economic: 'Genera ingresos dignos para 12 familias'
    },
    status: 'in-progress',
    featured: true
  },
  {
    id: 'linea-vasos',
    title: 'Línea Vasos',
    subtitle: 'Vidrio Recuperado',
    description: 'Vasos y recipientes a partir de envases reutilizados',
    detailDescription: 'La Línea Vasos demuestra que la elegancia puede surgir de los materiales más comunes. Transformamos botellas y envases descartados en piezas únicas de vajilla, donde cada vaso conserva la historia de su forma original mientras adquiere una nueva función y estética.',
    image: '/images/linea-vasos.JPG',
    gallery: ['/images/linea-vasos.JPG', '/images/23work.avif', '/images/27work.avif'],
    backgroundColor: '#8e9d75',
    category: 'Vajilla',
    year: '2024',
    collaborators: ['Cooperativa Super Crea'],
    materials: ['Botellas de vidrio recuperadas', 'Envases diversos', 'Arena para pulido'],
    process: ['Recolección selectiva', 'Corte y modelado', 'Pulido artesanal', 'Control de calidad'],
    impact: {
      environmental: 'Desvía 1000 botellas mensuales de basurales',
      social: 'Capacita en oficios a 8 personas',
      economic: 'Productos 70% más económicos que vajilla nueva'
    },
    specifications: {
      capacity: '200ml - 500ml',
      weight: '150g - 300g',
      colors: ['Transparente', 'Verde', 'Ámbar', 'Azul']
    },
    status: 'completed',
    featured: true
  },
  {
    id: 'recap',
    title: 'RECAP',
    subtitle: 'Proyecto Integral',
    description: 'Síntesis de metodología y procesos sustentables',
    detailDescription: 'RECAP es la culminación conceptual de nuestro trabajo: un proyecto que recapitula y sistematiza nuestra metodología de upcycling, creando un manual de buenas prácticas replicable. Es tanto un producto físico como una herramienta pedagógica para democratizar el diseño sustentable.',
    image: '/images/recap.jpg',
    gallery: ['/images/recap.jpg', '/images/30work.avif', '/images/32work.avif'],
    backgroundColor: '#b2917e',
    category: 'Conceptual',
    year: '2024',
    materials: ['Materiales diversos recuperados', 'Documentación gráfica', 'Sistemas modulares'],
    process: ['Investigación metodológica', 'Sistematización de procesos', 'Prototipado', 'Documentación'],
    impact: {
      environmental: 'Metodología replicable para reducir residuos',
      social: 'Manual accesible para 100+ emprendedores',
      economic: 'Reduce costos de I+D en 80%'
    },
    status: 'in-progress',
    featured: true
  },
  {
    id: 'mesa-bea',
    title: 'Mesa Bea',
    subtitle: 'Mobiliario Upcycled',
    description: 'Mesa de diseño creada con materiales recuperados',
    detailDescription: 'La Mesa Bea representa el mobiliario upcycled en su máxima expresión. Cada elemento de su construcción proviene de materiales recuperados, creando una pieza que combina robustez estructural con una estética que celebra la historia de sus componentes.',
    image: '/images/mesa-bea.jpg',
    gallery: ['/images/mesa-bea.jpg', '/images/34work.avif', '/images/1work.avif'],
    backgroundColor: '#87986a',
    category: 'Mobiliario',
    year: '2023',
    materials: ['Madera recuperada', 'Estructuras metálicas recicladas', 'Herrajes reutilizados'],
    process: ['Selección estructural', 'Restauración de maderas', 'Soldadura y ensamble', 'Acabado protectivo'],
    impact: {
      environmental: 'Evita la tala de 0.5m³ de madera nueva',
      social: 'Involucra a carpinteros locales tradicionales',
      economic: 'Costo 55% menor que mobiliario nuevo'
    },
    specifications: {
      dimensions: '180cm x 90cm x 75cm',
      weight: '45kg',
      capacity: '8 personas'
    },
    status: 'completed',
    featured: true
  }
];