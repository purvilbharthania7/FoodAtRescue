import styled from 'styled-components';

const Row = styled.div`
    display: flex;
    height: relative;
    margin: 3px;
    align: left;
`;

const Column = styled.div`
    width: 30%;
    marginTop: 0px;
    align: left;

    &.text {
        margin: auto;
        align: left;
    }
`;

export { Row, Column };