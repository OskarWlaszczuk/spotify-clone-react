import { Link } from "react-router-dom";
import styled from "styled-components";

export const ArtistNameLink = styled(Link)`
    color:${({ theme }) => theme.colors.white};
    text-decoration:none;
`;