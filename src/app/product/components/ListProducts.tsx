'use client';

import { useState, useEffect, ChangeEvent } from "react";
import CustomTable from "@/components/ui/CustomTable";
import { Products } from "@/interface";
import { Column } from "@/interface/table";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

interface Props {
    products: Products[];
}

const columns: Column<Products>[] = [
    { title: "ID", accessor: "id" },
    { title: "Title", accessor: "title" },
    { title: "Price", accessor: "price" },
    { title: "Description", accessor: "description" },
    { title: "Category", accessor: "category" },
];

const ListProducts = ({ products }: Props) => {
    const [productList, setProductList] = useState<Products[]>(products);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        setProductList(products);
    }, [products]);

    useEffect(() => {
        const filteredProducts = products.filter(({ title, description }) =>
            title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProductList(filteredProducts);
    }, [searchTerm, products]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleEdit = (item: Products) => {
        router.push(`/product/${item.id}`);
    };

    const handleDelete = async (item: Products) => {
        const newProducts = productList.filter(({ id }) => id !== item.id);
        setProductList(newProducts);
        localStorage.setItem('products', JSON.stringify(newProducts));
    };

    return (
        <div>
            <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="mb-4 p-2 border border-gray-300 rounded"
            />
            <CustomTable
                data={productList}
                columns={columns}
                controls={[
                    {
                        icon: "edit",
                        onClickEvent: handleEdit,
                    },
                    {
                        icon: "delete",
                        onClickEvent: handleDelete,
                    },
                ]}
            />
        </div>
    );
};

export default ListProducts;
