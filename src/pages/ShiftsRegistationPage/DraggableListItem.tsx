import { Draggable } from 'react-beautiful-dnd';
import { Tooltip } from '@material-ui/core';

import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import DeleteIcon from '@material-ui/icons/Delete';
import Form from './Form';

import { ShiftRegistration } from 'types';
import * as S from './styles';

const DraggableListItem = ({
  id,
  register,
  index,
  onClickRemove,
}: ShiftRegistration) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <S.Shift>
            <S.Card
              style={{
                backgroundColor: snapshot.isDragging
                  ? 'rgb(235,235,235)'
                  : '#fff',
              }}
            >
              <S.CardActions>
                <Form register={register} />
              </S.CardActions>
            </S.Card>
            <S.DivActions>
              <Tooltip
                arrow
                title="Arraste para mover"
                aria-label="Arraste para mover"
              >
                <S.DragButton>
                  <DragIndicatorIcon fontSize="large" />
                </S.DragButton>
              </Tooltip>
              <S.TrashButton onClick={onClickRemove}>
                <DeleteIcon fontSize="large" />
              </S.TrashButton>
            </S.DivActions>
          </S.Shift>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
