import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { CSVLink } from 'react-csv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import { timeConverter, timeFormat } from 'utils/js';
import { Pathname, RouterProps, StateMapToPropsGlobal } from 'types';
import { theme } from 'styles/theme';
import payload from 'constants/payload';
import api from 'services/api';

import InputList from 'components/Pages/InputList';
import Footer from 'components/Footer';
import Message from 'components/Messages/Error';
import MessageError from 'components/Messages/Error';
import Error from 'components/Icons/Error';

import TableList from './TableList';
import texts from './texts';
import * as S from './styles';

interface NPInterface {
  np: number;
}
interface Table {
  processed_timestamp: string;
  original_time: string;
  predicted_time: string;
  delta_gain: string;
  info_type: string;
  seq: number;
  np: number;
  baumuster: string;
}

const MixSuggestionPage = () => {
  const [data, setData] = useState<typeof payload.mix_suggestion>(null!);
  const [originalNPList, setOriginalNPList] = useState<NPInterface[]>([]);
  const [tableOriginalToExport, setTableOriginalToExport] = useState<Table[]>(
    []
  );
  const [tablePredictedToExport, setTablePredictedToExport] = useState<Table[]>(
    []
  );
  const [isError, setIsError] = useState<boolean>(false);
  const [newRequest, setNewRequest] = useState<boolean>(false);

  const settings = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'global'>) => state.global
  );
  const router = useSelector((state: RouterProps) => state.router);

  useEffect(() => {
    api()
      .get(`socket/${settings.building}_mix_suggestion`)
      .then((res) => {
        setData(JSON.parse(JSON.stringify(res.data)));
        convertToExport(res.data);
        setIsError(false);
      })
      .catch((_) => {
        setIsError(true);
      });
  }, [settings.building, setIsError, newRequest]);

  if (process.env.NODE_ENV === 'development') {
    console.groupCollapsed(' Mix Suggestion ->');
    console.log(data);
    console.groupEnd();
  }

  const convertToExport = (data: typeof payload.mix_suggestion) => {
    let npOriginal: NPInterface = { np: 0 };
    const npOriginalArray: typeof npOriginal[] = [];
    let table: Table = {
      processed_timestamp: '',
      original_time: '',
      predicted_time: '',
      delta_gain: '',
      info_type: '',
      seq: 0,
      np: 0,
      baumuster: '',
    };
    const tableOriginal: typeof table[] = [];
    const tablePredicted: typeof table[] = [];

    data.map((item) => {
      if (item.info_type === 'original') {
        const original_time = timeFormat({
          displayFormat: 'HH:MM:SS',
          time: item.original_time,
        });
        const predicted_time = timeFormat({
          displayFormat: 'HH:MM:SS',
          time: item.predicted_time,
        });
        const delta_gain = timeFormat({
          displayFormat: 'HH:MM:SS',
          time: item.delta_gain,
        });
        const processed_timestamp = timeConverter(item.processed_timestamp);
        item.rows.map((row) => {
          npOriginal = { np: row.np };
          table = {
            processed_timestamp: processed_timestamp,
            original_time: original_time,
            predicted_time: predicted_time,
            delta_gain: delta_gain,
            info_type: 'Agendado',
            seq: row.seq,
            np: row.np,
            baumuster: row.baumuster,
          };
          npOriginalArray.push(npOriginal);
          tableOriginal.push(table);
        });
        setOriginalNPList([...npOriginalArray]);
        setTableOriginalToExport([...tableOriginal]);
      }
      if (item.info_type === 'predicted') {
        const original_time = timeFormat({
          displayFormat: 'HH:MM:SS',
          time: item.original_time,
        });
        const predicted_time = timeFormat({
          displayFormat: 'HH:MM:SS',
          time: item.predicted_time,
        });
        const delta_gain = timeFormat({
          displayFormat: 'HH:MM:SS',
          time: item.delta_gain,
        });
        const processed_timestamp = timeConverter(item.processed_timestamp);
        item.rows.map((row) => {
          table = {
            processed_timestamp: processed_timestamp,
            original_time: original_time,
            predicted_time: predicted_time,
            delta_gain: delta_gain,
            info_type: 'Sugerido',
            seq: row.seq,
            np: row.np,
            baumuster: row.baumuster,
          };
          tablePredicted.push(table);
        });
        setTablePredictedToExport([...tablePredicted]);
      }
    });
    return;
  };

  const tableHeaders = [
    { label: 'Seq.', key: 'seq' },
    { label: 'NP', key: 'np' },
    { label: 'Baumuster', key: 'baumuster' },
    { label: 'Data de Processamento', key: 'processed_timestamp' },
    { label: 'Tempo Previsto', key: 'original_time' },
    { label: 'Tempo Agendado', key: 'predicted_time' },
    { label: 'Ganho de Tempo', key: 'delta_gain' },
    { label: 'Tipo', key: 'info_type' },
  ];

  return (
    <>
      <S.Main>
        <S.TopContent>
          <S.TopContentLeft>
            {data &&
              data.map(
                (item, index: number) =>
                  index === 0 && (
                    <React.Fragment key={index}>
                      <span>
                        Listas referentes ao dia:{' '}
                        <strong>
                          {timeConverter(item.processed_timestamp)}
                        </strong>
                      </span>
                      <span>
                        Mix Agendado alterado em:{' '}
                        <strong>{item.percent}%</strong>
                      </span>
                    </React.Fragment>
                  )
              )}
          </S.TopContentLeft>
          <S.TopContentRight>
            {data && (
              <>
                <CSVLink
                  className="btn-export"
                  data={tableOriginalToExport}
                  enclosingCharacter={`"`}
                  filename="Agendados.csv"
                  headers={tableHeaders}
                >
                  <span>
                    Agendados <FontAwesomeIcon icon={faDownload} />
                  </span>
                </CSVLink>
                <CSVLink
                  className="btn-export"
                  data={tablePredictedToExport}
                  enclosingCharacter={`"`}
                  filename="Sugeridos.csv"
                  headers={tableHeaders}
                >
                  <span>
                    Sugeridos <FontAwesomeIcon icon={faDownload} />
                  </span>
                </CSVLink>
              </>
            )}
            <InputList
              pathname={router.location.pathname as Pathname}
              padding={`${theme.distance.normal}rem 0`}
            />
          </S.TopContentRight>
        </S.TopContent>
        <S.Content>
          {isError && (
            <MessageError
              isVisible
              title="Desculpe, não foi possível carregar os dados da página"
              description={
                <button
                  onClick={() => {
                    setNewRequest(true);
                    setIsError(false);
                  }}
                >
                  Recarregar página
                </button>
              }
              icon={<Error />}
            />
          )}
          <Message
            isVisible={data && data.length === 0}
            title="Linha selecionada não possui registros"
            description="Por favor, escolha outra linha e tente novamente"
            icon={<Error />}
          />
          {data &&
            data.map((item) => (
              <TableList
                data={item}
                np={originalNPList}
                title={
                  item.info_type === 'original'
                    ? texts.header.scheduled.title.pt_br
                    : texts.header.suggested.title.pt_br
                }
                type={item.info_type === 'original' ? 'scheduled' : 'suggested'}
                key={item.info_type}
              />
            ))}
        </S.Content>
      </S.Main>
      <Footer />
    </>
  );
};

export default MixSuggestionPage;
