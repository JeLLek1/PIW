import { styled } from '@material-ui/core';

export const FileLabel = styled('span')(props => ({
  display: 'inline-block',
  verticalAlign: 'middle',
  padding: '1rem 0',
  whiteSpace: 'nowrap',
  marginLeft: '1rem',
  overflow: 'auto',
  width: 'calc(100% - 13rem)',
  color: props.error ? '#f44336' : 'initial',
  '&::-webkit-scrollbar': {
    height: 0,
  },
}));

export const ImageContainer = styled('div')(() => ({
  display: 'inline-block',
  verticalAlign: 'middle',
  marginLeft: '1rem',
}));
