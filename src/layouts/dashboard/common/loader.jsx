/* eslint-disable import/no-extraneous-dependencies */
import styled from 'styled-components';

const LoaderStyle= styled.div`
     width: 50px;
     aspect-ratio: 1;
     border-radius: 50%;
     border: 8px solid;
     border-color: #000 #0000;
     animation: l1 1s infinite;

@keyframes l1 {to{transform: rotate(.5turn)}}
`
const Loader=()=><LoaderStyle className="loader" />

export default Loader;