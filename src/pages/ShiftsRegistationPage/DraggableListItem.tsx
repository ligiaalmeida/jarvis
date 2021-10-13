import { Draggable } from 'react-beautiful-dnd';
import { Tooltip } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faGripVertical } from '@fortawesome/free-solid-svg-icons';
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
            <Tooltip
              arrow
              title="Arraste para mover"
              aria-label="Arraste para mover"
            >
              <S.DragButton>
                <FontAwesomeIcon icon={faGripVertical} />
              </S.DragButton>
            </Tooltip>
            <S.TrashButton onClick={onClickRemove}>
              <FontAwesomeIcon icon={faTrash} />
            </S.TrashButton>
          </S.Shift>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
