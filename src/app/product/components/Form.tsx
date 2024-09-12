/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client'

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAllCategories } from "@/services/categories";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { Products } from "@/interface";

interface ProductForm {
    title: string;
    price: number | undefined;
    description: string;
    category: string;
}

interface ProductFormProps {
    cardDescription: string;
    cardTitle: string;
    textButton: string;
    product?: Products | undefined;

}

function Form({ cardDescription, textButton, cardTitle, product }: ProductFormProps) {

    const router = useRouter();

    const [categories, setCategories] = useState<{ label: string, value: string }[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false); // Estado de carga

    useEffect(() => {
        const fetchCategories = async () => {
            const { categories, error } = await getAllCategories();
            if (error) {
                setError(error);
                return;
            }
            const options = categories.map((category) => ({
                label: category,
                value: category,
            }));
            setCategories(options);
        }
        fetchCategories()
    }, [])


    useEffect(() => {

        if (product) {
            console.log(product);
            formik.setValues({
                title: product.title,
                price: product.price,
                description: product.description,
                category: product.category,
            });
        }

    }, [product])


    const formik = useFormik<ProductForm>({
        initialValues: {
            title: '',
            price: undefined,
            description: '',
            category: 'default',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Required'),
            price: Yup.number().required('Required'),
            description: Yup.string().required('Required'),
            category: Yup.string().required('Required'),
        }),

        onSubmit: async (values) => {
            setLoading(true); // Iniciar el estado de carga
            try {
                const newProduct = { ...values, id: Date.now() };
                const products = localStorage.getItem('products');

                if (products) {
                    const productsArray = JSON.parse(products);

                    //update Product
                    if (product) {
                        const productIndex = productsArray.findIndex((p: Products) => p.id === product.id);
                        productsArray[productIndex] = newProduct;
                        localStorage.setItem('products', JSON.stringify(productsArray));
                        router.push('/');
                        return;
                    }

                    //create Product
                    productsArray.unshift(newProduct);
                    localStorage.setItem('products', JSON.stringify(productsArray));
                    router.push('/');
                }
            } catch (error) {
                console.error('Error creating/updating product', error);
            } finally {
                setLoading(false);
            }
        },
    });

    if (error) {
        return <div>Error: {error}</div>;
    }

    console.log(formik.errors);

    return (
        <div className="flex justify-center items-center">
            <form onSubmit={formik.handleSubmit}>
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>{cardTitle}</CardTitle>
                        <CardDescription>
                            {cardDescription}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="title">Name of product</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="Name of product"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.title && formik.errors.title && (
                                    <div className="text-red-500">{formik.errors.title}</div>
                                )}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    placeholder="Price of product"
                                    type="number"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.price && formik.errors.price && (
                                    <div className="text-red-500">{formik.errors.price}</div>
                                )}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    name="description"
                                    placeholder="Description of product"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.description && formik.errors.description && (
                                    <div className="text-red-500">{formik.errors.description}</div>
                                )}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="category" >Category</Label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                    className="w-full bg-transparent"
                                >
                                    <option value="default" className="text-black">Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category.value} value={category.value} className="text-black">
                                            {category.label}
                                        </option>
                                    ))}
                                </select>
                                {formik.errors.category && (
                                    <div className="text-red-500">{formik.errors.category}</div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" type="button" onClick={() => router.push('/')}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Loading...' : textButton}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}

export default Form;
