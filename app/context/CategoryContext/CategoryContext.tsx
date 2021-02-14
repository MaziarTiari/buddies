import React from 'react';
import { createContext, useState, ReactNode, useEffect, useContext } from 'react'
import { ICategory } from '../../models/Category';
import { AxiosError } from 'axios';
import { LanguageContext } from '../LanguageContext/LanguageContext';
import { apiRoutes } from '../../api/channels';
import { httpClientBaseConfig } from '../../api/Api.config';
import { TypedAxiosInstance } from '../../api/TypedAxiosInstance';

interface CategoryContextModel {
    jobCategories: string[];
    hobbyCategories: string[];
}

const initState: CategoryContextModel = {
    jobCategories: ["Error"],
    hobbyCategories: ["Error"],
}

export const CategoryContext = createContext(initState);

export function CategoryContextProvider(props: { children: ReactNode }) {

    const [categories, setCategories] = useState<ICategory[]>([]);
    const [jobCategories, setJobCategories] = useState<string[]>(
        initState.jobCategories
    );
    const [hobbyCategories, setHobbyCategories] = useState<string[]>(
        initState.hobbyCategories
    );

    const categoryClient = new TypedAxiosInstance<ICategory>(httpClientBaseConfig, {baseURL: apiRoutes.categories()})

    const { language } = useContext(LanguageContext);

    useEffect(() => {
        categoryClient.get<ICategory[]>()
            .then(res => setCategories(res.data))
            .catch((error: AxiosError) => console.log(error));
    }, []);

    useEffect(() => {
        categories?.forEach(category => {
            switch (category.title) {
                case "hobbies":
                    setHobbyCategories(category.categories[language]);
                    break;
                case "jobs":
                    setJobCategories(category.categories[language]);
                    break;
            }
        });
    }, [categories, language]);

    const contextValue: CategoryContextModel = {
        jobCategories,
        hobbyCategories
    };

    return (
        <CategoryContext.Provider value={contextValue}>
            {props.children}
        </CategoryContext.Provider>
    );

}