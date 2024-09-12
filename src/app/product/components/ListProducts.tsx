'use client'

import { useState, useEffect } from "react";
import CustomTable from "@/components/ui/CustomTable";
import { Products } from "@/interface";
import { Column } from "@/interface/table";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";


interface Props {
    products: Products[];
}

const columns: Column<Products>[] = [
    {
        title: "ID",
        accessor: "id",
    },
    {
        title: "Title",
        accessor: "title",
    },
    {
        title: "Price",
        accessor: "price",
    },
    {
        title: "Description",
        accessor: "description",
    },
    {
        title: "Category",
        accessor: "category",
    },
];

const ListProducts = ({ products }: Props) => {
    const [productList, setProductList] = useState<Products[]>(products);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        setProductList(products);
    }, [products]);

    useEffect(() => {
        // Filtrar productos según el término de búsqueda
        const filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProductList(filteredProducts);
    }, [searchTerm, products]);

    const deleteProduct = async (id: number) => {
        const newProducts = productList.filter(product => product.id !== id);
        setProductList(newProducts);
        localStorage.setItem('products', JSON.stringify(newProducts));
    };

    return (
        <div>
            <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded"
            />

            <CustomTable
                data={productList}
                columns={columns}
                controls={[
                    {
                        icon: "edit",
                        onClickEvent: (item) => {
                            console.log(item);
                            router.push(`/product/${item.id}`);
                        },
                    },
                    {
                        icon: "delete",
                        onClickEvent: (item) => {
                            console.log(item);
                            deleteProduct(item.id);
                        },
                    },
                ]}
            />
        </div>
    );
};

export default ListProducts;
