export type Categoria = 'alitas' | 'carnes' | 'tajadas' | 'pupusas' | 'bebidas' | 'promos';

export interface ItemMenu {
  id: string;
  categoria: Categoria;
  nombre: string;
  descripcion: string;
  precio: number;
  acompañamientos?: string[];
  dia?: string;
  spice?: 'mild' | 'medium' | 'hot';
  emoji: string;
  gradientFrom: string;
  gradientTo: string;
}

export const MENU_ITEMS: ItemMenu[] = [
  // Alitas
  {
    id: 'alitas-6',
    categoria: 'alitas',
    nombre: '6 Alitas',
    descripcion: 'Crujientes y jugosas. BB o Búfalo a tu elección.',
    precio: 180,
    spice: 'medium',
    emoji: '🍗',
    gradientFrom: '#2A1400',
    gradientTo: '#E85D04',
  },
  {
    id: 'alitas-12',
    categoria: 'alitas',
    nombre: '12 Alitas',
    descripcion: 'La porción grande para compartir. BB o Búfalo.',
    precio: 320,
    spice: 'medium',
    emoji: '🍗',
    gradientFrom: '#1A0A00',
    gradientTo: '#C1121F',
  },
  // Carnes
  {
    id: 'carne-cerdo-chorizo',
    categoria: 'carnes',
    nombre: 'Carne de Cerdo con Chorizo',
    descripcion: 'Carne de asada de cerdo y chorizo a la parrilla.',
    precio: 160,
    acompañamientos: ['Tajadas', 'Frijoles fritos', 'Encurtido', 'Aderezos'],
    emoji: '🥩',
    gradientFrom: '#1A0800',
    gradientTo: '#8B3A0F',
  },
  {
    id: 'chuleta-chorizo',
    categoria: 'carnes',
    nombre: 'Chuleta Asada con Chorizo',
    descripcion: 'Chuleta asada a la perfección con chorizo artesanal.',
    precio: 160,
    acompañamientos: ['Tajadas', 'Frijoles fritos', 'Encurtido', 'Aderezos'],
    emoji: '🍖',
    gradientFrom: '#200A00',
    gradientTo: '#7A2B00',
  },
  // Tajadas
  {
    id: 'tajadas-preparadas',
    categoria: 'tajadas',
    nombre: 'Tajadas Preparadas',
    descripcion: 'Tajadas fritas servidas con todos los extras de la casa.',
    precio: 90,
    acompañamientos: ['Carne molida', 'Ensalada', 'Encurtido', 'Aderezo'],
    emoji: '🍌',
    gradientFrom: '#1A1400',
    gradientTo: '#856404',
  },
  // Pupusas
  {
    id: 'pupusas-quesillo',
    categoria: 'pupusas',
    nombre: '3 Pupusas de Quesillo',
    descripcion: 'Rellenas de quesillo derretido. Especial Mié y Jue.',
    precio: 100,
    acompañamientos: ['Salsa', 'Ensalada', 'Encurtido'],
    dia: 'Mié / Jue',
    emoji: '🫓',
    gradientFrom: '#1A1200',
    gradientTo: '#6B4C00',
  },
  {
    id: 'pupusas-chicharron',
    categoria: 'pupusas',
    nombre: '3 Pupusas de Chicharrón',
    descripcion: 'Rellenas de chicharrón crujiente. Especial Mié y Jue.',
    precio: 110,
    acompañamientos: ['Salsa', 'Ensalada', 'Encurtido'],
    dia: 'Mié / Jue',
    emoji: '🫓',
    gradientFrom: '#200E00',
    gradientTo: '#7A3800',
  },
  // Bebidas
  {
    id: 'refresco',
    categoria: 'bebidas',
    nombre: 'Refresco Portátil',
    descripcion: 'Refrescos bien fríos para acompañar tu comida.',
    precio: 30,
    emoji: '🥤',
    gradientFrom: '#001A12',
    gradientTo: '#00572E',
  },
  // Promos
  {
    id: 'promo-viernes-chuleta',
    categoria: 'promos',
    nombre: '2 Platos: Chuleta con Chorizo',
    descripcion: 'Dos chuletas asadas con chorizo. ¡Solo los viernes!',
    precio: 300,
    acompañamientos: ['Tajadas', 'Frijoles fritos', 'Encurtido', 'Aderezos'],
    dia: 'Viernes',
    emoji: '🎉',
    gradientFrom: '#1A0400',
    gradientTo: '#8B0000',
  },
  {
    id: 'promo-viernes-carne',
    categoria: 'promos',
    nombre: '2 Platos: Carne de Cerdo con Chorizo',
    descripcion: 'Dos platos de carne de cerdo + chorizo. Solo los viernes.',
    precio: 300,
    acompañamientos: ['Tajadas', 'Frijoles fritos', 'Encurtido', 'Aderezos'],
    dia: 'Viernes',
    emoji: '🎉',
    gradientFrom: '#1A0600',
    gradientTo: '#7A1F00',
  },
  {
    id: 'promo-miercoles-14',
    categoria: 'promos',
    nombre: '14 Alitas BB o Búfalo',
    descripcion: 'La promo del miércoles y jueves para compartir.',
    precio: 300,
    acompañamientos: ['Papas', 'Kétchup', 'Aderezo de la casa'],
    dia: 'Mié / Jue',
    spice: 'medium',
    emoji: '🔥',
    gradientFrom: '#200800',
    gradientTo: '#C1121F',
  },
  {
    id: 'promo-miercoles-7',
    categoria: 'promos',
    nombre: '7 Alitas BB o Búfalo',
    descripcion: 'Promo personal de miércoles y jueves.',
    precio: 180,
    acompañamientos: ['Papas', 'Kétchup', 'Aderezo de la casa'],
    dia: 'Mié / Jue',
    spice: 'medium',
    emoji: '🔥',
    gradientFrom: '#1A0600',
    gradientTo: '#E85D04',
  },
];

export const CATEGORIAS: { id: Categoria | 'todos'; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'alitas', label: 'Alitas' },
  { id: 'carnes', label: 'Carnes' },
  { id: 'tajadas', label: 'Tajadas' },
  { id: 'pupusas', label: 'Pupusas' },
  { id: 'bebidas', label: 'Bebidas' },
  { id: 'promos', label: 'Promos ⚡' },
];
