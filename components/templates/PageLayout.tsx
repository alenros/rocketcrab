import { Loading } from "@zeit-ui/react";
import Footer from "../atoms/Footer";
import MainTitle from "../atoms/MainTitle";

const PageLayout = ({
    children,
    path,
    loading,
    disablePhonetic,
}: PageLayoutParams): JSX.Element => (
    <div className="container">
        <main>
            <div className="main-content">
                <MainTitle path={path} disablePhonetic={disablePhonetic} />

                {loading ? <Loading /> : children}
            </div>
        </main>

        <Footer />

        <style jsx>{`
            .container {
                min-height: 100%;
                padding: 0 0.5rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 100%;
            }

            main {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            .main-content {
                min-height: 20rem;
                max-width: 24em;
                width: 100%;
            }

            a {
                color: inherit;
                text-decoration: none;
            }
        `}</style>

        <style jsx global>{`
            html,
            body {
                padding: 0;
                margin: 0;
            }

            * {
                box-sizing: border-box;
            }
        `}</style>
    </div>
);

type PageLayoutParams = {
    children: JSX.Element[] | JSX.Element;
    path?: string;
    loading?: boolean;
    disablePhonetic?: boolean;
};

export default PageLayout;
