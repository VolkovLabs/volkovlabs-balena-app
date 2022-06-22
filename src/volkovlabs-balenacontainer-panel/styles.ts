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
    upload: css`
      display: none;
      visibility: false;
    `,
    cardButton: css`
      position: absolute;
      right: 0;
    `,
    slider: css`
      width: 200px;
      height: 30px;
      display: inline-flex;
      margin-right: 5px;
    `,
    select: css`
      height: 30px;
      display: inline-flex;
      margin-right: 5px;
    `,
  };
};
