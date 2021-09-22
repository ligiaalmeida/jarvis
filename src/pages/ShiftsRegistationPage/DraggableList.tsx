import React, { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from 'react-beautiful-dnd';
import { ShiftRegistrationFields } from 'types';
import DraggableListItem from './DraggableListItem';

export type DraggableListProps = {
  items: ShiftRegistrationFields[];
  onDragEnd: OnDragEndResponder;
};

const DraggableList: React.MemoExoticComponent<any> = React.memo(
  ({ items, onDragEnd }: DraggableListProps) => {
    console.log('items ==> ', items);
    const [register, setRegister] = useState({
      id_shift: 0,
      shift_name: '',
      hour_start_shift: '',
      hour_end_shift: '',
    });
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => {
                // setRegister({
                //   id_shift: item.id_shift,
                //   shift_name: item.shift_name,
                //   hour_start_shift: item.hour_start_shift,
                //   hour_end_shift: item.hour_end_shift,
                // });
                return (
                  <DraggableListItem
                    register={{
                      id_shift: item.id_shift,
                      shift_name: item.shift_name,
                      hour_end_shift: item.hour_end_shift,
                      hour_start_shift: item.hour_start_shift,
                    }}
                    index={index}
                    id={item.id_shift}
                    key={item.id_shift}
                  />
                );
              })}
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
