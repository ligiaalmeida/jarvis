import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as S from './styles';
import { TableSignalsProps } from '../../types';

const AnalogSignalsTable: React.FC<TableSignalsProps> = ({ rows }) => {
  return (
    rows && (
      <TableContainer component={Paper} elevation={4}>
        <S.Table aria-label="Tabela de sinais analógicos">
          <S.TableHead>
            <TableRow>
              <TableCell>Sinal</TableCell>
              <TableCell align="right">Padrão</TableCell>
              <TableCell align="right">Alterado</TableCell>
              <TableCell align="right">%</TableCell>
            </TableRow>
          </S.TableHead>
          <S.TableBody>
            {rows.map((row, idx) => (
              <S.TableRow
                key={`${row.name}_${idx}`}
                percentage={row.percentage_changed}
              >
                <TableCell scope="row">{row.name}</TableCell>
                <TableCell align="right">{row.standard_value}</TableCell>
                <TableCell align="right">{row.changed_value}</TableCell>
                <TableCell align="right">{row.percentage_changed}%</TableCell>
              </S.TableRow>
            ))}
          </S.TableBody>
        </S.Table>
      </TableContainer>
    )
  );
};

export default AnalogSignalsTable;
