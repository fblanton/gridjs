import { ComponentChild, h, JSX } from 'preact';

import Cell from '../../cell';
import { BaseComponent, BaseProps } from '../base';
import { classJoin, className } from '../../util/className';
import { TCell, TColumn } from '../../types';
import Row from '../../row';

export interface TDProps extends BaseProps {
  cell: Cell<TCell>;
  row?: Row<TCell>;
  column?: TColumn;
  colSpan?: number;
  className?: string;
  onClick?: (event: JSX.TargetedMouseEvent<HTMLElement>) => void;
}

export class TD extends BaseComponent<TDProps, {}> {
  private content(): ComponentChild {
    if (
      this.props.column &&
      typeof this.props.column.formatter === 'function'
    ) {
      return this.props.column.formatter(
        this.props.cell.data,
        this.props.row,
        this.props.column,
      );
    }

    return this.props.cell.data;
  }

  render() {
    return (
      <td
        colSpan={this.props.colSpan}
        className={classJoin(className('td'), this.props.className)}
        onClick={this.props.onClick}
      >
        {this.content()}
      </td>
    );
  }
}
