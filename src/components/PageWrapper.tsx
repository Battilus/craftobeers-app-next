import React, {FC, ReactNode} from 'react';
import {PageMeta} from "@/types";
import Head from "next/head";

interface IProps {
    meta?: PageMeta
    children: ReactNode
}
const PageWrapper: FC<IProps> = ({children, meta}) => {
    return (
        <>
            <Head>
                {meta && <>
                    <title>{meta?.title}</title>
                    <meta name="description" content={meta?.description} />
                </>}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                {children}
            </main>
        </>
    );
};

export default PageWrapper;