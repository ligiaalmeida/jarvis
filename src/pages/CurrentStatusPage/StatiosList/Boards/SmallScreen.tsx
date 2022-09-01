import { useCallback, useEffect, useState } from 'react';
import { Divider, Grid, Tooltip } from '@material-ui/core';
import {
  ArrowUpward,
  ArrowForward,
  ArrowBack,
  SubdirectoryArrowLeft,
  SubdirectoryArrowRight,
} from '@material-ui/icons';
import { theme } from 'styles/theme';
import * as Types from '../../types';
import * as S from './styles';
import Station from '../Station';
import { ColorStatusType, Stations, StationsList } from 'types';

const SmallScreens: React.FC<any> = ({
  stationList,
}: Types.StationListProps) => {
  const [station_list, setStationList] = useState<StationsList[]>();
  const [station, setStation] = useState<StationsList>(
    stationList.station_list[0]
  );

  const drawEmptyStation = (numberOfStatios: number) => {
    const draw = [];

    for (let i = 0; i < numberOfStatios; i++) {
      draw.push(
        <Grid item key={i} xs>
          <S.StationEmpty />
        </Grid>
      );
    }
    return draw;
  };

  const drawStations = (start: string, end: string, checkIncludes?: string) => {
    const list: any[] = [];
    const draw: any[] = [];
    if (station_list === undefined) return;
    station_list
      .filter(
        ({ position_id }) =>
          Number(position_id) >= Number(start) &&
          Number(position_id) <= Number(end)
      )
      .map((element) => {
        if (element.position_id === '12.0')
          // add empty station because hidden station 14B
          draw.push(
            <Grid item xs key={element.position_id}>
              <S.StationEmpty />
            </Grid>
          );
        if (checkIncludes) {
          element.position_id.includes(checkIncludes)
            ? list.push(element)
            : null;
        } else {
          list.push(element);
        }
      });

    list.reverse().map((element, index) =>
      draw.push(
        <Grid item key={index}>
          <S.Station
            backgroundcolor={element.color}
            onClick={() => setStation(element)}
            isActive={station.position_id === element.position_id}
          >
            {element.position_id === '0' || element.position_id === '0.3' ? (
              <Grid container direction="column" justifyContent="flex-end">
                <S.GridToolTip item alignself="center" customheigth="65%">
                  <S.Font
                    isnumber="false"
                    style={{ color: theme.colors.white }}
                  >
                    {(element.position_id === '0' &&
                      element.label.split(' ')[2]) ||
                      (element.position_id === '0.3' &&
                        element.label.split(' ')[2].substring(0, 4)) ||
                      element.label.split(' ')[1]}
                  </S.Font>
                </S.GridToolTip>
                <S.GridToolTip item alignself="flex-end" customheigth="16%">
                  <Tooltip
                    title={
                      element.position_id === '0'
                        ? 'Posto de Carga'
                        : 'Posto de Descarga'
                    }
                  >
                    <S.LegendTooltip
                      backgroundcolor={
                        element.position_id === '0'
                          ? theme.colors.primary_6
                          : theme.colors.primary_3
                      }
                    />
                  </Tooltip>
                </S.GridToolTip>
              </Grid>
            ) : (
              <S.Font isnumber="true">
                {(element.position_id === '0' && element.label.split(' ')[2]) ||
                  (element.position_id === '0.3' &&
                    element.label.split(' ')[2].substring(0, 4)) ||
                  element.label.split(' ')[1]}
              </S.Font>
            )}
          </S.Station>
        </Grid>
      )
    );

    return draw;
  };

  const updateStationList = useCallback((list: any[]) => {
    const listFail: any[] = [];

    list.map((element) => {
      listFail.push(activeFailList(element));
    });

    const updateList: any[] = [];
    list.map((element, index) => {
      element.color = listFail[index].color;
      updateList.push(element);
    });
    setStationList(updateList);
  }, []);

  const activeFailList = (station: Stations) => {
    let isError = true;
    let status: ColorStatusType = 'default';
    let color = theme.colors.fails.default;
    let failure = '';

    if (station && station.active_fail_list) {
      isError = false;

      const GravityLevel = station.active_fail_list.length
        ? station.active_fail_list
            .map((fail) => fail.gravity)
            .reduce((a, b) => Math.max((a as number) || 0, (b as number) || 0))
        : 'default';

      const maxFailGravityItem =
        GravityLevel !== 'default'
          ? station.active_fail_list.filter(
              (fail) => fail.gravity === GravityLevel
            )[0]
          : {};

      failure = station.active_fail_list.length
        ? station.active_fail_list.filter(
            (fail) => fail.gravity === GravityLevel
          )[0].label
        : station.label;

      if (
        !station.active_fail_list.length &&
        !station.baumuster &&
        !station.num_prod
      ) {
        status = 'empty';
        color = theme.colors.fails.empty;
      }

      if (station.active_fail_list.length) {
        status = 'error';
        color = (maxFailGravityItem as Types.StationItemPosition).color;
      }
    }

    return { color, status, failure, isError };
  };

  useEffect(() => {
    updateStationList(stationList.station_list);
  }, [stationList.station_list, updateStationList]);

  useEffect(() => {
    stationList.station_list.map((element, _index) => {
      if (
        element.position_id === station?.position_id &&
        element.color !== station.color
      ) {
        setStation(element);
      }
    });
  }, [station, stationList]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      alignContent="center"
    >
      <S.Line item xs={10}>
        <S.CustomContainer>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignContent="center"
            spacing={2}
          >
            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                alignContent="center"
                spacing={2}
              >
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    spacing={2}
                  >
                    <Grid item>
                      <Grid container direction="column" spacing={2}>
                        <Grid item>
                          <S.Legend
                            backgroundcolor={theme.colors.primary_9}
                            iconcolor={theme.colors.white}
                          >
                            <ArrowBack />
                          </S.Legend>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="stretch"
                        spacing={2}
                      >
                        <S.Group item>
                          <Grid
                            container
                            direction="column"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                          >
                            <Grid item>
                              <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={2}
                              >
                                {drawStations('32.0', '38.1', '.1')}
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={2}
                              >
                                {drawStations('32.0', '38.1', '.0')}
                              </Grid>
                            </Grid>
                          </Grid>
                        </S.Group>
                        <Grid item>
                          <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                          >
                            {drawStations('29', '31')}
                          </Grid>
                          <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                          >
                            {drawEmptyStation(3)}
                          </Grid>
                        </Grid>
                        <Grid item>
                          <S.Legend
                            customHeight="100%"
                            backgroundcolor={theme.colors.yellow_1}
                            iconcolor={theme.colors.grey_13}
                            isrotate
                          >
                            <SubdirectoryArrowRight />
                          </S.Legend>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid style={{ transform: 'translateY(75%)' }}>
                      <S.Font
                        isvertical="true"
                        fontSize="clamp(1rem, -0.1429rem + 1.7857vw, 2rem)"
                      >
                        SGPRO2
                      </S.Font>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item style={{ margin: '8px 0' }}>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="stretch"
                spacing={2}
              >
                <Grid item>
                  <S.Legend
                    customHeight="100%"
                    backgroundcolor={theme.colors.yellow_1}
                    iconcolor={theme.colors.grey_13}
                    isrotate
                  >
                    <SubdirectoryArrowLeft />
                  </S.Legend>
                </Grid>
                <S.Group item>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <Grid container direction="row" spacing={2}>
                        {drawStations('18', '18')}
                      </Grid>
                    </Grid>
                    <Grid item>
                      <S.Legend>
                        <Grid
                          container
                          direction="column"
                          justifyContent="flex-end"
                        >
                          <S.GridToolTip
                            item
                            alignself="center"
                            customheigth="65%"
                          >
                            <S.Font>Virador</S.Font>
                          </S.GridToolTip>
                          <S.GridToolTip
                            item
                            alignself="flex-end"
                            customheigth="16%"
                          >
                            <Tooltip title="Conexão com a Linha TRIM">
                              <S.LegendTooltip
                                backgroundcolor={theme.colors.primary_7}
                              />
                            </Tooltip>
                          </S.GridToolTip>
                        </Grid>
                      </S.Legend>
                    </Grid>
                  </Grid>
                </S.Group>
                <Grid item>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <Grid container direction="row-reverse" spacing={2}>
                        {drawStations('19', '20')}
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container direction="row-reverse" spacing={2}>
                        {drawEmptyStation(2)}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <S.Group item>
                  <Grid container direction="row" spacing={2}>
                    <Grid item>
                      <Grid container direction="column" spacing={2}>
                        <Grid item>
                          <Grid container direction="row-reverse" spacing={2}>
                            {drawStations('21', '23')}
                          </Grid>
                        </Grid>
                        <Grid item>
                          <S.Legend customWidth="100%">
                            <S.Font>EOM Motores</S.Font>
                          </S.Legend>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </S.Group>
                <Grid item>
                  <Grid container direction="column-reverse" spacing={2}>
                    {drawStations('24.0', '24.1')}
                  </Grid>
                </Grid>
                <S.Group item>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <Grid container direction="row-reverse" spacing={2}>
                        {drawStations('25', '27')}
                      </Grid>
                    </Grid>
                    <Grid item>
                      <S.Legend customWidth="100%">
                        <Grid
                          container
                          direction="column"
                          justifyContent="flex-end"
                        >
                          <S.GridToolTip
                            item
                            alignself="center"
                            customheigth="65%"
                          >
                            <S.Font>EOM Cabine</S.Font>
                          </S.GridToolTip>
                          <S.GridToolTip
                            item
                            alignself="flex-end"
                            customheigth="16%"
                          >
                            <Tooltip title="Conexão com a Linha TRIM">
                              <S.LegendTooltip
                                backgroundcolor={theme.colors.primary_7}
                              />
                            </Tooltip>
                          </S.GridToolTip>
                        </Grid>
                      </S.Legend>
                    </Grid>
                  </Grid>
                </S.Group>
                <Grid item>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <Grid container direction="row-reverse" spacing={2}>
                        {drawStations('28', '28')}
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container direction="row-reverse" spacing={2}>
                        {drawEmptyStation(1)}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid>
              <S.StationDivider />
            </Grid>

            <Grid item style={{ margin: '8px 0' }}>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
              >
                <S.Group item>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <Grid container direction="row" spacing={2}>
                        {drawStations('17', '17')}
                      </Grid>
                    </Grid>
                    <Grid item>
                      <S.Legend>
                        <Grid
                          container
                          direction="column"
                          justifyContent="flex-end"
                        >
                          <S.GridToolTip
                            item
                            alignself="center"
                            customheigth="65%"
                          >
                            <S.Font>Virador</S.Font>
                          </S.GridToolTip>
                          <S.GridToolTip
                            item
                            alignself="flex-end"
                            customheigth="16%"
                          >
                            <Tooltip title="Conexão com a Linha TRIM">
                              <S.LegendTooltip
                                backgroundcolor={theme.colors.primary_7}
                              />
                            </Tooltip>
                          </S.GridToolTip>
                        </Grid>
                      </S.Legend>
                    </Grid>
                  </Grid>
                </S.Group>
                <Grid item>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <Grid container direction="row" spacing={2}>
                        {drawStations('13', '16')}
                      </Grid>
                    </Grid>
                    <Grid item container direction="row" spacing={2}>
                      {drawEmptyStation(4)}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="column-reverse" spacing={2}>
                    {drawStations('12.0', '12.1')}
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="column" spacing={2}>
                    {drawStations('11', '11')}
                    {drawEmptyStation(1)}
                  </Grid>
                </Grid>
                <S.Group item>
                  <Grid container direction="row" spacing={2}>
                    <Grid item>
                      <Grid container direction="column" spacing={2}>
                        <Grid item>
                          <Grid container direction="row" spacing={2}>
                            {drawStations('7.0', '10')}
                          </Grid>
                        </Grid>
                        <Grid item>
                          <S.Legend customWidth="100%">
                            <S.Font>Dress Up EOM Eixo</S.Font>
                          </S.Legend>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </S.Group>
                <Grid item>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <Grid container direction="row" spacing={2}>
                        {drawStations('6.0', '6.0')}
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container direction="row" spacing={2}>
                        <Grid item>
                          <S.Legend
                            backgroundcolor={theme.colors.yellow_1}
                            iconcolor={theme.colors.grey_13}
                          >
                            <ArrowUpward />
                          </S.Legend>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
                wrap="nowrap"
              >
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <Grid container direction="column" spacing={2}>
                        <Grid item container direction="row" spacing={2}>
                          {drawEmptyStation(6)}
                        </Grid>
                        <Grid item container direction="row" spacing={2}>
                          {drawEmptyStation(6)}
                        </Grid>
                      </Grid>
                    </Grid>
                    <S.Group item>
                      <Grid container direction="row" spacing={2} wrap="wrap">
                        <Grid item>
                          <Grid container direction="column" spacing={2}>
                            <Grid item>
                              <Grid
                                container
                                direction="row-reverse"
                                spacing={2}
                              >
                                {drawStations('5.0', '5.4')}
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Grid
                                container
                                direction="row-reverse"
                                spacing={2}
                              >
                                {drawStations('4.1', '4.5')}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <S.Legend customHeight="100%">
                            <S.Font isvertical="true">Pedágios</S.Font>
                          </S.Legend>
                        </Grid>
                      </Grid>
                    </S.Group>
                  </Grid>
                </Grid>

                <Grid>
                  <S.Font
                    isvertical="true"
                    fontSize="clamp(1rem, -0.1429rem + 1.7857vw, 2rem)"
                  >
                    SGPRO1
                  </S.Font>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="stretch"
                spacing={2}
              >
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    {drawEmptyStation(8)}
                    <Grid item>
                      <S.Legend
                        backgroundcolor={theme.colors.yellow_1}
                        iconcolor={theme.colors.grey_13}
                      >
                        <ArrowUpward />
                      </S.Legend>
                    </Grid>
                    {drawEmptyStation(1)}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <S.Legend
                        backgroundcolor={theme.colors.primary_10}
                        iconcolor={theme.colors.white}
                      >
                        <ArrowForward />
                      </S.Legend>
                    </Grid>
                    {drawEmptyStation(1)}
                  </Grid>
                </Grid>
                <S.Group item>
                  <Grid container direction="column" spacing={2}>
                    <Grid item container direction="row-reverse" spacing={2}>
                      {drawStations('0', '0.3')}
                    </Grid>
                    <Grid item>
                      <S.Legend customWidth="100%">
                        <S.Font>Esteiras de Longarinas</S.Font>
                      </S.Legend>
                    </Grid>
                  </Grid>
                </S.Group>
                <S.Group item>
                  <Grid container direction="column" spacing={2}>
                    {drawStations('1', '1')}
                    <Grid item>
                      <S.Legend>
                        <Grid
                          container
                          direction="column"
                          justifyContent="flex-end"
                        >
                          <S.GridToolTip
                            item
                            alignself="center"
                            customheigth="65%"
                          >
                            <S.Font
                              style={{
                                fontSize:
                                  'clamp(1rem, 0.5429rem + 0.7143vw, 1.4rem)',
                              }}
                            >
                              EOM Quadros
                            </S.Font>
                          </S.GridToolTip>
                          <S.GridToolTip
                            item
                            alignself="flex-end"
                            customheigth="16%"
                          >
                            <Tooltip title="Conexão com a Linha TRIM">
                              <S.LegendTooltip
                                backgroundcolor={theme.colors.primary_7}
                              />
                            </Tooltip>
                          </S.GridToolTip>
                        </Grid>
                      </S.Legend>
                    </Grid>
                  </Grid>
                </S.Group>
                <Grid item>
                  <Grid container direction="column" spacing={2}>
                    <Grid item container direction="row-reverse" spacing={2}>
                      {drawStations('2', '4')}
                    </Grid>
                    <Grid item container direction="row" spacing={2}>
                      {drawEmptyStation(3)}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="column" spacing={2}>
                    <Grid item container direction="row-reverse" spacing={2}>
                      {drawEmptyStation(1)}
                    </Grid>
                    <Grid item container direction="row" spacing={2}>
                      {drawEmptyStation(1)}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </S.CustomContainer>
      </S.Line>
      <Grid item xs={2} style={{ maxWidth: '20%' }}>
        {station && <Station station={station} />}
      </Grid>
    </Grid>
  );
};

export default SmallScreens;
