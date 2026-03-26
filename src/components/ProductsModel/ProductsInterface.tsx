export interface Product {
  id: number;
  name: string;
  price: number;
  image: string; // La ruta relativa a /public
}
export const productsData: Product[] = [
  {
    id: 1,
    name: "A veces - Espinoza Paz",
    price: 600.00,
    image: "/album.jpg" 
  },
  {
    id: 2,
    name: "FunkoPop - Suguru Geto",
    price: 459.00,
    image: "/funko.webp"
  },
  {
    id: 3,
    name: "Apple - MacBook Pro",
    price: 44000.00,
    image: "/macbook.webp"
  },
   {
    id: 4,
    name: "Sony - Playstation 5",
    price: 11999.00,
    image: "/ps5.webp"
  },
  {
    id: 5,
    name: "Capcom - Resident Evil Réquiem",
    price: 1600.00,
    image: "/requiem.webp"
  },
  {
    id: 6,
    name: "Tecate - Titanium 12 Pack",
    price: 160.00,
    image: "/titanium.jpg"
  },
];