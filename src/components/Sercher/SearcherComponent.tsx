import LinkButtonComponent from "../ReturnButton";
import styles from './searcher.module.css'
import searchSVG from "../../assets/img/search.svg";    

import { navigateHandleClick } from "../utill";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useSearchInput } from "../../providers/SearchInputProvider";
import ImageButton from "../ImageButtonComponent";
import buttonWithImageStyle from "../../styles/buttonWithImageStyle";

const searchAndShowResults = (query: string, navigate: NavigateFunction) => {
    if (query === "") {
        return;
    }
    try {
        navigateHandleClick(true, `?query=${query}`, navigate);
    } catch (error) {
        console.log(error);
        alert("Проблема с работой поиска :(")
    }
}
const handleSearch = async (query: string, navigate: NavigateFunction) => {
    await searchAndShowResults(query, navigate);
};


const SearchButton = ({ classes = "" }: { classes?: string }) => {
    const { inputValue } = useSearchInput();
    const navigate = useNavigate();
    const searchImg = searchSVG//`${process.env.PUBLIC_URL}img/search.svg`;

    const classNames = `${styles["search-button"]}  ${classes}`


    return (
        <ImageButton  className={classNames} type="submit" onClick={() => handleSearch(inputValue, navigate)}>
            <img src={searchImg} alt="Кнопка поиска" />
        </ImageButton>
    );
}

const SearhComponent = () => {
    const { inputValue, setInputValue } = useSearchInput();
    return (
        <div className={styles["searcher"]}>
            <input
                className={styles["search-input"]}
                type="search" name="query"
                placeholder="Поиск"
                wfd-id="id0"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <SearchButton />
        </div>
    );
}

const SearcherComponent = () => {

    return (
        <>
            <section className={styles["search-and-buttons"]}>
                <div className={styles["buttons-area"]}>
                    <LinkButtonComponent style={buttonWithImageStyle} classes={"color-button"}/>
                    <SearhComponent />
                </div>
            </section>
        </>
    );
}

export default SearcherComponent;