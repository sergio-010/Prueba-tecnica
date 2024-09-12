'use client';

import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Column } from "@/interface/table";
import { ArrowLeft, ArrowRight, PencilRuler, Trash2 } from "lucide-react";
import { Button } from './button';
import { useRouter } from 'next/navigation';

interface Props<T> {
    data: T[];
    columns: Column<T>[];
    controls?: {
        icon: 'edit' | 'delete' | 'view';
        onClickEvent: (item: T) => void;
    }[];
}

function CustomTable<T>({ data, columns, controls }: Props<T>) {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 5;

    const totalPages = Math.ceil(data.length / pageSize);

    const currentData = data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const renderRow = (value: unknown): React.ReactNode => {
        if (value === null || value === undefined) {
            return '';
        } else if (typeof value === 'boolean') {
            return value ? 'Activo' : 'Inactivo';
        } else if (typeof value === 'string' || typeof value === 'number') {
            return value;
        } else {
            return '';
        }
    };

    return (
        <div className="overflow-x-auto">
            <div className="min-w-[600px] rounded-md border ">
                <Table>
                    <TableCaption>List of data</TableCaption>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead key={column.title}>
                                    {column.title}
                                </TableHead>
                            ))}
                            {controls && controls.length > 0 && (
                                <TableHead>
                                    Acciones
                                </TableHead>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length + (controls ? 1 : 0)}>No data found</TableCell>
                            </TableRow>
                        ) : currentData.map((item, index) => (
                            <TableRow key={index}>
                                {columns.map((column) => (
                                    <TableCell key={column.title}>
                                        {renderRow(item[column.accessor])}
                                    </TableCell>
                                ))}
                                {controls && controls.length > 0 && (
                                    <TableCell className="flex items-center gap-4 text-[#3C3D37]">
                                        {controls.map((control, controlIndex) => (
                                            <React.Fragment key={controlIndex}>
                                                {control.icon === 'edit' && (
                                                    <PencilRuler className="cursor-pointer" onClick={() => control.onClickEvent(item)} />
                                                )}
                                                {control.icon === 'delete' && (
                                                    <Trash2 className="cursor-pointer" onClick={() => control.onClickEvent(item)} />
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell className="text-center " colSpan={columns.length + (controls ? 1 : 0)}>
                                <div className="flex items-center justify-center gap-10">
                                    <button
                                        className="btn btn-outline btn-sm"
                                        onClick={handlePreviousPage}
                                        disabled={currentPage === 0}
                                    >
                                        <ArrowLeft />
                                    </button>
                                    <span className="text-sm">Page {currentPage + 1} of {totalPages}</span>
                                    <button
                                        className="btn btn-outline btn-sm"
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages - 1}
                                    >
                                        <ArrowRight />
                                    </button>
                                </div>
                                <Button
                                    className="mt-4"
                                    onClick={() => router.push('/product/create')}
                                >
                                    Create Product
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default CustomTable;
