import * as S from './styles';

const Legends = () => {
  return (
    <S.Legends className="legends">
      <S.LegendItemGroup>
        <S.LegendItem type="integration">
          <span>Integração com outras linhas</span>
        </S.LegendItem>

        <S.LegendItem type="charge">
          <span>Posto de Carga</span>
        </S.LegendItem>

        <S.LegendItem type="discharge">
          <span>Posto de Descarga</span>
        </S.LegendItem>

        <S.LegendItem type="operating">
          <span>Posto operando normalmente</span>
        </S.LegendItem>

        <S.LegendItem type="empty">
          <span>Posto vazio</span>
        </S.LegendItem>

        <S.LegendItem type="selected">
          <span>Posto selecionado</span>
        </S.LegendItem>

        <S.LegendItem type="disclaimer">
          <span>*Postos com cores diferentes apresentam falha</span>
        </S.LegendItem>
      </S.LegendItemGroup>
    </S.Legends>
  );
};

export default Legends;
