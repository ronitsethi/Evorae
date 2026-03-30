export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Apparel' | 'Jewellery';
  images: string[];
  description: string;
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Summer Breath Cotton Tunic',
    price: 4500,
    category: 'Apparel',
    images: ['/images/491A9109.JPG', '/images/491A9013.JPG', '/images/491A9008.JPG'],
    description: 'Crafted from the finest breathable cotton, featuring handcrafted block prints. Perfect for effortless movement.'
  },
  {
    id: 'p2',
    name: 'Handblock Printed Trousers',
    price: 3200,
    category: 'Apparel',
    images: ['/images/491A9146.JPG', '/images/491A9150.JPG'],
    description: 'A balance of heritage and contemporary design. Conscious and mindfully made for everyday elegance.'
  },
  {
    id: 'p3',
    name: 'Radiance Wrap Dress',
    price: 6500,
    category: 'Apparel',
    images: ['/images/491A9069.JPG', '/images/491A9071.JPG'],
    description: 'Soft summer palette and airy silhouette to be lived in all season long.'
  },
  {
    id: 'p4',
    name: 'Effortless Cotton Shirt',
    price: 2800,
    category: 'Apparel',
    images: ['/images/491A9154.JPG', '/images/491A9156.JPG'],
    description: 'Timeless and versatile clothing that moves seamlessly from workdays to slow outings.'
  },
  {
    id: 'p5',
    name: 'Handcrafted Heritage Necklace',
    price: 8500,
    category: 'Jewellery',
    images: ['/images/491A9130.JPG', '/images/491A9112.JPG'],
    description: 'Complementary handcrafted jewellery made with high-quality materials to elevate your evolving radiance.'
  },
  {
    id: 'p6',
    name: 'Mindful Statement Earrings',
    price: 3500,
    category: 'Jewellery',
    images: ['/images/491A9054.JPG', '/images/491A9061.JPG'],
    description: 'Evolving with grace, intention, and radiance.'
  },
  {
    id: 'p7',
    name: 'Summer Elegance Kurta',
    price: 5200,
    category: 'Apparel',
    images: ['/images/491A9019.JPG', '/images/491A9023.JPG'],
    description: 'Limited edition heritage reimagined with intention.'
  },
  {
    id: 'p8',
    name: 'Artisanal Silver Cuffs',
    price: 6000,
    category: 'Jewellery',
    images: ['/images/491A9076.JPG', '/images/491A9077.JPG'],
    description: 'Handcrafted with intricate motifs. Rooted in India’s craft heritage.'
  }
];
