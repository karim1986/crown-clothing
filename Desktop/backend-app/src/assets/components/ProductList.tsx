import { useEffect, useState } from "react";

function ProductList({ category }: { category: string }) {
  const [product, setProducts] = useState<string[]>([]);

  useEffect(() => {
    console.log("fetching products", category);
    setProducts(["Clothing", "HOusehold"]);
  }, [category]);
  return <div>{category}</div>;
}

export default ProductList;
