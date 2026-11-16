import Link from "next/link";
import ProductForm from "../product-form";

const NewProductPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/admin"
          className="text-sm font-medium text-[#6B6560] transition-colors hover:text-black"
        >
          ← Back to products
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-black">Add product</h1>
      </div>
      <ProductForm />
    </div>
  );
};

export default NewProductPage;
