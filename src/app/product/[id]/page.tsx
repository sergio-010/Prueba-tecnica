'use client';
import { useEffect, useState } from "react";
import Form from "../components/Form";
import { Products } from "@/interface";

interface Props {
    params: {
        id: string;
    };
}

export default function ProductDetail({ params }: Props) {

    const { id } = params;

    const [product, setProduct] = useState<Products>();

    useEffect(() => {
        const product = localStorage.getItem('products');
        if (product) {
            const productsArray = JSON.parse(product);
            const productFound = productsArray.find((product: Products) => product.id === Number(id));
            console.log(productFound);
            setProduct(productFound);
        }
    }, [])


    return (
        <Form
            cardTitle="Update Product"
            cardDescription="Fill in the details of your product."
            textButton="Update"
            product={product}
        />
    );
}
