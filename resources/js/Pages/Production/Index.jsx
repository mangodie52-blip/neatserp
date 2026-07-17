import { useState } from "react";
import { usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import ProductionTable from "./ProductionTable";
import ProductionForm from "./ProductionForm";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index() {

    const { orders, products } = usePage().props;

    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    return (

        <AppLayout>

            <div className="p-6">

                <div className="flex justify-between items-center mb-6">

                    <h1 className="text-2xl font-bold">
                        🏭 SPK Produksi
                    </h1>

                    <PrimaryButton
                        onClick={() => {
                            setSelectedOrder(null);
                            setShowModal(true);
                        }}
                    >
                        + Tambah SPK
                    </PrimaryButton>

                </div>

                <ProductionTable
                    orders={orders}
                    onEdit={(order) => {
                        setSelectedOrder(order);
                        setShowModal(true);
                    }}
                />

                <ProductionForm
                    show={showModal}
                    products={products}
                    order={selectedOrder}
                    onClose={() => {
                        setShowModal(false);
                        setSelectedOrder(null);
                    }}
        />

    </div>

</AppLayout>

    );

}