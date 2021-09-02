import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { CardActions, IconButton, Tooltip } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import Form from './Form';

import { ShiftRegistration } from 'types';
import * as S from './styles';

const DraggableListItem = ({ id, register, index }: ShiftRegistration) => {
  const [remove, setRemove] = useState<boolean>(false);

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <S.Shift>
            <S.Card style={{ backgroundColor: snapshot.isDragging ? 'rgb(235,235,235)' : '#fff' }}>
              <S.CardActions>
                <Form register={register} />
                <IconButton onClick={() => setRemove(!remove)}>
                  <FontAwesomeIcon icon={faTrash} />
                </IconButton>
              </S.CardActions>
            </S.Card>
            <Tooltip arrow title="Arraste para mover" aria-label="Arraste para mover">
              <S.DragButton>
                <FontAwesomeIcon icon={faGripVertical} />
              </S.DragButton>
            </Tooltip>
          </S.Shift>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
