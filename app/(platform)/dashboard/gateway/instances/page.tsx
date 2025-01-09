"use client";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { PageHeader } from "@components/custom/page-header";
import { DataTable } from "@components/custom/data-table";
import {
    CreateInstanceButton,
} from "@app/(platform)/dashboard/gateway/instances/instance-creation-dialog";
import {getInstances} from "@actions/instance.action";

// Server action to fetch instances

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "provider",
            header: "Provider",
        },
        {
            accessorKey: "status",
            header: "Status",
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
        },
    ];

    // Fetch data from server actions
    useEffect(() => {
        async function fetchData() {
            try {
                const instances = await getInstances();
                setData(instances);
            } catch (error) {
                console.error("Error fetching instances:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <PageHeader title="Instances" description="Create and manage your instances"></PageHeader>
            <div className="flex justify-end mt-5">
                <CreateInstanceButton></CreateInstanceButton>
            </div>
            <div className="mt-3">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <DataTable columns={columns} data={data} />
                )}
            </div>
        </>
    );
}
