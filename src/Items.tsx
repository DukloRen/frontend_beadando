import Item from "./Item";


interface ItemProps {
    item: Item,
    onRemove: () => void;
}

function Items(props: ItemProps) {

    return (
        <div>
            <p>{props.item.name}</p>
            <button onClick={props.onRemove}>Delete</button>
        </div>
    );
}

export default Items;