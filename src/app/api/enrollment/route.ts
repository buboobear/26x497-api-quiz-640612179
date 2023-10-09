import { getPrisma } from "@/libs/getPrisma";
import { Course, Enrollment, Student } from "@prisma/client";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

type EnrollmentWithRelation = Enrollment & {
    student: Student;
    course: Course;
};

export type EnrollmentGetResponse = {
    enrollments: EnrollmentWithRelation[];
};

export const GET = async () => {
    const prisma = getPrisma();

    // 3. display enrollment data (showing student data and course data)
    // const enrollments = await prisma...

    // 1. ดึงข้อมูล Enrollment Model พร้อมกับ Student และ Course Model และจัดเรียงตาม createdAt
    const enrollments = await prisma.enrollment.findMany({
        include: {
            student: true, // เพิ่มข้อมูล Student Model
            course: true, // เพิ่มข้อมูล Course Model
        },
        orderBy: {
            createdAt: "desc", // จัดเรียงตาม createdAt จากมากไปน้อย
        },
    });

    return NextResponse.json<EnrollmentGetResponse>({
        enrollments, //replace empty array with result from DB
    });
};
