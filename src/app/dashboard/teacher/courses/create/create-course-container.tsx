"use client";
import { useForm } from "react-hook-form";
import {
    createCourseSchema,
    type CreateCourseSchemaType,
} from "./schema/create-course-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCourseForm } from "./create-course-form";
import { Container, Paper } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCourseCreation } from "@/hooks/query-hooks/course-query-hook";

export default function CreateCourseContainer() {
    const router = useRouter();
    const courseCreation = useCourseCreation();

    const form = useForm<CreateCourseSchemaType>({
        mode: "all",
        resolver: zodResolver(createCourseSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            thumbnail: undefined,
        },
    });

    const { control, handleSubmit, reset } = form;

    async function onSubmit(values: CreateCourseSchemaType) {
        try {
            await courseCreation.mutateAsync(values);

            notifications.show({
                title: "Course Created!",
                message: "Your course has been created successfully.",
                color: "green",
                icon: <CheckCircle size={18} />,
                autoClose: 3000,
            });

            reset();
            router.push("/dashboard/teacher");
        } catch (error) {
            notifications.show({
                title: "Error",
                message: error instanceof Error ? error.message : "Failed to create course. Please try again.",
                color: "red",
                icon: <XCircle size={18} />,
                autoClose: 5000,
            });
        }
    }

    return (
        <Container fluid py="xl">
            <CreateCourseForm
                form={form}
                control={control}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                isLoading={courseCreation.isPending}
            />
        </Container>
    );
}

