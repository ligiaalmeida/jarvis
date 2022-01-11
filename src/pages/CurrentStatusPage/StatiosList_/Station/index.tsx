import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import { StationsList, ActiveFailList } from 'types';
import * as S from './styles';
import { useSetInterval } from 'hooks';
import { timeFormat } from 'utils/js';

const Station: React.FC<{ station: StationsList }> = ({ station }) => {
  const [time, setTime] = useState('');

  useSetInterval({
    condition: !!station?.active_fail_list,
    delay: 1000,
    callback: () => {
      if (station) {
        const dateNow = Date.parse(`${new Date()}`);
        let durationTimestamp = 0;
        let durationSeconds = 0;

        if ((station?.active_fail_list[0] as ActiveFailList)?.timestamp) {
          const timestamp = (station?.active_fail_list[0] as ActiveFailList)
            .timestamp;
          durationTimestamp = dateNow - timestamp;
          durationSeconds = Math.ceil(durationTimestamp / 1000);

          setTime(
            timeFormat({
              time: durationSeconds,
              displayFormat: 'HH:MM:SS',
              separatorHour: 'h ',
              separatorMinute: "' ",
              separatorSeconds: '"',
            })
          );
        } else {
          setTime('');
        }
      }
    },
  });

  return (
    <Container maxWidth="lg">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <S.CardStation backgroundColor={station.color}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
            >
              <Grid item style={{ textAlign: 'center' }}>
                <S.Font fontColor="white" fontSize="6rem" fontWeight="700">
                  <strong>
                    {(station.position_id === '0' &&
                      station.label.split(' ')[2]) ||
                      (station.position_id === '0.3' &&
                        station.label.split(' ')[2].substring(0, 4)) ||
                      station.label.split(' ')[1]}
                  </strong>
                </S.Font>
                <S.Font fontColor="white" fontSize="2rem" fontWeight="700">
                  {station.active_fail_list[0]?.label ||
                    'Sem falhas até o momento'}
                </S.Font>
              </Grid>
            </Grid>
          </S.CardStation>
        </Grid>
        <Grid item>
          <S.Font fontColor="gray" fontSize="1.8rem" fontWeight="normal">
            N Produto
          </S.Font>
          <S.Font fontColor="gray" fontSize=" 1.8rem" fontWeight="700">
            {station.num_prod || '---'}
          </S.Font>
        </Grid>
        <Grid item>
          <S.Font fontColor="gray" fontSize="1.8rem" fontWeight="normal">
            Baumuster
          </S.Font>
          <S.Font fontColor="gray" fontSize="1.8rem" fontWeight="700">
            {station.baumuster || '---'}
          </S.Font>
        </Grid>
        <Grid item>
          <S.Font fontColor="gray" fontSize="1.8rem" fontWeight="normal">
            Time
          </S.Font>
          <S.Font fontColor="gray" fontSize=" 1.8rem" fontWeight="700">
            {time || '---'}
          </S.Font>
        </Grid>
        <Grid item>
          <S.LegendTooltip>
            <S.Tooltip backgroundColor="lightblue" shape="circle" />
            <S.Font fontColor="gray" fontSize="1.5rem" fontWeight="normal">
              Integração com outras linhas
            </S.Font>
          </S.LegendTooltip>
          <S.LegendTooltip>
            <S.Tooltip backgroundColor="purple" shape="circle" />
            <S.Font fontColor="gray" fontSize="1.5rem" fontWeight="normal">
              Posto de carga
            </S.Font>
          </S.LegendTooltip>
          <S.LegendTooltip>
            <S.Tooltip backgroundColor="orange" shape="circle" />
            <S.Font fontColor="gray" fontSize="1.5rem" fontWeight="normal">
              Posto de descarga
            </S.Font>
          </S.LegendTooltip>
          <S.LegendTooltip>
            <S.Tooltip backgroundColor="#6EA046" />
            <S.Font fontColor="gray" fontSize="1.5rem" fontWeight="normal">
              Posto operando normalmente
            </S.Font>
          </S.LegendTooltip>
          <S.LegendTooltip>
            <S.Tooltip hasBorder />
            <S.Font fontColor="gray" fontSize="1.5rem" fontWeight="normal">
              Posto selecionado
            </S.Font>
          </S.LegendTooltip>
        </Grid>
        <Grid item>
          <S.Font fontColor="gray" fontSize="1.5rem" fontWeight="normal">
            *Postos com cores diferentes apresentam falhas
          </S.Font>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Station;
