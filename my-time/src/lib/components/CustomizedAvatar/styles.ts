import Avatar from 'react-avatar';
import styled, { StyledComponent } from 'styled-components';

export const StyledAvatar: StyledComponent<any, any> = styled(Avatar)`
  img {
    object-fit: contain;
  }
`;
