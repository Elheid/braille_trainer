import HeaderComponent from "../header/Header";
import { PropsWithChildren } from "react";
import { SearchInputProvider } from "../../providers/SearchInputProvider";

export const LearningAndStudingSimple = ({children} : PropsWithChildren)=>{
    return (
        <SearchInputProvider>
        <section className="main">
            <HeaderComponent />
            {children}
        </section>
        </SearchInputProvider>
    );
}

