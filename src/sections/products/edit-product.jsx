import { useLocation } from "react-router-dom";

export default function EditProduct() {
    const { state } = useLocation();
    const { product } = state;
    console.log(product);
    return (
        <div>
            <h1>Edit Product</h1>
            <h2>{product.productId}</h2>
        </div>
    );
}