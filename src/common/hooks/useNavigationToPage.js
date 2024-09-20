import { useNavigate } from "react-router-dom"

export const useNavigationToPage = () => {
    const navigate = useNavigate();

    const navigateToPage = (toPage, param = "") => navigate(toPage(param));
    return navigateToPage;
};