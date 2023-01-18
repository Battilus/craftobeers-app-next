import React from 'react';
import {NextPage} from "next";
import Header from "@/components/layouts/Header";
import PageWrapper from "@/components/PageWrapper";
import Link from "next/link";

const PageNotFound: NextPage = () => {
    return (
        <PageWrapper>
            <Header/>
            <div className="w-full flex flex-col items-center p-4">
                <div className="w-full max-w-[720px]">
                    <div className="h-full text-matterhorn flex flex-col gap-6 h-[80vh]">
                        <div className="text-9xl">404</div>
                        <div>Page not found</div>
                        <Link href={"/"} className="text-sm text-violet-600">Home</Link>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default PageNotFound;