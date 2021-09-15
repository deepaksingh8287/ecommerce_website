artes = [
  {
    product: "1",
    name: "Slim Shirt",
    image: "/images/d1.jpg",
    price: 60,
    countInStock: 1,
    qty: 1,
  },
  {
    product: "6",
    name: "Slim Shirt",
    image: "/images/d1.jpg",
    price: 1600,
    countInStock: 12,
    qty: 1,
  },
];
var sgo=JSON.stringify(artes);
console.log(typeof(JSON.parse(sgo)))

console.log(typeof(sgo))