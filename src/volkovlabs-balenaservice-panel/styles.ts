import { css } from '@emotion/css';

/**
 * Styles
 */
export const Styles = () => {
  return {
    wrapper: css`
      position: relative;
      overflow-y: scroll;
    `,
    cardButton: css`
      position: absolute;
      right: 0;
    `,
  };
};
