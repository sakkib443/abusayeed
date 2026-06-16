"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const DesignTemplateDetails = () => {
    const router = useRouter();
    useEffect(() => {
        router.replace("/design-template");
    }, [router]);
    return null;
};

export default DesignTemplateDetails;
