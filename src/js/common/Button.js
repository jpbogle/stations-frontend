import styled from 'styled-components';
import * as Colors from './Colors';

export default styled.div`
    font-size: 18px;
    margin: 16px auto 0px auto;
    padding: 6px 0px;
    color: white;
    background-color: ${Colors.primaryC};
    border: $primary-c solid 2px;
    border-radius: 3px;
    cursor: pointer;
    transition: .2s;
    width: 210px;
    height: 25px;

    &:hover {
      transform: scale(1.02, 1.02);
      background-color: ${Colors.highlightC};
      border-color: ${Colors.highlightC};
`;
