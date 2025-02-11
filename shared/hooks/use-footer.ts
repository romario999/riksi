import { Api } from "@/shared/services/api-client";
import { FooterPage } from "@prisma/client";
import React from "react";

export const useFooter = () => {
    const [footerPages, setFooterPages] = React.useState<FooterPage[]>([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        async function fetchFooterPages() {
            try {
                setLoading(true);
                const footer = await Api.footerPages.getAll();
                setFooterPages(footer);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchFooterPages();
    }, []);

    return {
        footerPages,
        loading,
    };
};
