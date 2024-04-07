import { styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom"

export const VisuallyHiddenInput = styled("input")({
    border: 0,
    clip: "react(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1,
});

export const Link = styled(LinkComponent)`
text-decoration: none;
color: black;
// padding: 1rem;
&:hover {
    background-color: rgba(0,0,0,0.1)
};
border-radius: 1rem;
// border-top: 1px solid gray;
// border: 1px solid black
`;

export const InputBox = styled("input")`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding: 0 3rem;
    font-size: 17px;
    border-radius: 1.5rem;
    background-color: 

`;
