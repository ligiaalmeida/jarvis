import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { timeFormat } from 'utils/js';

import { MixSuggestionActions } from 'store/ducks/mixSuggestion';

import { StateMapToPropsGlobal } from 'types';

import texts from '../texts';
import * as S from './styles';
import { TableListProps } from './types';

const TableList: React.FC<TableListProps> = ({ title, data, type, np }) => {
  const row = useSelector((state: Pick<StateMapToPropsGlobal, 'mixSuggestionPage'>) => state.mixSuggestionPage);

  const { tableSelected } = MixSuggestionActions;
  const dispatch = useDispatch();

  return (
    <>
      {data && (
        <S.Container>
          <S.Header type={type}>
            <div className="header__wrapper">
              <h2>{title}</h2>
              {type === 'scheduled' && (
                <div className="header__wrapper__items-left">
                  <span>{texts.header.scheduled.predicted.pt_br}</span>
                  <span>
                    {timeFormat({
                      displayFormat: 'HH:MM:SS',
                      separatorHour: 'h ',
                      separatorMinute: "'",
                      separatorSeconds: '"',
                      time: data.original_time,
                    })}
                  </span>
                </div>
              )}

              {type === 'suggested' && (
                <>
                  <div className="header__wrapper__items-left">
                    <div>
                      <span>{texts.header.suggested.expected_production.pt_br}</span>
                      <span>
                        {timeFormat({
                          displayFormat: 'HH:MM:SS',
                          separatorHour: 'h ',
                          separatorMinute: "'",
                          separatorSeconds: '"',
                          time: data.predicted_time,
                        })}
                      </span>
                    </div>
                    <div>
                      <span>{texts.header.suggested.time_gain.pt_br}</span>
                      <span>
                        {timeFormat({
                          displayFormat: 'HH:MM:SS',
                          separatorHour: 'h ',
                          separatorMinute: "'",
                          separatorSeconds: '"',
                          time: data.delta_gain,
                        })}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </S.Header>
          <S.Table type={type}>
            <thead>
              <tr>
                <>
                  <td>Seq.</td>
                  <td>NP</td>
                  <td>Baumuster</td>
                </>
              </tr>
            </thead>
            <tbody>
              {type === 'scheduled' && (
                <>
                  {data?.rows.map((original, idx) => {
                    return (
                      <tr
                        key={idx}
                        tabIndex={0}
                        className={
                          row.tableSelected.type === 'suggested' && row.tableSelected.id === original.np
                            ? 'selected'
                            : ''
                        }
                        onBlur={() => {
                          dispatch(
                            tableSelected({
                              id: 0,
                              type: null,
                            })
                          );
                        }}
                        onFocus={() => {
                          dispatch(
                            tableSelected({
                              id: original.np,
                              type: 'scheduled',
                            })
                          );
                        }}
                      >
                        <td>
                          <span>{original.seq}</span>
                        </td>
                        <td>{original.np}</td>
                        <td>{original.baumuster}</td>
                      </tr>
                    );
                  })}
                </>
              )}
              {type === 'suggested' && (
                <>
                  {data?.rows.map((predicted, idx) => {
                    return (
                      <S.SuggestedItem
                        key={idx}
                        tabIndex={0}
                        sequence={np[idx]?.np !== predicted.np}
                        className={
                          row.tableSelected.type === 'scheduled' && row.tableSelected.id === predicted.np
                            ? 'selected suggested__new-sequence'
                            : 'suggested__new-sequence'
                        }
                        onBlur={() => {
                          dispatch(
                            tableSelected({
                              id: 0,
                              type: null,
                            })
                          );
                        }}
                        onFocus={() => {
                          dispatch(
                            tableSelected({
                              id: predicted.np,
                              type: 'suggested',
                            })
                          );
                        }}
                      >
                        <td>
                          <span>{predicted.seq}</span>
                        </td>
                        <td>{predicted.np}</td>
                        <td>{predicted.baumuster}</td>
                      </S.SuggestedItem>
                    );
                  })}
                </>
              )}
            </tbody>
          </S.Table>
        </S.Container>
      )}
    </>
  );
};

export default TableList;
