import React, { useCallback } from 'react';
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { ShiftRegistrationFields } from 'types';
import DraggableListItem from './DraggableListItem';
import { ShiftRegistrationActions } from 'store/ducks/shiftRegistration';

export type DraggableListProps = {
  items: ShiftRegistrationFields[];
  onDragEnd: OnDragEndResponder;
};

const DraggableList: React.MemoExoticComponent<any> = React.memo(
  ({ items, onDragEnd }: DraggableListProps) => {
    const { removeShift } = ShiftRegistrationActions;

    const dispatch = useDispatch();

    const onClickRemove = (item: ShiftRegistrationFields) => {
      return (event: React.MouseEvent) => {
        dispatch(removeShift(item));
        event.preventDefault();
      };
    };

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <DraggableListItem
                  register={item}
                  onClickRemove={onClickRemove(item)}
                  index={index}
                  id={item.id_shift.toString()}
                  key={item.id_shift}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
);

DraggableList.displayName = 'DraggableList';

export default DraggableList;
