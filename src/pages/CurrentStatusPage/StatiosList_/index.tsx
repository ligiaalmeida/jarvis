/* eslint-disable no-debugger */
import React, { useState, useEffect, useCallback } from 'react';
import * as Types from '../types';
import { Grid, Typography } from '@material-ui/core';
import * as S from './styles';

const StationList_ = ({ stationList }: Types.StationListProps) => {
  const changeStationList = useCallback(() => {
    console.log('stationList', stationList);
  }, [stationList]);

  useEffect(() => {
    changeStationList();
  }, [stationList]);

  const drawEmptyStation = (numberOfStatios: number) => {
    const draw = [];

    for (let i = 0; i < numberOfStatios; i++) {
      draw.push(<S.StationEmpty item xs />);
    }
    return draw;
  };

  const drawStations = (start: string, end: string, checkIncludes?: string) => {
    const list: any[] = [];
    const draw: any[] = [];

    stationList.station_list
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

    console.log('LISTA', list);

    list.reverse().map((element) =>
      draw.push(
        <S.Station item xs>
          <Typography variant="body1">
            {(element.position_id === '0' && element.label.split(' ')[2]) ||
              (element.position_id === '0.3' &&
                element.label.split(' ')[2].substring(0, 4)) ||
              element.label.split(' ')[1]}
          </Typography>
        </S.Station>
      )
    );

    return draw;
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
    >
      <Grid item xs={10}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid item>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="stretch"
            >
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {drawStations('32.0', '38.1', '.1')}
                  {drawEmptyStation(6)}
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {drawStations('32.0', '38.1', '.0')}
                  {drawStations('28', '31')}
                  {drawEmptyStation(2)}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row-reverse"
              justifyContent="space-between"
              alignItems="center"
            >
              {drawEmptyStation(1)}
              {drawStations('17', '27')}
              {drawEmptyStation(1)}
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {drawEmptyStation(1)}
              {drawStations('6', '16')}
              {drawEmptyStation(1)}
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="stretch"
            >
              <Grid item>
                <Grid
                  container
                  direction="row-reverse"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {drawEmptyStation(2)}
                  {drawStations('5.0', '5.4')}
                  {drawEmptyStation(6)}
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row-reverse"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {drawEmptyStation(2)}
                  {drawStations('4.1', '4.5')}
                  {drawEmptyStation(6)}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row-reverse"
              justifyContent="space-between"
              alignItems="center"
            >
              {drawEmptyStation(5)}
              {drawStations('0', '4.0')}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        teste
      </Grid>
    </Grid>
  );
};

export default StationList_;
