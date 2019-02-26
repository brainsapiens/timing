import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';
import styled from "styled-components";
import Item from './Item';
import Total from '../Total';

const List = styled.ol`
  color: #dadada;
`;

const ListItem = styled.li`
  position: relative;
  padding-left: 2rem;
  
  &:nth-child(odd) {
    background: #fafafa;
  }
  
  .remove-btn {
    position: absolute;
    left: 100%;
    top: -.3rem;
    visibility: hidden;
  }
  
  &:hover .remove-btn {
    visibility: visible;
  }
`;

const ListItemHandler = styled.div`
  position: absolute;
  top: -.1rem;
  left: -.25rem;
  color: #eaeaea;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const SortableHandler = SortableHandle(() => <ListItemHandler className="d-print-none px-1"><i className="mdi mdi-24px mdi-drag-vertical"/></ListItemHandler>);

const SortableItem = SortableElement(({item, index, itemIndex}) =>
  <ListItem className="pl-4 pr-3 py-1">
    <Item item={item} index={index} itemIndex={itemIndex}/>
    <SortableHandler/>
  </ListItem>);

const SortableList = SortableContainer(({items}) => {
  return (
    <List className="mb-4 mb-md-5 px-5">
      {items.map((item, index) => (
        <SortableItem key={index} item={item} index={index} itemIndex={index}/>
      ))}
      <Total/>
    </List>
  );
});

class ItemsList extends PureComponent {
  render() {
    return <SortableList
            items={this.props.store.items}
            lockAxis={"y"}
            pressDelay={200}
            useDragHandle={true}
            onSortStart={this.onSortStart}
            onSortEnd={this.onSortEnd}/>;
  }

  onSortStart = () => {
    document.getElementsByTagName("body")[0].classList.add("is-dragging");
  };

  onSortEnd = ({oldIndex, newIndex}) => {
    this.props.onSortEnd(arrayMove(this.props.store.items, oldIndex, newIndex));

    document.getElementsByTagName("body")[0].classList.remove("is-dragging");
  };
}

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    onSortEnd: (items) => {
      dispatch({type: "SORT_ITEMS", payload: items});
    }
  })
)(ItemsList);
