import { h, JSX } from 'preact';

import Row from '../../row';
import Cell from '../../cell';
import { BaseComponent, BaseProps } from '../base';
import { className } from '../../util/className';
import { TCell, TColumn } from '../../types';
import { TD } from './td';
import Header from '../../header';
import getConfig from '../../util/getConfig';

export interface TRProps extends BaseProps {
  row?: Row<TCell>;
  header?: Header;
}

interface RowState {
  isActive: boolean;
}

export class TR extends BaseComponent<TRProps, RowState> {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isActive: false,
    };
  }

  private getColumn(cellIndex: number): TColumn {
    if (this.props.header) {
      return this.props.header.columns[cellIndex];
    }

    return null;
  }

  render() {
    if (this.props.children) {
      return <tr className={className('tr')}>{this.props.children}</tr>;
    } else {
      return (
        <tr className={className('tr')}>
          {this.props.row.cells.map((cell: Cell<TCell>, i) => {
            const handleClick = (
              event: JSX.TargetedMouseEvent<HTMLElement>,
            ) => {
              event.preventDefault();
              const config = getConfig(this.context);

              if (config.row.onClick) {
                config.row.onClick(cell, this.props.row, this.getColumn(i));
              }
            };

            return (
              <TD
                key={cell.id}
                cell={cell}
                row={this.props.row}
                column={this.getColumn(i)}
                onClick={handleClick}
              />
            );
          })}
        </tr>
      );
    }
  }
}
