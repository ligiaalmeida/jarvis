import React, { useState, useEffect, useCallback } from 'react';
import * as Types from '../types';
import { Grid, Tooltip, Container, Divider } from '@material-ui/core';
import * as S from './styles';
import {
  ArrowUpward,
  ArrowForward,
  ArrowBack,
  SubdirectoryArrowLeft,
  SubdirectoryArrowRight,
} from '@material-ui/icons';
import { ColorStatusType, Stations, StationsList } from 'types';
import { theme } from 'styles/theme';
import { StationItemPosition } from '../types';
import Station from './Station';

const StationList_ = ({ stationList }: Types.StationListProps) => {
  const [station_list, setStationList] = useState<any[]>();
  const [station, setStation] = useState<any>(stationList.station_list[0]);

  const drawEmptyStation = (numberOfStatios: number) => {
    const draw = [];

    for (let i = 0; i < numberOfStatios; i++) {
      draw.push(
        <Grid item>
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
            backgroundColor={element.color}
            onClick={() => viewStation(element)}
            isActive={station.position_id === element.position_id}
          >
            {element.position_id === '0' || element.position_id === '0.3' ? (
              <Grid container direction="column">
                <S.GridToolTip item alignSelf="center" customheigth="65%">
                  <S.Font isNumber>
                    {(element.position_id === '0' &&
                      element.label.split(' ')[2]) ||
                      (element.position_id === '0.3' &&
                        element.label.split(' ')[2].substring(0, 4)) ||
                      element.label.split(' ')[1]}
                  </S.Font>
                </S.GridToolTip>
                <S.GridToolTip item alignSelf="flex-end" customheigth="35%">
                  <Tooltip
                    title={
                      element.position_id === '0'
                        ? 'Posto de Carga'
                        : 'Posto de Descarga'
                    }
                  >
                    <S.LegendTooltip
                      backgroundColor={
                        element.position_id === '0' ? 'purple' : 'orange'
                      }
                    />
                  </Tooltip>
                </S.GridToolTip>
              </Grid>
            ) : (
              <S.Font isNumber>
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

  const viewStation = (element: any) => {
    setStation(element);
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
        color = (maxFailGravityItem as StationItemPosition).color;
      }
    }

    return { color, status, failure, isError };
  };

  useEffect(() => {
    updateStationList(stationList.station_list);
  }, [stationList.station_list, updateStationList]);

  useEffect(() => {
    stationList.station_list.map((element, index) => {
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
      <Grid item xs={10}>
        <S.CustomContainer maxWidth="xl">
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
                          <S.Legend backgroundColor="#F38383">
                            <ArrowBack fontSize="large" />
                          </S.Legend>
                        </Grid>
                        {drawEmptyStation(1)}
                      </Grid>
                    </Grid>
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
                            {drawEmptyStation(6)}
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
                            {drawStations('28', '31')}
                            <Grid item>
                              <S.Legend rotate>
                                <SubdirectoryArrowRight fontSize="large" />
                              </S.Legend>
                            </Grid>
                            {drawEmptyStation(1)}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <S.Font fontSize={'2rem'} isVertical={true}>
                    SGPRO2
                  </S.Font>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{ padding: '0' }}>
              <Grid container direction="row-reverse">
                <Grid item style={{ width: '100%', marginRight: '87.7rem' }}>
                  <Divider style={{ height: '5px' }} />
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
                  <Grid container direction="column" spacing={2}>
                    {drawEmptyStation(2)}
                  </Grid>
                </Grid>
                <Grid item>
                  <S.Legend rotate>
                    <SubdirectoryArrowLeft fontSize="large" />
                  </S.Legend>
                </Grid>
                <S.Group item>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <Grid container direction="row" spacing={2}>
                        {drawStations('17', '17')}
                      </Grid>
                    </Grid>
                    <Grid item>
                      <S.Legend>
                        <Grid container direction="column">
                          <S.GridToolTip
                            item
                            alignSelf="center"
                            customheigth="65%"
                          >
                            <S.Font>Virador</S.Font>
                          </S.GridToolTip>
                          <S.GridToolTip
                            item
                            alignSelf="flex-end"
                            customheigth="35%"
                          >
                            <Tooltip title="Conexão com a Linha TRIM">
                              <S.LegendTooltip backgroundColor={'#006eff'} />
                            </Tooltip>
                          </S.GridToolTip>
                        </Grid>
                      </S.Legend>
                    </Grid>
                  </Grid>
                </S.Group>
                <Grid item style={{ padding: '0' }}>
                  <Divider orientation="vertical" style={{ width: '5px' }} />
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
                        <Grid container direction="column">
                          <S.GridToolTip
                            item
                            alignSelf="center"
                            customheigth="65%"
                          >
                            <S.Font>Virador</S.Font>
                          </S.GridToolTip>
                          <S.GridToolTip
                            item
                            alignSelf="flex-end"
                            customheigth="35%"
                          >
                            <Tooltip title="Conexão com a Linha TRIM">
                              <S.LegendTooltip backgroundColor={'#006eff'} />
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
                          <S.Legend>
                            <S.Font>EQM Motores</S.Font>
                          </S.Legend>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container direction="column-reverse" spacing={2}>
                        {drawStations('24.0', '24.1')}
                      </Grid>
                    </Grid>
                  </Grid>
                </S.Group>
                <S.Group item>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <Grid container direction="row-reverse" spacing={2}>
                        {drawStations('25', '27')}
                      </Grid>
                    </Grid>
                    <Grid item>
                      <S.Legend>
                        <Grid container direction="column">
                          <S.GridToolTip
                            item
                            alignSelf="center"
                            customheigth="65%"
                          >
                            <S.Font>EQM Cabine</S.Font>
                          </S.GridToolTip>
                          <S.GridToolTip
                            item
                            alignSelf="flex-end"
                            customheigth="35%"
                          >
                            <Tooltip title="Conexão com a Linha TRIM">
                              <S.LegendTooltip backgroundColor={'#006eff'} />
                            </Tooltip>
                          </S.GridToolTip>
                        </Grid>
                      </S.Legend>
                    </Grid>
                  </Grid>
                </S.Group>
                <Grid item>
                  <Grid container direction="column" spacing={2}>
                    {drawEmptyStation(2)}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{ padding: '0' }}>
              <Grid container direction="row">
                <Grid item style={{ marginLeft: '23.2rem', width: '100%' }}>
                  <Divider style={{ height: '5px' }} />
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
                      <Grid container direction="row" spacing={2}>
                        {drawEmptyStation(1)}
                        {drawStations('13', '16')}
                      </Grid>
                    </Grid>
                    <Grid item container direction="row" spacing={2}>
                      {drawEmptyStation(5)}
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
                          <S.Legend>
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
                        {drawEmptyStation(2)}
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container direction="row" spacing={2}>
                        <Grid item>
                          <S.Legend>
                            <ArrowUpward fontSize="large" />
                          </S.Legend>
                        </Grid>
                        {drawEmptyStation(2)}
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
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
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
                        <Grid item container direction="row" spacing={2}>
                          {drawEmptyStation(7)}
                        </Grid>
                        <Grid item container direction="row" spacing={2}>
                          {drawEmptyStation(7)}
                        </Grid>
                      </Grid>
                    </Grid>
                    <S.Group item>
                      <Grid container direction="row" spacing={2}>
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
                          <S.Legend>
                            <S.Font isVertical>Pedágios</S.Font>
                          </S.Legend>
                        </Grid>
                      </Grid>
                    </S.Group>
                    <Grid item>
                      <Grid container direction="column" spacing={2}>
                        {drawEmptyStation(2)}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <S.Font fontSize={'2rem'} isVertical={true}>
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
                alignItems="center"
                spacing={2}
              >
                {drawEmptyStation(8)}
                <Grid item>
                  <S.Legend>
                    <ArrowUpward fontSize="large" />
                  </S.Legend>
                </Grid>
                {drawEmptyStation(5)}
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
                      <S.Legend backgroundColor="#80CB44">
                        <ArrowForward fontSize="large" />
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
                      <S.Legend>
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
                        <Grid container direction="column">
                          <S.GridToolTip
                            item
                            alignSelf="center"
                            customheigth="65%"
                          >
                            <S.Font>
                              EOM
                              <br />
                              Quadros
                            </S.Font>
                          </S.GridToolTip>
                          <S.GridToolTip
                            item
                            alignSelf="flex-end"
                            customheigth="35%"
                          >
                            <Tooltip title="Conexão com a Linha TRIM">
                              <S.LegendTooltip backgroundColor={'#006eff'} />
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
                      {drawEmptyStation(5)}
                    </Grid>
                    <Grid item container direction="row" spacing={2}>
                      {drawEmptyStation(5)}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </S.CustomContainer>
      </Grid>
      <Grid item xs={2}>
        {station && <Station station={station} />}
      </Grid>
    </Grid>
  );
};

export default StationList_;
