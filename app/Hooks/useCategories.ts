import { ApiClient } from "../api/ApiClient";
import { ICategory } from "../models/Category";
import { useState, useEffect, useContext } from "react";
import { getServiceUrl } from "../api/channels";
import { LanguageContext } from "../context/LanguageContext/LanguageContext";

const categoryApi = new ApiClient<ICategory>({
    baseURL: getServiceUrl("Categories")
});

const useCategories = () => {

    const { language } = useContext(LanguageContext);

    const [hobbyCategories, setHobbyCategories] = useState<string[]>([]);
    const [jobCategories, setJobCategories] = useState<string[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        categoryApi.GetAll<ICategory[]>()
            .then(response => setCategories(response))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        categories.forEach(category => {
            switch (category.title) {
                case "hobbies": setHobbyCategories(category.categories[language]); break;
                case "jobs": setJobCategories(category.categories[language]); break;
            }
        });
    }, [language, categories]);

    return ({
        hobbyCategories,
        jobCategories
    });

}

export default useCategories;