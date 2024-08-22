import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <>
      <ProductCard product={{
          name: "Car",
          price: 1
        }} 
      />
    </>
  )
}
